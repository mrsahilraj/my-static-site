import { useState } from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import Icon from '../../components/ui/Icon/Icon.jsx'
import Reveal from '../../components/ui/Reveal/Reveal.jsx'
import TextField from '../../components/ui/TextField/TextField.jsx'
import styles from './Contact.module.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2200)
  }

  return (
    <div className={styles.page}>
      <Reveal>
        <header className={styles.header}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>
            Tell us what you’re building and we’ll suggest a space + package.
          </p>
        </header>
      </Reveal>

      <div className={styles.grid}>
        <Reveal>
          <div className={styles.panel}>
            <h2 className={styles.h2}>Reach us</h2>
            <div className={styles.rows}>
              <a className={styles.row} href="tel:+10000000000">
                <span className={styles.rowIcon} aria-hidden="true">
                  <Icon name="phone" size={18} />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>Phone</span>
                  <span className={styles.rowSub}>+1 (000) 000‑0000</span>
                </span>
              </a>
              <a className={styles.row} href="mailto:hello@example.com">
                <span className={styles.rowIcon} aria-hidden="true">
                  <Icon name="mail" size={18} />
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>Email</span>
                  <span className={styles.rowSub}>hello@example.com</span>
                </span>
              </a>
              <div className={styles.row} role="note" aria-label="Hours">
                <span className={styles.rowIcon} aria-hidden="true">
                  ⏱
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>Hours</span>
                  <span className={styles.rowSub}>Daily · 9:00–21:00</span>
                </span>
              </div>
            </div>
            <div className={styles.map} role="img" aria-label="Map placeholder">
              <div className={styles.mapGrid} aria-hidden="true" />
              <div className={styles.mapPin} aria-hidden="true">
                ⌁
              </div>
              <div className={styles.mapText}>Central District</div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.h2}>Message</h2>
            <TextField id="m-name" label="Name" placeholder="Your name" required />
            <TextField
              id="m-email"
              label="Email"
              placeholder="you@example.com"
              inputMode="email"
              required
            />
            <TextField
              id="m-project"
              label="Project"
              placeholder="Recording / shoot / podcast…"
              required
            />
            <TextField
              id="m-details"
              label="Details"
              as="textarea"
              rows={5}
              placeholder="Date range, headcount, and any special requirements."
              required
            />
            <Button type="submit" size="lg">
              {sent ? 'Sent' : 'Send'}
            </Button>
            <p className={styles.note}>Demo form—no messages are actually sent.</p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}

