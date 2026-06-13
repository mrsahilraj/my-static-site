import { useCallback } from 'react'
import styles from './SelectStudioCta.module.css'

export default function SelectStudioCta() {
  const onClick = useCallback(() => {
    const el = document.getElementById('studios')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section className={styles.section} aria-label="Select studio">
      <button type="button" className={styles.button} onClick={onClick}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 3v3M17 3v3M4.5 9h15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </span>
        <span className={styles.text}>Select your studio now</span>
      </button>
    </section>
  )
}

