import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext.jsx'
import Button from '../../../components/ui/Button/Button.jsx'
import CelebrationModal from '../../../components/ui/CelebrationModal/CelebrationModal.jsx'
import TextField from '../../../components/ui/TextField/TextField.jsx'
import AuthFrame from '../AuthFrame/AuthFrame.jsx'
import styles from './Register.module.css'

function normalizeMobile(value) {
  const raw = String(value ?? '').trim()
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3)
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export default function Register() {
  const { status, user, register } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const returnTo = params.get('returnTo') || '/#main-content'

  const [values, setValues] = useState({
    mobile: '',
    mpin: '',
    confirmMpin: '',
  })
  const [error, setError] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [successOpen, setSuccessOpen] = useState(false)
  const [showMpin, setShowMpin] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [touched, setTouched] = useState({ mobile: false, mpin: false, confirmMpin: false })

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

  const confirmError = useMemo(() => {
    if (!values.confirmMpin) return 'Confirm MPIN is required.'
    if (!/^\d{4}$/.test(values.confirmMpin)) return 'Confirm MPIN must be exactly 4 digits.'
    if (values.mpin && values.confirmMpin !== values.mpin) return 'MPIN and Confirm MPIN must match.'
    return ''
  }, [values.confirmMpin, values.mpin])

  const canSubmit = useMemo(() => {
    const mobileOk = normalizeMobile(values.mobile).length === 10
    const mpinOk = /^\d{4}$/.test(values.mpin)
    const matchOk = values.mpin === values.confirmMpin
    return mobileOk && mpinOk && matchOk
  }, [values.confirmMpin, values.mobile, values.mpin])

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
      await register({
        mobile: values.mobile,
        fullName: 'User',
        email: null,
        mpin: values.mpin,
        confirmMpin: values.confirmMpin,
      })
      setSuccessOpen(true)
    } catch (err) {
      setError(err.message || 'Registration failed.')
      setSubmitStatus('idle')
    }
  }

  return (
    <>
      <CelebrationModal
        open={successOpen}
        variant="register"
        onDone={() => {
          setSuccessOpen(false)
          navigate(returnTo, { replace: true })
        }}
      />
      <AuthFrame
        title="Create account"
        subtitle="Register with a mobile number and 4‑digit MPIN."
        footer={
          <div className={styles.footerLinks}>
            <Link to="/auth/login" className={styles.link}>
              Already have an account? Log in
            </Link>
          </div>
        }
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <TextField
            id="reg-mobile"
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
          <div className={styles.mpinRow}>
            <TextField
              id="reg-mpin"
              label="4-digit MPIN"
              placeholder="••••"
              type={showMpin ? 'text' : 'password'}
              inputMode="numeric"
              maxLength={4}
              value={values.mpin}
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
            <TextField
              id="reg-confirm"
              label="Confirm MPIN"
              placeholder="••••"
              type={showConfirm ? 'text' : 'password'}
              inputMode="numeric"
              maxLength={4}
              value={values.confirmMpin}
              onChange={(e) => {
                const next = e.target.value.replace(/\D/g, '').slice(0, 4)
                setValues((v) => ({ ...v, confirmMpin: next }))
              }}
              onBlur={() => setTouched((t) => ({ ...t, confirmMpin: true }))}
              error={attempted || touched.confirmMpin ? confirmError : ''}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide MPIN confirmation' : 'Show MPIN confirmation'}
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              }
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit || submitStatus === 'loading' || successOpen}
          >
            {submitStatus === 'loading' ? 'Creating…' : 'Create account'}
          </Button>
        </form>
      </AuthFrame>
    </>
  )
}
