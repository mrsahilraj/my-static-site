import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext.jsx'
import Button from '../../../components/ui/Button/Button.jsx'
import TextField from '../../../components/ui/TextField/TextField.jsx'
import AuthFrame from '../AuthFrame/AuthFrame.jsx'
import styles from './Login.module.css'

function normalizeMobile(value) {
  const raw = String(value ?? '').trim()
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3)
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export default function Login() {
  const { status, user, login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const returnTo = params.get('returnTo') || '/#main-content'
  const presetMobile = normalizeMobile(params.get('mobile'))
  const directMpin = params.get('step') === 'mpin' && presetMobile.length === 10

  const [values, setValues] = useState({ mobile: presetMobile, mpin: '' })
  const [error, setError] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [showMpin, setShowMpin] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [touched, setTouched] = useState({ mobile: false, mpin: false })

  const mobileError = useMemo(() => {
    const mobile = normalizeMobile(values.mobile)
    if (!mobile) return 'Mobile number is required.'
    if (mobile.length !== 10) return 'Mobile number must be exactly 10 digits.'
    return ''
  }, [values.mobile])

  const mpinError = useMemo(() => {
    if (!values.mpin) return 'MPIN is required.'
    if (!/^\d{4}$/.test(values.mpin)) return 'MPIN must be exactly 4 digits.'
    return ''
  }, [values.mpin])

  const canSubmit = useMemo(() => {
    const mobile = normalizeMobile(values.mobile)
    const mpinOk = /^\d{4}$/.test(values.mpin)
    return mobile.length === 10 && mpinOk
  }, [values.mobile, values.mpin])

  useEffect(() => {
    if (status === 'ready' && user) {
      navigate(returnTo, { replace: true })
    }
  }, [navigate, returnTo, status, user])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setAttempted(true)
    if (!canSubmit) return
    setSubmitStatus('loading')
    try {
      await login({ mobile: values.mobile, mpin: values.mpin })
      navigate(returnTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed.')
      setSubmitStatus('idle')
    }
  }

  return (
    <>
      <AuthFrame
        title="Log in"
        subtitle={
          directMpin
            ? `Enter your 4-digit MPIN for ${presetMobile}.`
            : 'Enter your mobile number and 4-digit MPIN.'
        }
        footer={
          <div className={styles.footerLinks}>
            {directMpin && (
              <Link to="/auth/login" className={styles.link}>
                Change number
              </Link>
            )}
            <Link to="/auth/register" className={styles.link}>
              Create account
            </Link>
            <Link to="/auth/forgot" className={styles.link}>
              Forgot MPIN
            </Link>
          </div>
        }
      >
        <form className={styles.form} onSubmit={onSubmit}>
          {!directMpin ? (
            <TextField
              id="login-mobile"
              label="Mobile Number"
              placeholder="Enter mobile number"
              inputMode="tel"
              autoComplete="tel"
              value={values.mobile}
              onChange={(e) =>
                setValues((v) => ({ ...v, mobile: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
              error={attempted || touched.mobile ? mobileError : ''}
            />
          ) : (
            <TextField
              id="login-mobile"
              label="Mobile Number"
              value={presetMobile}
              readOnly
            />
          )}
          <TextField
            id="login-mpin"
            label="4-digit MPIN"
            placeholder="••••"
            type={showMpin ? 'text' : 'password'}
            inputMode="numeric"
            autoComplete="current-password"
            maxLength={4}
            value={values.mpin}
            autoFocus={directMpin}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, '').slice(0, 4)
              setValues((v) => ({ ...v, mpin: next }))
            }}
            onBlur={() => setTouched((t) => ({ ...t, mpin: true }))}
            error={attempted || touched.mpin ? mpinError : ''}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowMpin((v) => !v)}
                aria-label={showMpin ? 'Hide MPIN' : 'Show MPIN'}
              >
                {showMpin ? 'Hide' : 'Show'}
              </button>
            }
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit || submitStatus === 'loading'}
          >
            {submitStatus === 'loading' ? 'Signing in…' : 'Log in'}
          </Button>
        </form>
      </AuthFrame>
    </>
  )
}
