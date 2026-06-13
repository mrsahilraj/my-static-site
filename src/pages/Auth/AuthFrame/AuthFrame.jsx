import { Link } from 'react-router-dom'
import styles from './AuthFrame.module.css'

export default function AuthFrame({ title, subtitle, children, footer }) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <Link to="/" className={styles.brand}>
            Simar Siggh Studio
          </Link>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}
