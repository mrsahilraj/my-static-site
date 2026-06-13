import { useEffect, useMemo } from 'react'
import Button from '../Button/Button.jsx'
import Modal from '../Modal/Modal.jsx'
import ConfettiCanvas from './ConfettiCanvas.jsx'
import styles from './CelebrationModal.module.css'

function Checkmark({ variant }) {
  const accentClass =
    variant === 'login' ? styles.checkAccentLogin : styles.checkAccentRegister

  return (
    <div className={[styles.checkWrap, accentClass].join(' ')}>
      <svg
        className={styles.check}
        viewBox="0 0 52 52"
        role="img"
        aria-label="Success"
      >
        <circle className={styles.checkCircle} cx="26" cy="26" r="24" />
        <path
          className={styles.checkPath}
          d="M14.5 27.1l7.1 7.2L38 18.2"
        />
      </svg>
    </div>
  )
}

export default function CelebrationModal({
  open,
  variant,
  onDone,
  autoCloseMs = 1800,
}) {
  const copy = useMemo(() => {
    if (variant === 'login') {
      return {
        title: '✅ Login Successful!',
        message:
          'Congratulations! You have successfully logged into your account.',
        cta: 'Go to dashboard',
      }
    }
    return {
      title: '🎉 Registration Successful!',
      message: 'Congratulations! Your account has been created successfully.',
      cta: 'Continue',
    }
  }, [variant])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => onDone?.(), autoCloseMs)
    return () => clearTimeout(t)
  }, [autoCloseMs, onDone, open])

  return (
    <Modal open={open} onClose={onDone} size="sm">
      <div className={styles.root}>
        <ConfettiCanvas active={open} />
        <div className={styles.content}>
          <Checkmark variant={variant} />
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.message}>{copy.message}</p>
          <div className={styles.actions}>
            <Button type="button" size="lg" onClick={onDone}>
              {copy.cta}
            </Button>
          </div>
          <p className={styles.hint}>Redirecting automatically…</p>
        </div>
      </div>
    </Modal>
  )
}

