import { useState } from 'react'
import styles from './Accordion.module.css'

export default function Accordion({ items, singleOpen = false }) {
  const [openId, setOpenId] = useState(null)

  if (!items || items.length === 0) return null

  const handleToggle = (id) => {
    if (singleOpen) {
      setOpenId(openId === id ? null : id)
    }
  }

  return (
    <div className={styles.root}>
      {items.map((it) => (
        <div 
          key={it.id} 
          className={styles.item}
          data-open={singleOpen ? (openId === it.id) : undefined}
        >
          <button
            type="button"
            className={styles.summary}
            onClick={() => handleToggle(it.id)}
            aria-expanded={singleOpen ? openId === it.id : undefined}
          >
            <span className={styles.q}>{it.question}</span>
            <span className={styles.chev} aria-hidden="true">
              ▾
            </span>
          </button>
          {(!singleOpen || openId === it.id) && (
            <div className={styles.content}>
              <p className={styles.a}>{it.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
