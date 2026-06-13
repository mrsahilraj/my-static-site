import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import { db, migrate } from './db.js'
import {
  cookieOptions,
  getJwtSecret,
  signReset,
  signSession,
  verifyToken,
} from './security.js'
import { jsonError, normalizeMobile, safeUser, validateMobile, validateMpin } from './util.js'

const app = express()
const secret = getJwtSecret()

migrate()

app.disable('x-powered-by')
// app.use(helmet())
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())

function isAllowedOrigin(origin) {
  if (!origin) return false
  return (
    /^http:\/\/localhost:\d+$/.test(origin) ||
    /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
  )
}

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

function getSessionUser(req) {
  const token = req.cookies?.session
  if (!token) return null
  try {
    const payload = verifyToken({ secret, token })
    if (payload?.typ !== 'session') return null
    const id = Number(payload.sub)
    if (!Number.isFinite(id)) return null
    const row = db
      .prepare('SELECT id, full_name, mobile, email, created_at FROM users WHERE id = ?')
      .get(id)
    return safeUser(row)
  } catch {
    return null
  }
}

function requireAuth(req, res, next) {
  const user = getSessionUser(req)
  if (!user) return jsonError(res, 401, 'You must be logged in.')
  req.user = user
  next()
}

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.get('/api/auth/me', (req, res) => {
  const user = getSessionUser(req)
  res.json({ ok: true, user })
})

app.post('/api/auth/profile', requireAuth, (req, res) => {
  const fullNameRaw = String(req.body?.fullName ?? '').trim()
  const emailRaw = String(req.body?.email ?? '').trim()
  const mobileInput = req.body?.mobile

  if (fullNameRaw.length < 2) {
    return jsonError(res, 400, 'Full name must be at least 2 characters.')
  }

  const mobileCheck = validateMobile(mobileInput)
  if (!mobileCheck.ok) return jsonError(res, 400, mobileCheck.message)
  const mobile = mobileCheck.value

  const email = emailRaw ? emailRaw : null
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError(res, 400, 'Please enter a valid email address.')
  }

  const existing = db
    .prepare('SELECT id FROM users WHERE mobile = ? AND id != ?')
    .get(mobile, req.user.id)
  if (existing) {
    return jsonError(res, 409, 'Mobile number is already registered.')
  }

  db.prepare('UPDATE users SET full_name = ?, mobile = ?, email = ? WHERE id = ?').run(
    fullNameRaw,
    mobile,
    email,
    req.user.id,
  )

  const updated = db
    .prepare('SELECT id, full_name, mobile, email, created_at FROM users WHERE id = ?')
    .get(req.user.id)

  res.json({ ok: true, user: safeUser(updated) })
})

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('session', cookieOptions())
  res.clearCookie('mpin_reset', cookieOptions())
  res.json({ ok: true })
})

app.post('/api/auth/register', async (req, res) => {
  const fullNameRaw = String(req.body?.fullName ?? '').trim()
  const email = String(req.body?.email ?? '').trim() || null
  const mobileRaw = req.body?.mobile
  const mpinRaw = req.body?.mpin
  const confirmRaw = req.body?.confirmMpin

  const fullName = fullNameRaw.length >= 2 ? fullNameRaw : 'User'

  const mobileCheck = validateMobile(mobileRaw)
  if (!mobileCheck.ok) return jsonError(res, 400, mobileCheck.message)
  const mobile = mobileCheck.value

  const mpinCheck = validateMpin(mpinRaw)
  if (!mpinCheck.ok) return jsonError(res, 400, mpinCheck.message)
  const confirmCheck = validateMpin(confirmRaw)
  if (!confirmCheck.ok) return jsonError(res, 400, confirmCheck.message)
  if (mpinCheck.value !== confirmCheck.value) {
    return jsonError(res, 400, 'MPIN and Confirm MPIN do not match.')
  }

  const existing = db.prepare('SELECT id FROM users WHERE mobile = ?').get(mobile)
  if (existing) return jsonError(res, 409, 'Mobile number is already registered.')

  const mpinHash = await bcrypt.hash(mpinCheck.value, 12)
  const createdAt = Date.now()

  const info = db
    .prepare(
      'INSERT INTO users (full_name, mobile, email, mpin_hash, created_at) VALUES (?, ?, ?, ?, ?)',
    )
    .run(fullName, mobile, email, mpinHash, createdAt)

  const user = safeUser({
    id: info.lastInsertRowid,
    full_name: fullName,
    mobile,
    email,
    created_at: createdAt,
  })

  const token = signSession({ secret, userId: user.id })
  res.cookie('session', token, cookieOptions())
  res.json({ ok: true, user })
})

app.post('/api/auth/login', async (req, res) => {
  const mobileCheck = validateMobile(req.body?.mobile)
  if (!mobileCheck.ok) return jsonError(res, 400, mobileCheck.message)
  const mobile = mobileCheck.value

  const mpinCheck = validateMpin(req.body?.mpin)
  if (!mpinCheck.ok) return jsonError(res, 400, mpinCheck.message)

  const row = db
    .prepare('SELECT id, full_name, mobile, email, mpin_hash, created_at FROM users WHERE mobile = ?')
    .get(mobile)

  if (!row) return jsonError(res, 401, 'Invalid mobile number or MPIN.')

  const ok = await bcrypt.compare(mpinCheck.value, row.mpin_hash)
  if (!ok) return jsonError(res, 401, 'Invalid mobile number or MPIN.')

  const token = signSession({ secret, userId: row.id })
  res.cookie('session', token, cookieOptions())
  res.json({ ok: true, user: safeUser(row) })
})

app.post('/api/auth/otp/request', async (req, res) => {
  const mobileCheck = validateMobile(req.body?.mobile)
  if (!mobileCheck.ok) return jsonError(res, 400, mobileCheck.message)
  const mobile = mobileCheck.value

  const user = db.prepare('SELECT id FROM users WHERE mobile = ?').get(mobile)
  if (!user) return res.json({ ok: true })

  const otp = String(Math.floor(100000 + Math.random() * 900000))
  const otpHash = await bcrypt.hash(otp, 10)
  const createdAt = Date.now()
  const expiresAt = createdAt + 5 * 60 * 1000

  db.prepare(
    'INSERT INTO otp_requests (mobile, otp_hash, expires_at, used, created_at) VALUES (?, ?, ?, ?, ?)',
  ).run(mobile, otpHash, expiresAt, 0, createdAt)

  const provider = process.env.SMS_PROVIDER ?? 'console'
  if (provider === 'console') {
    console.log(`[OTP] mobile=${mobile} otp=${otp}`)
    return res.json({ ok: true, debugOtp: process.env.OTP_DEBUG === 'true' ? otp : undefined })
  }

  return jsonError(res, 500, 'OTP delivery is not configured on the server.')
})

app.post('/api/auth/otp/verify', async (req, res) => {
  const mobileCheck = validateMobile(req.body?.mobile)
  if (!mobileCheck.ok) return jsonError(res, 400, mobileCheck.message)
  const mobile = mobileCheck.value

  const otpStr = String(req.body?.otp ?? '').trim()
  if (!/^\d{6}$/.test(otpStr)) return jsonError(res, 400, 'OTP must be 6 digits.')

  const row = db
    .prepare(
      'SELECT id, otp_hash, expires_at, used FROM otp_requests WHERE mobile = ? ORDER BY created_at DESC LIMIT 1',
    )
    .get(mobile)

  if (!row) return jsonError(res, 400, 'No OTP request found. Please request a new OTP.')
  if (row.used) return jsonError(res, 400, 'That OTP has already been used. Please request a new OTP.')
  if (Date.now() > row.expires_at) return jsonError(res, 400, 'OTP has expired. Please request a new OTP.')

  const ok = await bcrypt.compare(otpStr, row.otp_hash)
  if (!ok) return jsonError(res, 400, 'Invalid OTP. Please try again.')

  db.prepare('UPDATE otp_requests SET used = 1 WHERE id = ?').run(row.id)

  const resetToken = signReset({ secret, mobile })
  res.cookie('mpin_reset', resetToken, cookieOptions())
  res.json({ ok: true })
})

// New: Request OTP for profile update
app.post('/api/auth/profile/otp/request', requireAuth, async (req, res) => {
  const mobile = req.user.mobile // use user's registered mobile
  const existingUser = db.prepare('SELECT id FROM users WHERE mobile = ?').get(mobile)
  if (!existingUser) return jsonError(res, 404, 'User not found.')

  const otp = String(Math.floor(100000 + Math.random() * 900000))
  const otpHash = await bcrypt.hash(otp, 10)
  const createdAt = Date.now()
  const expiresAt = createdAt + 5 * 60 * 1000

  db.prepare(
    'INSERT INTO otp_requests (mobile, otp_hash, expires_at, used, created_at) VALUES (?, ?, ?, ?, ?)',
  ).run(mobile, otpHash, expiresAt, 0, createdAt)

  const provider = process.env.SMS_PROVIDER ?? 'console'
  if (provider === 'console') {
    console.log(`[PROFILE OTP] mobile=${mobile} otp=${otp}`)
    return res.json({ ok: true, debugOtp: process.env.OTP_DEBUG === 'true' ? otp : undefined })
  }

  return jsonError(res, 500, 'OTP delivery is not configured on the server.')
})

// New: Verify OTP and update profile
app.post('/api/auth/profile/otp/verify', requireAuth, async (req, res) => {
  const otpStr = String(req.body?.otp ?? '').trim()
  if (!/^\d{6}$/.test(otpStr)) return jsonError(res, 400, 'OTP must be 6 digits.')

  const fullName = String(req.body?.fullName ?? '').trim()
  const email = String(req.body?.email ?? '').trim() || null
  const newMobileInput = req.body?.mobile
  const newMobileCheck = newMobileInput ? validateMobile(newMobileInput) : null

  if (!fullName) return jsonError(res, 400, 'Full name is required.')
  if (fullName.length < 2) return jsonError(res, 400, 'Full name must be at least 2 characters.')
  if (newMobileCheck && !newMobileCheck.ok) return jsonError(res, 400, newMobileCheck.message)

  const mobile = req.user.mobile
  const row = db
    .prepare(
      'SELECT id, otp_hash, expires_at, used FROM otp_requests WHERE mobile = ? ORDER BY created_at DESC LIMIT 1',
    )
    .get(mobile)

  if (!row) return jsonError(res, 400, 'No OTP request found. Please request a new OTP.')
  if (row.used) return jsonError(res, 400, 'That OTP has already been used. Please request a new OTP.')
  if (Date.now() > row.expires_at) return jsonError(res, 400, 'OTP has expired. Please request a new OTP.')

  const ok = await bcrypt.compare(otpStr, row.otp_hash)
  if (!ok) return jsonError(res, 400, 'Invalid OTP. Please try again.')

  db.prepare('UPDATE otp_requests SET used = 1 WHERE id = ?').run(row.id)

  const newMobile = newMobileCheck ? newMobileCheck.value : null
  if (newMobile && newMobile !== mobile) {
    const existingMobileUser = db.prepare('SELECT id FROM users WHERE mobile = ?').get(newMobile)
    if (existingMobileUser) return jsonError(res, 409, 'Mobile number is already registered.')
  }

  const finalMobile = newMobile || mobile
  db.prepare('UPDATE users SET full_name = ?, mobile = ?, email = ? WHERE id = ?').run(
    fullName,
    finalMobile,
    email,
    req.user.id,
  )

  const updatedUser = db.prepare('SELECT id, full_name, mobile, email, created_at FROM users WHERE id = ?').get(
    req.user.id,
  )

  res.json({ ok: true, user: safeUser(updatedUser) })
})

app.post('/api/auth/mpin/reset', async (req, res) => {
  const resetToken = req.cookies?.mpin_reset
  if (!resetToken) return jsonError(res, 401, 'OTP verification is required.')

  let payload
  try {
    payload = verifyToken({ secret, token: resetToken })
  } catch {
    return jsonError(res, 401, 'OTP verification is required.')
  }

  if (payload?.typ !== 'mpin_reset') return jsonError(res, 401, 'OTP verification is required.')
  const mobile = normalizeMobile(payload.mobile)
  if (!mobile) return jsonError(res, 401, 'OTP verification is required.')

  const mpinCheck = validateMpin(req.body?.mpin)
  if (!mpinCheck.ok) return jsonError(res, 400, mpinCheck.message)
  const confirmCheck = validateMpin(req.body?.confirmMpin)
  if (!confirmCheck.ok) return jsonError(res, 400, confirmCheck.message)
  if (mpinCheck.value !== confirmCheck.value) {
    return jsonError(res, 400, 'MPIN and Confirm MPIN do not match.')
  }

  const user = db.prepare('SELECT id FROM users WHERE mobile = ?').get(mobile)
  if (!user) return jsonError(res, 404, 'Account not found.')

  const mpinHash = await bcrypt.hash(mpinCheck.value, 12)
  db.prepare('UPDATE users SET mpin_hash = ? WHERE id = ?').run(mpinHash, user.id)

  res.clearCookie('mpin_reset', cookieOptions())
  res.json({ ok: true })
})

app.get('/api/protected/example', requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user })
})

if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const distDir = path.resolve(__dirname, '..', 'dist')

  app.use(express.static(distDir))

  // Express 5 compatible fallback route
  app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

const port = Number(process.env.PORT ?? 5177)
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
