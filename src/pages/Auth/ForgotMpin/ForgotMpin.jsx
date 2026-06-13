import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../../../auth/api.js'
import Button from '../../../components/ui/Button/Button.jsx'
import TextField from '../../../components/ui/TextField/TextField.jsx'
import AuthFrame from '../AuthFrame/AuthFrame.jsx'
import styles from './ForgotMpin.module.css'

function normalizeMobile(value) {
  const raw = String(value ?? '').trim()
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3)
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export default function ForgotMpin() {
  const navigate = useNavigate()
  const [step, setStep] = useState('request')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [debugOtp, setDebugOtp] = useState('')
  const [values, setValues] = useState({
    mobile: '',
    otp: '',
    mpin: '',
    confirmMpin: '',
  })

  const canRequest = useMemo(() => normalizeMobile(values.mobile).length === 10, [values.mobile])
  const canVerify = useMemo(() => /^\d{6}$/.test(values.otp), [values.otp])
  const canReset = useMemo(() => /^\d{4}$/.test(values.mpin) && values.mpin === values.confirmMpin, [
    values.confirmMpin,
    values.mpin,
  ])

  async function requestOtp(e) {
    e.preventDefault()
    setError('')
    setDebugOtp('')
    if (!canRequest) return
    setStatus('loading')
    try {
      const data = await apiFetch('/api/auth/otp/request', {
        method: 'POST',
        body: { mobile: values.mobile },
      })
      if (data?.debugOtp) setDebugOtp(String(data.debugOtp))
      setStep('verify')
      setStatus('idle')
    } catch (err) {
      setError(err.message || 'Failed to request OTP.')
      setStatus('idle')
    }
  }

  async function verifyOtp(e) {
    e.preventDefault()
    setError('')
    if (!canVerify) return
    setStatus('loading')
    try {
      await apiFetch('/api/auth/otp/verify', {
        method: 'POST',
        body: { mobile: values.mobile, otp: values.otp },
      })
      setStep('reset')
      setStatus('idle')
    } catch (err) {
      setError(err.message || 'OTP verification failed.')
      setStatus('idle')
    }
  }

  async function resetMpin(e) {
    e.preventDefault()
    setError('')
    if (!canReset) return
    setStatus('loading')
    try {
      await apiFetch('/api/auth/mpin/reset', {
        method: 'POST',
        body: { mpin: values.mpin, confirmMpin: values.confirmMpin },
      })
      setStatus('idle')
      navigate('/auth/login', { replace: true })
    } catch (err) {
      setError(err.message || 'MPIN reset failed.')
      setStatus('idle')
    }
  }

  return (
    <AuthFrame
      title="Forgot MPIN"
      subtitle="Verify your mobile number with an OTP, then set a new 4‑digit MPIN."
      footer={
        <div className={styles.footerLinks}>
          <Link to="/auth/login" className={styles.link}>
            Back to login
          </Link>
          <Link to="/auth/register" className={styles.link}>
            Create account
          </Link>
        </div>
      }
    >
      {step === 'request' && (
        <form className={styles.form} onSubmit={requestOtp}>
          <TextField
            id="f-mobile"
            label="Mobile Number"
            placeholder="Enter mobile number"
            inputMode="tel"
            autoComplete="tel"
            value={values.mobile}
            onChange={(e) => setValues((v) => ({ ...v, mobile: e.target.value }))}
          />
          {error && <div className={styles.error}>{error}</div>}
          <Button type="submit" size="lg" disabled={!canRequest || status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send OTP'}
          </Button>
        </form>
      )}

      {step === 'verify' && (
        <form className={styles.form} onSubmit={verifyOtp}>
          <div className={styles.readonly}>
            <span className={styles.k}>Mobile</span>
            <span className={styles.v}>{normalizeMobile(values.mobile)}</span>
          </div>
          <TextField
            id="f-otp"
            label="OTP"
            placeholder="6-digit code"
            inputMode="numeric"
            maxLength={6}
            value={values.otp}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, '').slice(0, 6)
              setValues((v) => ({ ...v, otp: next }))
            }}
          />
          {debugOtp && (
            <div className={styles.debug}>
              OTP (debug): <span className={styles.code}>{debugOtp}</span>
            </div>
          )}
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.row}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setStep('request')
                setValues((v) => ({ ...v, otp: '' }))
                setError('')
              }}
            >
              Change number
            </Button>
            <Button type="submit" disabled={!canVerify || status === 'loading'}>
              {status === 'loading' ? 'Verifying…' : 'Verify OTP'}
            </Button>
          </div>
        </form>
      )}

      {step === 'reset' && (
        <form className={styles.form} onSubmit={resetMpin}>
          <TextField
            id="f-mpin"
            label="New 4-digit MPIN"
            placeholder="••••"
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={values.mpin}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, '').slice(0, 4)
              setValues((v) => ({ ...v, mpin: next }))
            }}
          />
          <TextField
            id="f-confirm"
            label="Confirm MPIN"
            placeholder="••••"
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={values.confirmMpin}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, '').slice(0, 4)
              setValues((v) => ({ ...v, confirmMpin: next }))
            }}
          />
          {error && <div className={styles.error}>{error}</div>}
          <Button type="submit" size="lg" disabled={!canReset || status === 'loading'}>
            {status === 'loading' ? 'Updating…' : 'Set new MPIN'}
          </Button>
        </form>
      )}
    </AuthFrame>
  )
}
