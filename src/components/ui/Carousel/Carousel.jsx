import { useMemo, useRef } from 'react'
import styles from './Carousel.module.css'

export default function Carousel({ label = 'Carousel', children }) {
  const trackRef = useRef(null)
  const childCount = useMemo(
    () => (Array.isArray(children) ? children.length : 1),
    [children],
  )

  function scrollByPage(direction) {
    const el = trackRef.current
    if (!el) return
    const amount = Math.max(220, Math.round(el.clientWidth * 0.86))
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  if (!children) return null

  return (
    <div className={styles.root} aria-label={label}>
      <div className={styles.controls}>
        <div className={styles.meta}>
          <span className={styles.count}>{childCount}</span>
          <span className={styles.label}>{label}</span>
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByPage(-1)}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollByPage(1)}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>
      <div ref={trackRef} className={styles.track} tabIndex={0}>
        {children}
      </div>
    </div>
  )
}

