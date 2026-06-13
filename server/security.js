import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'

export function getJwtSecret() {
  const fromEnv = process.env.AUTH_JWT_SECRET
  if (fromEnv && fromEnv.length >= 32) return fromEnv
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_JWT_SECRET must be set to a 32+ char value in production')
  }
  return crypto.randomBytes(32).toString('hex')
}

export function signSession({ secret, userId }) {
  return jwt.sign({ sub: String(userId), typ: 'session' }, secret, {
    expiresIn: '7d',
  })
}

export function signReset({ secret, mobile }) {
  return jwt.sign({ mobile, typ: 'mpin_reset' }, secret, { expiresIn: '10m' })
}

export function verifyToken({ secret, token }) {
  return jwt.verify(token, secret)
}

export function cookieOptions() {
  const secure = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
  }
}

