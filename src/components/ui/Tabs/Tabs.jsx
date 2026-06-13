import { useId, useState } from 'react'
import styles from './Tabs.module.css'

export default function Tabs({ tabs, initialId }) {
  const baseId = useId()
  const firstId = tabs?.[0]?.id
  const [activeId, setActiveId] = useState(initialId ?? firstId)
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]

  if (!tabs || tabs.length === 0) return null

  return (
    <div className={styles.root}>
      <div className={styles.list} role="tablist" aria-label="Section tabs">
        {tabs.map((t) => {
          const selected = t.id === active.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              className={[styles.tab, selected ? styles.tabActive : null]
                .filter(Boolean)
                .join(' ')}
              aria-selected={selected}
              aria-controls={`${baseId}-${t.id}-panel`}
              id={`${baseId}-${t.id}-tab`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(t.id)}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        className={styles.panel}
        id={`${baseId}-${active.id}-panel`}
        aria-labelledby={`${baseId}-${active.id}-tab`}
      >
        {active.content}
      </div>
    </div>
  )
}

