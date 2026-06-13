import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Hero.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext.jsx'
import { apiFetch } from '../../../auth/api.js'
import Button from '../../ui/Button/Button.jsx'
import Modal from '../../ui/Modal/Modal.jsx'

function LogoMark(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <defs>
        <linearGradient id="ring" x1="14" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f0d89a" />
          <stop offset="0.46" stopColor="#cfa24f" />
          <stop offset="1" stopColor="#a8742b" />
        </linearGradient>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 20) rotate(90) scale(32)">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#070707" />
      <circle cx="32" cy="32" r="30" fill="url(#glow)" />
      <circle cx="32" cy="32" r="29" stroke="url(#ring)" strokeWidth="2.4" />
      <circle cx="32" cy="32" r="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.98">
        <circle cx="32" cy="24" r="12" stroke="rgba(255,255,255,0.55)" strokeWidth="3.2" />
        <circle cx="24.7" cy="38" r="12" stroke="rgba(255,255,255,0.55)" strokeWidth="3.2" />
        <circle cx="39.3" cy="38" r="12" stroke="rgba(255,255,255,0.55)" strokeWidth="3.2" />
        <path d="M32 22.4c5.6 0 10.2 4.6 10.2 10.2S37.6 42.8 32 42.8 21.8 38.2 21.8 32.6 26.4 22.4 32 22.4Z" stroke="rgba(255,255,255,0.18)" strokeWidth="2.2" />
      </g>
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 12.5a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.8 20.1c1.7-3.4 4.2-5.1 7.2-5.1s5.5 1.7 7.2 5.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8.5 4.5 6.9 6.1c-1 1-1.3 2.5-.7 3.8 1.6 3.5 4.4 6.3 7.9 7.9 1.3.6 2.8.3 3.8-.7l1.6-1.6a1.5 1.5 0 0 0-.3-2.4l-2.4-1.5a1.5 1.5 0 0 0-1.9.3l-.8.8a10.6 10.6 0 0 1-4.8-4.8l.8-.8a1.5 1.5 0 0 0 .3-1.9L10.9 4.8a1.5 1.5 0 0 0-2.4-.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3.8 18.6 6v5.4c0 4.5-2.4 7.6-6.6 8.8-4.2-1.2-6.6-4.3-6.6-8.8V6L12 3.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m9.6 11.9 1.6 1.6 3.5-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 3v3M17 3v3M4.5 9h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function HeadsetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5.5 13v-1a6.5 6.5 0 1 1 13 0v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5.5 13h2.2v4.2H5.5A1.5 1.5 0 0 1 4 15.7v-1.2A1.5 1.5 0 0 1 5.5 13Zm10.8 0h2.2a1.5 1.5 0 0 1 1.5 1.5v1.2a1.5 1.5 0 0 1-1.5 1.5h-2.2V13Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function AwardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m9.5 14.2-1 5 3.5-2 3.5 2-1-5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function StudioScene() {
  return (
    <svg className={styles.sceneSvg} viewBox="0 0 1000 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="heroWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#170c06" />
          <stop offset="0.55" stopColor="#40210d" />
          <stop offset="1" stopColor="#140b06" />
        </linearGradient>
        <linearGradient id="consoleGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5c2408" />
          <stop offset="0.5" stopColor="#a45d1d" />
          <stop offset="1" stopColor="#41200b" />
        </linearGradient>
      </defs>
      <rect width="1000" height="760" fill="url(#heroWall)" />
      <rect x="60" y="48" width="880" height="664" rx="22" fill="rgba(0,0,0,0.2)" stroke="rgba(191,126,59,0.18)" strokeWidth="4" />
      <rect x="180" y="120" width="620" height="220" rx="18" fill="rgba(0,0,0,0.44)" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <rect x="210" y="146" width="560" height="170" rx="12" fill="rgba(10,10,10,0.88)" />
      <rect x="318" y="362" width="430" height="178" rx="18" fill="#241109" />
      <path d="M252 474c138-74 347-74 485 0v74H252v-74Z" fill="url(#consoleGlow)" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <path d="M282 474c118-48 291-48 425 0" fill="none" stroke="rgba(255,224,184,0.35)" strokeWidth="8" strokeLinecap="round" />
      <path d="M330 498h326" stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round" />
      <rect x="94" y="68" width="30" height="560" rx="12" fill="rgba(120,68,28,0.55)" />
      <rect x="876" y="68" width="30" height="560" rx="12" fill="rgba(120,68,28,0.55)" />
      <rect x="132" y="68" width="16" height="560" rx="8" fill="rgba(255,164,88,0.22)" />
      <rect x="852" y="68" width="16" height="560" rx="8" fill="rgba(255,164,88,0.22)" />
      <circle cx="310" cy="312" r="44" fill="#161616" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
      <circle cx="310" cy="312" r="16" fill="rgba(245,204,145,0.88)" />
      <circle cx="700" cy="312" r="44" fill="#161616" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
      <circle cx="700" cy="312" r="16" fill="rgba(245,204,145,0.88)" />
      <rect x="442" y="540" width="118" height="98" rx="18" fill="#110c0a" />
      <path d="M500 540v-42" stroke="rgba(255,255,255,0.18)" strokeWidth="10" strokeLinecap="round" />
      <path d="M446 638 406 710M556 638l40 72" stroke="rgba(0,0,0,0.48)" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="506" cy="708" rx="180" ry="26" fill="rgba(0,0,0,0.34)" />
      <circle cx="172" cy="596" r="56" fill="rgba(18,36,18,0.8)" />
      <circle cx="196" cy="548" r="34" fill="rgba(28,50,24,0.9)" />
      <rect x="160" y="596" width="18" height="72" rx="8" fill="#2e1c10" />
      <rect x="242" y="98" width="10" height="180" fill="rgba(255,168,94,0.14)" />
      <rect x="760" y="98" width="10" height="180" fill="rgba(255,168,94,0.14)" />
    </svg>
  )
}

function formatMemberSince(value) {
  const stamp = Number(value)
  if (!Number.isFinite(stamp) || stamp <= 0) return 'Recently joined'
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(stamp))
}

function getInitials(user) {
  const name = String(user?.fullName ?? '').trim()
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean)
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
  }
  const mobile = String(user?.mobile ?? '').trim()
  return mobile ? mobile.slice(-2) : 'SS'
}

export default function Hero() {
  const navigate = useNavigate()
  const { status, user, logout, updateProfile } = useAuth()
  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileSection, setProfileSection] = useState('view')
  const [profileStatus, setProfileStatus] = useState('idle')
  const [profileError, setProfileError] = useState('')
  const [profileMessage, setProfileMessage] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
  })
  // OTP State
  const [otpOpen, setOtpOpen] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpStatus, setOtpStatus] = useState('idle')
  const [otpResendTimer, setOtpResendTimer] = useState(0)
  const [pendingProfileUpdate, setPendingProfileUpdate] = useState(null)
  const [debugOtp, setDebugOtp] = useState('')

  const highlights = [
    { id: 'premium', title: 'Premium', sub: 'Studios', icon: ShieldIcon },
    { id: 'booking', title: 'Easy', sub: 'Booking', icon: CalendarIcon },
    { id: 'support', title: '24/7', sub: 'Support', icon: HeadsetIcon },
    { id: 'quality', title: 'Top Quality', sub: 'Equipment', icon: AwardIcon },
  ]

  const trust = [
    { id: 'trusted', title: 'Secure & Trusted', sub: 'Your data is safe with us', icon: ShieldIcon },
    { id: 'easy', title: 'Easy Booking', sub: 'Book your studio in minutes', icon: CalendarIcon },
    { id: 'support', title: '24/7 Support', sub: "We're here to help you anytime", icon: HeadsetIcon },
    { id: 'premium', title: 'Premium Studios', sub: 'Top quality studios & equipment', icon: AwardIcon },
  ]

  useEffect(() => {
    if (status === 'ready' && !user) {
      navigate('/auth', { replace: true })
    }
  }, [navigate, status, user])

  useEffect(() => {
    setForm({
      fullName: user?.fullName ?? '',
      email: user?.email ?? '',
      mobile: user?.mobile ?? '',
    })
  }, [user])

  // OTP Resend Timer
  useEffect(() => {
    let interval
    if (otpResendTimer > 0) {
      interval = setInterval(() => {
        setOtpResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpResendTimer])

  const requestOtp = useCallback(async () => {
    setOtpError('')
    setOtpStatus('loading')
    try {
      const data = await apiFetch('/api/auth/profile/otp/request', { method: 'POST' })
      if (data?.debugOtp) {
        setDebugOtp(data.debugOtp)
      }
      setOtpResendTimer(60)
    } catch (err) {
      setOtpError(err.message || 'Failed to send OTP.')
    } finally {
      setOtpStatus('idle')
    }
  }, [])

  const verifyOtpAndUpdate = useCallback(async () => {
    setOtpError('')
    setOtpStatus('loading')
    try {
      const data = await apiFetch('/api/auth/profile/otp/verify', {
        method: 'POST',
        body: {
          otp: otpValue,
          ...pendingProfileUpdate,
        },
      })
      // Update user in AuthContext
      updateProfile(data.user)
      setForm({
        fullName: data.user.fullName,
        email: data.user.email || '',
        mobile: data.user.mobile,
      })
      setProfileMessage('Profile updated successfully.')
      setProfileSection('view')
      setOtpOpen(false)
    } catch (err) {
      setOtpError(err.message || 'OTP verification failed.')
    } finally {
      setOtpStatus('idle')
    }
  }, [otpValue, pendingProfileUpdate, updateProfile])

  useEffect(() => {
    if (!menuOpen) return

    function onPointerDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const accountMeta = useMemo(
    () => [
      { id: 'name', label: 'Name', value: user?.fullName || 'Not provided' },
      { id: 'email', label: 'Email', value: user?.email || 'Not provided' },
      { id: 'mobile', label: 'Phone Number', value: user?.mobile || 'Not provided' },
      { id: 'member', label: 'Member Since', value: formatMemberSince(user?.createdAt) },
      { id: 'account', label: 'Account ID', value: user?.id ? `STUDIO-${String(user.id).padStart(4, '0')}` : 'Pending' },
    ],
    [user],
  )

  function openProfile(section) {
    setProfileSection(section)
    setProfileOpen(true)
    setMenuOpen(false)
    setProfileError('')
    setProfileMessage('')
  }

  async function onLogout() {
    setMenuOpen(false)
    setProfileOpen(false)
    await logout()
    navigate('/auth', { replace: true })
  }

  const handleModalClose = useCallback(() => setProfileOpen(false), [])

  async function onSaveProfile(e) {
    e.preventDefault()
    setProfileError('')
    setProfileMessage('')

    const fullName = String(form.fullName ?? '').trim()
    const email = String(form.email ?? '').trim()
    const mobile = String(form.mobile ?? '').replace(/\D/g, '')

    if (fullName.length < 2) {
      setProfileError('Full name must be at least 2 characters.')
      return
    }
    if (mobile.length !== 10) {
      setProfileError('Mobile number must be exactly 10 digits.')
      return
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileError('Please enter a valid email address.')
      return
    }

    // Check if only email changed (no OTP needed for email)
    const emailChanged = (email || null) !== (user?.email || null)
    const nameChanged = fullName !== user?.fullName
    const mobileChanged = mobile !== user?.mobile

    if (!nameChanged && !mobileChanged) {
      // Only email changed, update directly
      setProfileStatus('loading')
      try {
        const savedUser = await updateProfile({ fullName, email: email || null, mobile })
        setForm({
          fullName: savedUser?.fullName ?? fullName,
          email: savedUser?.email ?? email,
          mobile: savedUser?.mobile ?? mobile,
        })
        setProfileMessage('Profile updated successfully.')
        setProfileSection('view')
      } catch (err) {
        setProfileError(err.message || 'Unable to update profile.')
      } finally {
        setProfileStatus('idle')
      }
    } else {
      // Need OTP for name/mobile change
      setPendingProfileUpdate({ fullName, email: email || null, mobile })
      setOtpOpen(true)
      setOtpValue('')
      setOtpError('')
      // Request OTP
      await requestOtp()
    }
  }

  return (
    <section className={styles.hero} aria-label="Landing hero">
      <div className={styles.heroGrid}>
        <div className={styles.visualPanel}>
          <div className={styles.visualMedia}>
            <StudioScene />
          </div>
          <div className={styles.visualOverlay}>
            <div className={styles.profileDock} ref={menuRef}>
              <button
                type="button"
                className={styles.profileButton}
                aria-label="Open profile menu"
                aria-haspopup="menu"
                aria-expanded={menuOpen ? 'true' : 'false'}
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span className={styles.profileButtonGlow} aria-hidden="true" />
                <span className={styles.profileAvatar}>{getInitials(user)}</span>
                <span className={styles.profileButtonMeta}>
                  <span className={styles.profileButtonLabel}>Account</span>
                  <span className={styles.profileButtonName}>{user?.fullName || 'Studio User'}</span>
                </span>
                <UserIcon className={styles.profileButtonIcon} />
              </button>

              <div className={[styles.profileMenu, menuOpen ? styles.profileMenuOpen : null].filter(Boolean).join(' ')} role="menu">
                <button type="button" className={styles.profileMenuItem} role="menuitem" onClick={() => openProfile('view')}>
                  <span className={styles.profileMenuTitle}>View Profile</span>
                  <span className={styles.profileMenuSub}>See your studio member details.</span>
                </button>
                <button type="button" className={styles.profileMenuItem} role="menuitem" onClick={() => openProfile('edit')}>
                  <span className={styles.profileMenuTitle}>Edit Profile</span>
                  <span className={styles.profileMenuSub}>Update your name, email, and phone.</span>
                </button>
                <button type="button" className={styles.profileMenuItem} role="menuitem" onClick={() => openProfile('account')}>
                  <span className={styles.profileMenuTitle}>Account Details</span>
                  <span className={styles.profileMenuSub}>Review account and membership info.</span>
                </button>
                <button type="button" className={[styles.profileMenuItem, styles.profileMenuLogout].join(' ')} role="menuitem" onClick={onLogout}>
                  <span className={styles.profileMenuTitle}>Logout</span>
                  <span className={styles.profileMenuSub}>End this session and return to `/auth`.</span>
                </button>
              </div>
            </div>

            <div className={styles.brand} aria-label="Simar Siggh Studio">
              <div className={styles.logo} aria-hidden="true">
                <LogoMark className={styles.logoSvg} />
              </div>
              <div className={styles.brandText}>
                <div className={styles.brandName}>SIMAR SINGH</div>
                <div className={styles.brandSub}>STUDIOS</div>
              </div>
            </div>

            <p className={styles.script}>Where Sound Becomes Story</p>
            <p className={styles.description}>
              Professional studio spaces and world-class equipment to bring your creative vision to life.
            </p>

            <div className={styles.highlights} role="list">
              {highlights.map((item) => {
                const Comp = item.icon
                return (
                  <div key={item.id} className={styles.highlight} role="listitem">
                    <span className={styles.highlightIcon} aria-hidden="true">
                      <Comp />
                    </span>
                    <span className={styles.highlightTitle}>{item.title}</span>
                    <span className={styles.highlightSub}>{item.sub}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.trustBar} role="list">
        {trust.map((item) => {
          const Comp = item.icon
          return (
            <div key={item.id} className={styles.trustItem} role="listitem">
              <span className={styles.trustIcon} aria-hidden="true">
                <Comp />
              </span>
              <div className={styles.trustText}>
                <div className={styles.trustTitle}>{item.title}</div>
                <div className={styles.trustSub}>{item.sub}</div>
              </div>
            </div>
          )
        })}
      </div>

      <Modal
        open={profileOpen}
        onClose={handleModalClose}
        title={
          profileSection === 'edit'
            ? 'Edit Profile'
            : profileSection === 'account'
              ? 'Account Details'
              : 'Profile'
        }
        description="Manage your Simar Singh Studios account information."
        size="lg"
      >
        <div className={styles.profileModal}>
          <div className={styles.profileModalTabs}>
            <button
              type="button"
              className={[styles.profileTab, profileSection === 'view' ? styles.profileTabActive : null].filter(Boolean).join(' ')}
              onClick={() => setProfileSection('view')}
            >
              View Profile
            </button>
            <button
              type="button"
              className={[styles.profileTab, profileSection === 'edit' ? styles.profileTabActive : null].filter(Boolean).join(' ')}
              onClick={() => setProfileSection('edit')}
            >
              Edit Profile
            </button>
            <button
              type="button"
              className={[styles.profileTab, profileSection === 'account' ? styles.profileTabActive : null].filter(Boolean).join(' ')}
              onClick={() => setProfileSection('account')}
            >
              Account Details
            </button>
          </div>

          {profileMessage && <div className={styles.profileSuccess}>{profileMessage}</div>}
          {profileError && <div className={styles.profileError}>{profileError}</div>}

          {profileSection === 'edit' ? (
            <form className={styles.profileForm} onSubmit={onSaveProfile}>
              <div className={styles.profileHero}>
                <div className={styles.profileHeroAvatar}>{getInitials(user)}</div>
                <div className={styles.profileHeroMeta}>
                  <div className={styles.profileHeroTitle}>{user?.fullName || 'Studio User'}</div>
                  <div className={styles.profileHeroSub}>Update your account information and keep your studio access details current.</div>
                </div>
              </div>

              <div className={styles.profileFields}>
                <label className={styles.profileField}>
                  <span>Full Name</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm((value) => ({ ...value, fullName: e.target.value }))}
                  />
                </label>
                <label className={styles.profileField}>
                  <span>Email Address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((value) => ({ ...value, email: e.target.value }))}
                  />
                </label>
                <label className={styles.profileField}>
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm((value) => ({ ...value, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))
                    }
                  />
                </label>
              </div>

              <div className={styles.profileActions}>
                <Button type="button" variant="secondary" onClick={() => setProfileSection('view')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={profileStatus === 'loading'}>
                  {profileStatus === 'loading' ? 'Saving…' : 'Save Changes'}
                </Button>
              </div>
            </form>
          ) : (
            <div className={styles.profilePanels}>
              <div className={styles.profileHero}>
                <div className={styles.profileHeroAvatar}>{getInitials(user)}</div>
                <div className={styles.profileHeroMeta}>
                  <div className={styles.profileHeroTitle}>{user?.fullName || 'Studio User'}</div>
                  <div className={styles.profileHeroSub}>
                    {profileSection === 'account'
                      ? 'Your studio membership details and account status.'
                      : 'Your authenticated studio profile information.'}
                  </div>
                </div>
              </div>

              <div className={styles.profileInfoGrid}>
                {accountMeta.map((item) => (
                  <article key={item.id} className={styles.profileInfoCard}>
                    <div className={styles.profileInfoLabel}>{item.label}</div>
                    <div className={styles.profileInfoValue}>{item.value}</div>
                  </article>
                ))}
              </div>

              {profileSection === 'account' && (
                <div className={styles.accountBox}>
                  <div className={styles.accountTitle}>Account Information</div>
                  <div className={styles.accountText}>
                    Your Simar Singh Studios session is active. Use Edit Profile to update contact details, or Logout to return to `/auth`.
                  </div>
                </div>
              )}

              <div className={styles.profileActions}>
                <Button type="button" variant="secondary" onClick={() => setProfileSection('edit')}>
                  Edit Profile
                </Button>
                <Button type="button" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* OTP Verification Modal */}
      <Modal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        title="Verify Your Account"
        description="Please enter the OTP sent to your registered mobile number."
        size="md"
      >
        <div className={styles.otpModal}>
          <div className={styles.otpInfo}>
            <div className={styles.otpMobile}>
              Mobile: {user?.mobile ? `***${user.mobile.slice(-3)}` : ''}
            </div>
            {debugOtp && (
              <div className={styles.otpDebug}>
                Debug OTP: <strong>{debugOtp}</strong>
              </div>
            )}
          </div>

          <label className={styles.otpField}>
            <span>OTP Code</span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
            />
          </label>

          {otpError && <div className={styles.otpError}>{otpError}</div>}

          <div className={styles.otpActions}>
            <Button
              type="button"
              variant="secondary"
              disabled={otpResendTimer > 0 || otpStatus === 'loading'}
              onClick={requestOtp}
            >
              {otpResendTimer > 0 ? `Resend OTP (${otpResendTimer}s)` : 'Resend OTP'}
            </Button>
            <Button
              type="button"
              disabled={otpValue.length !== 6 || otpStatus === 'loading'}
              onClick={verifyOtpAndUpdate}
            >
              {otpStatus === 'loading' ? 'Verifying…' : 'Verify OTP'}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
