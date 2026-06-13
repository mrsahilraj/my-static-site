import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useAuthMode } from '../../auth/AuthModeContext.jsx'
import { apiFetch } from '../../auth/api.js'
import Button from '../../components/ui/Button/Button.jsx'
import Icon from '../../components/ui/Icon/Icon.jsx'
import TextField from '../../components/ui/TextField/TextField.jsx'
import styles from './LandingAuth.module.css'

function normalizeMobile(value) {
  const raw = String(value ?? '').trim()
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3)
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

const features = [
  { id: 'secure', icon: 'spark', title: 'Premium Studios', sub: 'Luxury production rooms built for creators.' },
  { id: 'booking', icon: 'calendar', title: 'Easy Booking', sub: 'Access your studio experience with a quick secure sign-in.' },
  { id: 'support', icon: 'help', title: 'Creator Support', sub: 'Studio-ready assistance whenever you need it.' },
]

const trust = [
  { id: 'safe', icon: 'spark', title: 'Secure & Trusted', sub: 'Your account and booking flow stay protected.' },
  { id: 'fast', icon: 'calendar', title: 'Fast Access', sub: 'Login or register quickly, then explore the full studio site.' },
  { id: 'support', icon: 'phone', title: 'Studio Assistance', sub: 'Talk to our team for schedules, setup, and support.' },
]

export default function LandingAuth() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const { authMode: mode, setAuthMode: setMode } = useAuthMode()
  const [loginValues, setLoginValues] = useState({ mobile: '', mpin: '' })
  const [registerValues, setRegisterValues] = useState({ fullName: '', mobile: '', mpin: '', confirmMpin: '' })
  const [showLoginMpin, setShowLoginMpin] = useState(false)
  const [showRegisterMpin, setShowRegisterMpin] = useState(false)
  const [showConfirmMpin, setShowConfirmMpin] = useState(false)
  const [loginSubmitStatus, setLoginSubmitStatus] = useState('idle')
  const [registerSubmitStatus, setRegisterSubmitStatus] = useState('idle')
  const [loginAttempted, setLoginAttempted] = useState(false)
  const [registerAttempted, setRegisterAttempted] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [forgotStep, setForgotStep] = useState('request')
  const [forgotValues, setForgotValues] = useState({ mobile: '', otp: '', mpin: '', confirmMpin: '' })
  const [forgotStatus, setForgotStatus] = useState('idle')
  const [forgotError, setForgotError] = useState('')
  const [debugOtp, setDebugOtp] = useState('')

  const loginMobileError = useMemo(() => {
    const mobile = normalizeMobile(loginValues.mobile)
    if (!mobile) return 'Mobile number is required.'
    if (mobile.length !== 10) return 'Mobile number must be exactly 10 digits.'
    return ''
  }, [loginValues.mobile])

  const loginMpinError = useMemo(() => {
    if (!loginValues.mpin) return 'MPIN is required.'
    if (!/^\d{4}$/.test(loginValues.mpin)) return 'MPIN must be exactly 4 digits.'
    return ''
  }, [loginValues.mpin])

  const registerMobileError = useMemo(() => {
    const mobile = normalizeMobile(registerValues.mobile)
    if (!mobile) return 'Mobile number is required.'
    if (mobile.length !== 10) return 'Mobile number must be exactly 10 digits.'
    return ''
  }, [registerValues.mobile])

  const registerMpinError = useMemo(() => {
    if (!registerValues.mpin) return 'MPIN is required.'
    if (!/^\d{4}$/.test(registerValues.mpin)) return 'MPIN must be exactly 4 digits.'
    return ''
  }, [registerValues.mpin])

  const registerFullNameError = useMemo(() => {
    if (!registerValues.fullName) return 'Full Name is required.'
    if (registerValues.fullName.length < 2) return 'Full Name must be at least 2 characters.'
    if (registerValues.fullName.length > 100) return 'Full Name must be at most 100 characters.'
    return ''
  }, [registerValues.fullName])

  const registerConfirmError = useMemo(() => {
    if (!registerValues.confirmMpin) return 'Confirm MPIN is required.'
    if (!/^\d{4}$/.test(registerValues.confirmMpin)) return 'Confirm MPIN must be exactly 4 digits.'
    if (registerValues.mpin && registerValues.confirmMpin !== registerValues.mpin) {
      return 'MPIN and Confirm MPIN must match.'
    }
    return ''
  }, [registerValues.confirmMpin, registerValues.mpin])

  const canLogin = useMemo(() => {
    return normalizeMobile(loginValues.mobile).length === 10 && /^\d{4}$/.test(loginValues.mpin)
  }, [loginValues.mobile, loginValues.mpin])

  const canRegister = useMemo(() => {
    return (
      !registerFullNameError &&
      normalizeMobile(registerValues.mobile).length === 10 &&
      /^\d{4}$/.test(registerValues.mpin) &&
      registerValues.confirmMpin === registerValues.mpin
    )
  }, [registerFullNameError, registerValues.confirmMpin, registerValues.mobile, registerValues.mpin])

  const canRequestOtp = useMemo(() => normalizeMobile(forgotValues.mobile).length === 10, [forgotValues.mobile])
  const canVerifyOtp = useMemo(() => /^\d{6}$/.test(forgotValues.otp), [forgotValues.otp])
  const canResetMpin = useMemo(() => /^\d{4}$/.test(forgotValues.mpin) && forgotValues.mpin === forgotValues.confirmMpin, [forgotValues.confirmMpin, forgotValues.mpin])

  async function onLoginSubmit(e) {
    e.preventDefault()
    setLoginAttempted(true)
    setLoginError('')
    if (!canLogin) return
    setLoginSubmitStatus('loading')
    try {
      await login({ mobile: loginValues.mobile, mpin: loginValues.mpin })
      navigate('/#main-content', { replace: true })
    } catch (err) {
      setLoginError(err.message || 'Login failed.')
      setLoginSubmitStatus('idle')
    }
  }

  async function onRegisterSubmit(e) {
    e.preventDefault()
    setRegisterAttempted(true)
    setRegisterError('')
    if (!canRegister) return
    setRegisterSubmitStatus('loading')
    try {
      await register({
        fullName: registerValues.fullName,
        mobile: registerValues.mobile,
        email: null,
        mpin: registerValues.mpin,
        confirmMpin: registerValues.confirmMpin,
      })
      navigate('/#main-content', { replace: true })
    } catch (err) {
      setRegisterError(err.message || 'Registration failed.')
      setRegisterSubmitStatus('idle')
    }
  }

  async function requestOtp(e) {
    e.preventDefault()
    setForgotError('')
    setDebugOtp('')
    if (!canRequestOtp) return
    setForgotStatus('loading')
    try {
      const data = await apiFetch('/api/auth/otp/request', {
        method: 'POST',
        body: { mobile: forgotValues.mobile },
      })
      if (data?.debugOtp) setDebugOtp(String(data.debugOtp))
      setForgotStep('verify')
      setForgotStatus('idle')
    } catch (err) {
      setForgotError(err.message || 'Failed to request OTP.')
      setForgotStatus('idle')
    }
  }

  async function verifyOtp(e) {
    e.preventDefault()
    setForgotError('')
    if (!canVerifyOtp) return
    setForgotStatus('loading')
    try {
      await apiFetch('/api/auth/otp/verify', {
        method: 'POST',
        body: { mobile: forgotValues.mobile, otp: forgotValues.otp },
      })
      setForgotStep('reset')
      setForgotStatus('idle')
    } catch (err) {
      setForgotError(err.message || 'OTP verification failed.')
      setForgotStatus('idle')
    }
  }

  async function resetMpin(e) {
    e.preventDefault()
    setForgotError('')
    if (!canResetMpin) return
    setForgotStatus('loading')
    try {
      await apiFetch('/api/auth/mpin/reset', {
        method: 'POST',
        body: { mpin: forgotValues.mpin, confirmMpin: forgotValues.confirmMpin },
      })
      setForgotStatus('idle')
      setMode('login')
      setLoginValues({ mobile: forgotValues.mobile, mpin: '' })
      setForgotStep('request')
      setForgotValues({ mobile: '', otp: '', mpin: '', confirmMpin: '' })
    } catch (err) {
      setForgotError(err.message || 'MPIN reset failed.')
      setForgotStatus('idle')
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.visualPanel}>
            <div className={styles.scene}>
              <div className={styles.sceneGlow} aria-hidden="true" />
              <div className={styles.sceneFrame}>
                <div className={styles.console} aria-hidden="true">
                  <div className={styles.consoleScreen} />
                  <div className={styles.consoleDesk} />
                  <div className={styles.consoleLights}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.visualContent}>
              <p className={styles.kicker}>Where Sound Becomes Story</p>
              <h1 className={styles.title}>Premium studio access starts with a secure mobile login.</h1>
              <p className={styles.description}>
                Enter your mobile number to continue into the Simar Singh Studios experience, manage your
                bookings, and explore premium recording, podcast, and production spaces.
              </p>

              <div className={styles.featureGrid} role="list">
                {features.map((item) => (
                  <div key={item.id} className={styles.featureCard} role="listitem">
                    <span className={styles.featureIcon}>
                      <Icon name={item.icon} size={22} />
                    </span>
                    <div className={styles.featureTitle}>{item.title}</div>
                    <div className={styles.featureSub}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.authPanel}>
            <div className={styles.authCard}>
              <h2 className={styles.authTitle}>Studio Access</h2>
              <div className={styles.authLine} aria-hidden="true" />
              <p className={styles.authSub}>Welcome! Sign in or create an account to get started.</p>

              <div className={styles.modeSwitch} role="tablist" aria-label="Authentication forms">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'login'}
                  className={[styles.modeTab, mode === 'login' ? styles.modeTabActive : null].filter(Boolean).join(' ')}
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'register'}
                  className={[styles.modeTab, mode === 'register' ? styles.modeTabActive : null].filter(Boolean).join(' ')}
                  onClick={() => setMode('register')}
                >
                  Register
                </button>
              </div>

              {mode === 'login' ? (
                <form className={styles.authForm} onSubmit={onLoginSubmit}>
                  <TextField
                    id="auth-login-mobile"
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    inputMode="tel"
                    autoComplete="tel"
                    value={loginValues.mobile}
                    onChange={(e) => setLoginValues((v) => ({ ...v, mobile: e.target.value }))}
                    error={loginAttempted ? loginMobileError : ''}
                    className={styles.authField}
                  />
                  <TextField
                    id="auth-login-mpin"
                    label="4-digit MPIN"
                    placeholder="••••"
                    type={showLoginMpin ? 'text' : 'password'}
                    inputMode="numeric"
                    autoComplete="current-password"
                    maxLength={4}
                    value={loginValues.mpin}
                    onChange={(e) =>
                      setLoginValues((v) => ({ ...v, mpin: e.target.value.replace(/\D/g, '').slice(0, 4) }))
                    }
                    error={loginAttempted ? loginMpinError : ''}
                    className={styles.authField}
                    endAdornment={
                      <button
                        type="button"
                        className={styles.showBtn}
                        onClick={() => setShowLoginMpin((v) => !v)}
                        aria-label={showLoginMpin ? 'Hide MPIN' : 'Show MPIN'}
                      >
                        {showLoginMpin ? 'Hide' : 'Show'}
                      </button>
                    }
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#a8702b', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '8px 0' }}
                      onClick={() => {
                        setForgotValues({ ...forgotValues, mobile: loginValues.mobile })
                        setMode('forgot')
                      }}
                    >
                      Forgot MPIN?
                    </button>
                  </div>
                  {loginError && <p className={styles.formError}>{loginError}</p>}
                  <Button type="submit" size="lg" disabled={!canLogin || loginSubmitStatus === 'loading'}>
                    {loginSubmitStatus === 'loading' ? 'Signing in…' : 'Log In'}
                  </Button>
                </form>
              ) : mode === 'register' ? (
                <form className={styles.authForm} onSubmit={onRegisterSubmit}>
                  <TextField
                    id="auth-register-fullname"
                    label="Enter Your Full Name"
                    placeholder="Enter Your Full Name"
                    value={registerValues.fullName}
                    onChange={(e) => setRegisterValues((v) => ({ ...v, fullName: e.target.value }))}
                    error={registerAttempted ? registerFullNameError : ''}
                    className={styles.authField}
                    maxLength={100}
                  />
                  <TextField
                    id="auth-register-mobile"
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    inputMode="tel"
                    autoComplete="tel"
                    value={registerValues.mobile}
                    onChange={(e) => setRegisterValues((v) => ({ ...v, mobile: e.target.value }))}
                    error={registerAttempted ? registerMobileError : ''}
                    className={styles.authField}
                  />
                  <TextField
                    id="auth-register-mpin"
                    label="4-digit MPIN"
                    placeholder="••••"
                    type={showRegisterMpin ? 'text' : 'password'}
                    inputMode="numeric"
                    maxLength={4}
                    value={registerValues.mpin}
                    onChange={(e) =>
                      setRegisterValues((v) => ({ ...v, mpin: e.target.value.replace(/\D/g, '').slice(0, 4) }))
                    }
                    error={registerAttempted ? registerMpinError : ''}
                    className={styles.authField}
                    endAdornment={
                      <button
                        type="button"
                        className={styles.showBtn}
                        onClick={() => setShowRegisterMpin((v) => !v)}
                        aria-label={showRegisterMpin ? 'Hide MPIN' : 'Show MPIN'}
                      >
                        {showRegisterMpin ? 'Hide' : 'Show'}
                      </button>
                    }
                  />
                  <TextField
                    id="auth-register-confirm"
                    label="Confirm MPIN"
                    placeholder="••••"
                    type={showConfirmMpin ? 'text' : 'password'}
                    inputMode="numeric"
                    maxLength={4}
                    value={registerValues.confirmMpin}
                    onChange={(e) =>
                      setRegisterValues((v) => ({ ...v, confirmMpin: e.target.value.replace(/\D/g, '').slice(0, 4) }))
                    }
                    error={registerAttempted ? registerConfirmError : ''}
                    className={styles.authField}
                    endAdornment={
                      <button
                        type="button"
                        className={styles.showBtn}
                        onClick={() => setShowConfirmMpin((v) => !v)}
                        aria-label={showConfirmMpin ? 'Hide MPIN confirmation' : 'Show MPIN confirmation'}
                      >
                        {showConfirmMpin ? 'Hide' : 'Show'}
                      </button>
                    }
                  />
                  {registerError && <p className={styles.formError}>{registerError}</p>}
                  <Button type="submit" size="lg" disabled={!canRegister || registerSubmitStatus === 'loading'}>
                    {registerSubmitStatus === 'loading' ? 'Creating…' : 'Create Account'}
                  </Button>
                </form>
              ) : (
                <div className={styles.authForm}>
                  {forgotStep === 'request' && (
                    <form onSubmit={requestOtp}>
                      <TextField
                        id="forgot-mobile"
                        label="Mobile Number"
                        placeholder="Enter mobile number"
                        inputMode="tel"
                        autoComplete="tel"
                        value={forgotValues.mobile}
                        onChange={(e) => setForgotValues((v) => ({ ...v, mobile: e.target.value }))}
                      />
                      {forgotError && <p className={styles.formError}>{forgotError}</p>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <button
                          type="button"
                          style={{ background: 'none', border: 'none', color: '#a8702b', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: '8px 0' }}
                          onClick={() => setMode('login')}
                        >
                          Back to login
                        </button>
                      </div>
                      <Button type="submit" size="lg" disabled={!canRequestOtp || forgotStatus === 'loading'}>
                        {forgotStatus === 'loading' ? 'Sending…' : 'Send OTP'}
                      </Button>
                    </form>
                  )}
                  {forgotStep === 'verify' && (
                    <form onSubmit={verifyOtp}>
                      <div style={{ padding: '12px', background: 'rgba(168,112,43,0.08)', borderRadius: '12px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: 'rgba(34,26,18,0.8)' }}>Mobile: </span>
                        <span style={{ fontSize: '14px', fontWeight: '900', color: 'rgba(34,26,18,0.95)' }}>{normalizeMobile(forgotValues.mobile)}</span>
                      </div>
                      <TextField
                        id="forgot-otp"
                        label="OTP"
                        placeholder="6-digit code"
                        inputMode="numeric"
                        maxLength={6}
                        value={forgotValues.otp}
                        onChange={(e) => {
                          const next = e.target.value.replace(/\D/g, '').slice(0, 6)
                          setForgotValues((v) => ({ ...v, otp: next }))
                        }}
                      />
                      {debugOtp && (
                        <div style={{ marginBottom: '16px', padding: '8px 12px', background: 'rgba(168,112,43,0.1)', borderRadius: '8px', fontSize: '13px' }}>
                          OTP (debug): <span style={{ fontWeight: '900', color: '#a8702b' }}>{debugOtp}</span>
                        </div>
                      )}
                      {forgotError && <p className={styles.formError}>{forgotError}</p>}
                      <div className={styles.row}>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            setForgotStep('request')
                            setForgotValues((v) => ({ ...v, otp: '' }))
                            setForgotError('')
                          }}
                        >
                          Change number
                        </Button>
                        <Button type="submit" disabled={!canVerifyOtp || forgotStatus === 'loading'}>
                          {forgotStatus === 'loading' ? 'Verifying…' : 'Verify OTP'}
                        </Button>
                      </div>
                    </form>
                  )}
                  {forgotStep === 'reset' && (
                    <form onSubmit={resetMpin}>
                      <TextField
                        id="forgot-mpin"
                        label="New 4-digit MPIN"
                        placeholder="••••"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={forgotValues.mpin}
                        onChange={(e) => {
                          const next = e.target.value.replace(/\D/g, '').slice(0, 4)
                          setForgotValues((v) => ({ ...v, mpin: next }))
                        }}
                      />
                      <TextField
                        id="forgot-confirm"
                        label="Confirm MPIN"
                        placeholder="••••"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={forgotValues.confirmMpin}
                        onChange={(e) => {
                          const next = e.target.value.replace(/\D/g, '').slice(0, 4)
                          setForgotValues((v) => ({ ...v, confirmMpin: next }))
                        }}
                      />
                      {forgotError && <p className={styles.formError}>{forgotError}</p>}
                      <Button type="submit" size="lg" disabled={!canResetMpin || forgotStatus === 'loading'}>
                        {forgotStatus === 'loading' ? 'Updating…' : 'Set new MPIN'}
                      </Button>
                    </form>
                  )}
                </div>
              )}

              <div className={styles.secureBox}>
                <Icon name="spark" size={20} className={styles.secureIcon} />
                <div>
                  <div className={styles.secureTitle}>Secure Login</div>
                  <div className={styles.secureText}>Your number is used only for account access and booking continuity.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Studio benefits">
        <div className={styles.trustInner} role="list">
          {trust.map((item) => (
            <div key={item.id} className={styles.trustItem} role="listitem">
              <span className={styles.trustIcon}>
                <Icon name={item.icon} size={20} />
              </span>
              <div className={styles.trustText}>
                <div className={styles.trustTitle}>{item.title}</div>
                <div className={styles.trustSub}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
