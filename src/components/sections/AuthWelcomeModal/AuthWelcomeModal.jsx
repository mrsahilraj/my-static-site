import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext.jsx'
import { useAuthMode } from '../../../auth/AuthModeContext.jsx'
import Button from '../../ui/Button/Button.jsx'
import Modal from '../../ui/Modal/Modal.jsx'
import styles from './AuthWelcomeModal.module.css'

function BrandMark(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <defs>
        <linearGradient id="ring" x1="14" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f0d89a" />
          <stop offset="0.46" stopColor="#cfa24f" />
          <stop offset="1" stopColor="#a8742b" />
        </linearGradient>
        <radialGradient
          id="glow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(32 20) rotate(90) scale(32)"
        >
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
        <path
          d="M32 22.4c5.6 0 10.2 4.6 10.2 10.2S37.6 42.8 32 42.8 21.8 38.2 21.8 32.6 26.4 22.4 32 22.4Z"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2.2"
        />
      </g>
    </svg>
  )
}

function Splash({ onClose }) {
  const navigate = useNavigate()
  const { setAuthMode } = useAuthMode()

  return (
    <div className={styles.splash}>
      <div className={styles.logo} aria-hidden="true">
        <BrandMark className={styles.logoSvg} />
      </div>
      <h3 className={styles.welcome}>Welcome to Simar Siggh Studio</h3>
      <p className={styles.welcomeSub}>Where creative work feels effortless.</p>
      <div className={styles.actions}>
        <Button 
          variant="secondary" 
          onClick={() => {
            onClose()
            setAuthMode('register')
            navigate('/auth')
          }}
        >
          New user, sign up
        </Button>
        <Button 
          onClick={() => {
            onClose()
            setAuthMode('login')
            navigate('/auth')
          }}
        >
          Existing user, log in
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          Continue
        </Button>
      </div>
    </div>
  )
}

export default function AuthWelcomeModal() {
  const [open, setOpen] = useState(false)
  const { status, user } = useAuth()

  useEffect(() => {
    if (status !== 'ready') return
    if (user) return
    const alreadySeen = sessionStorage.getItem('seen_welcome') === '1'
    if (alreadySeen) return
    const t = setTimeout(() => setOpen(true), 250)
    return () => clearTimeout(t)
  }, [status, user])

  function close() {
    sessionStorage.setItem('seen_welcome', '1')
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={close} size="sm">
      <Splash onClose={close} />
    </Modal>
  )
}
