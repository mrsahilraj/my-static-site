import styles from './Services.module.css'

const services = [
  { id: 'brand', icon: 'megaphone', title: 'Branding & Ads', sub: 'Launch-ready content', accent: '#c57e2b' },
  { id: 'social', icon: 'social', title: 'Social Marketing', sub: 'Short-form packs', accent: '#9f5a2c' },
  { id: 'photo', icon: 'camera', title: 'Photo & Video', sub: 'Studio-friendly', accent: '#8c6325' },
  { id: 'vocal', icon: 'mic', title: 'Vocal Recording', sub: 'Clean capture', accent: '#a04d1f' },
  { id: 'video', icon: 'video', title: 'Video Recording', sub: 'Cameras + light', accent: '#7c4a1d' },
  { id: 'podcast', icon: 'podcast', title: 'Podcast', sub: 'Talk-show setup', accent: '#a86d2d' },
  { id: 'audio', icon: 'book', title: 'Audiobook', sub: 'Narration takes', accent: '#8f5f32' },
  { id: 'rental', icon: 'room', title: 'Studio Rental', sub: 'Hourly blocks', accent: '#6d4520' },
  { id: 'coach', icon: 'learn', title: 'Training', sub: 'Workshops', accent: '#b07434' },
  { id: 'pack', icon: 'package', title: 'Creator Pack', sub: 'Weekly coverage', accent: '#91552b' },
]

function ServiceIcon({ name }) {
  const common = { className: styles.svg, 'aria-hidden': true }
  if (name === 'megaphone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M4.5 11.5v-2.8c0-.7.5-1.4 1.2-1.6l10.8-3.1c.9-.3 1.9.4 1.9 1.3v13.4c0 1-1 1.6-1.9 1.3L5.7 16c-.7-.2-1.2-.9-1.2-1.6v-2.9"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M7.2 15.8 8.4 20a1.2 1.2 0 0 1-1.1 1.5H6.8c-.6 0-1-.4-1.2-.9L4.8 16"
          fill="currentColor"
          opacity="0.92"
        />
      </svg>
    )
  }
  if (name === 'social') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M6 5.5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-3.8 2.6c-.7.5-1.7 0-1.7-.9V7.5a2 2 0 0 1 2-2Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M8.2 10.3h7.6M8.2 12.7h5.3"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    )
  }
  if (name === 'camera') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M8 7.5 9.3 6h5.4L16 7.5h2A2 2 0 0 1 20 9.5v9A2 2 0 0 1 18 20.5H6A2 2 0 0 1 4 18.5v-9A2 2 0 0 1 6 7.5h2Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M12 17a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          opacity="0.75"
        />
      </svg>
    )
  }
  if (name === 'mic') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M19 11a7 7 0 0 1-14 0M12 18v3M8.5 21h7"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    )
  }
  if (name === 'video') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M6.5 7.5h8A2 2 0 0 1 16.5 9.5v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M16.5 11.3 20 9.5v7l-3.5-1.8v-3.4Z"
          fill="currentColor"
          opacity="0.65"
        />
      </svg>
    )
  }
  if (name === 'podcast') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M8 21c.6-2.1 2-3.2 4-3.2s3.4 1.1 4 3.2"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    )
  }
  if (name === 'book') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M6.5 4.5H15a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H6.5a2 2 0 0 0-2 2V6.5a2 2 0 0 1 2-2Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M7.8 8h6.6M7.8 11h6.6M7.8 14h5"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    )
  }
  if (name === 'room') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M5.5 20.5V9.5A2 2 0 0 1 7.5 7.5h9a2 2 0 0 1 2 2v11"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M9 20.5v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          opacity="0.75"
        />
      </svg>
    )
  }
  if (name === 'learn') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M3.8 8.8 12 5l8.2 3.8L12 12.6 3.8 8.8Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M6.2 11.2V16c2 1.7 4 2.5 5.8 2.5S15.8 17.7 17.8 16v-4.8"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" {...common}>
      <path
        d="M7 7h10l1.2 4.8a7.2 7.2 0 0 1-7 8.7H8.8a1 1 0 0 1-1-.8L6 12.8 7 7Z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  )
}

export default function Services() {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <div className={styles.header}>
        <p className={styles.kicker}>Our Services</p>
        <h2 id="services-title" className={styles.title}>
          Creative production services designed for premium studio workflows.
        </h2>
        <p className={styles.description}>
          From recording and branded content to podcast sessions and creator packages, every service is
          built around professional execution, refined environments, and production-ready support.
        </p>
      </div>

      <div className={styles.grid} role="list">
        {services.map((s, index) => (
          <button
            key={s.id}
            type="button"
            className={styles.item}
            style={{
              '--service-accent': s.accent,
              '--service-accent-soft': `${s.accent}1f`,
            }}
          >
            <span className={styles.itemGlow} aria-hidden="true" />
            <span className={styles.itemTop}>
              <span className={styles.iconCircle} aria-hidden="true">
                <ServiceIcon name={s.icon} />
              </span>
              <span className={styles.itemMeta}>0{index + 1}</span>
            </span>
            <span className={styles.itemBody}>
              <span className={styles.itemTitle}>{s.title}</span>
              <span className={styles.itemSub}>{s.sub}</span>
            </span>
            <span className={styles.itemFooter}>
              <span className={styles.itemTag}>Studio Service</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
