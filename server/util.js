export function normalizeMobile(value) {
  const raw = String(value ?? '').trim()
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3)
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export function validateMobile(mobile) {
  const digits = normalizeMobile(mobile)
  if (!digits) return { ok: false, message: 'Mobile number is required.' }
  if (digits.length !== 10) return { ok: false, message: 'Mobile number must be exactly 10 digits.' }
  return { ok: true, value: digits }
}

export function validateMpin(mpin) {
  const str = String(mpin ?? '')
  if (!/^\d{4}$/.test(str)) {
    return { ok: false, message: 'MPIN must be exactly 4 digits.' }
  }
  return { ok: true, value: str }
}

export function safeUser(userRow) {
  if (!userRow) return null
  return {
    id: userRow.id,
    fullName: userRow.full_name,
    mobile: userRow.mobile,
    email: userRow.email ?? null,
    createdAt: userRow.created_at,
  }
}

export function jsonError(res, status, message) {
  return res.status(status).json({ ok: false, message })
}
