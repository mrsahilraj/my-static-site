import styles from './Spaces.module.css'
import { Link } from 'react-router-dom'

const studios = [
  { id: 'grand', name: 'Grand Studio', dims: '25ft × 22ft × 16ft (h)', rate: 52, variant: 1 },
  { id: 'long', name: 'Long Studio', dims: '25ft × 10ft × 10ft (h)', rate: 45, variant: 2 },
  { id: 'mini', name: 'Mini Studio', dims: '25ft × 10ft × 7ft (h)', rate: 38, variant: 3 },
  { id: 'podcast', name: 'Podcast Studio', dims: '13ft × 10ft × 7ft (h)', rate: 24, variant: 4 },
  { id: 'outdoor', name: 'Outdoor Shoot', dims: '12ft × 10ft × 7ft (h)', rate: 20, variant: 5 },
  { id: 'water', name: 'Water Shoot', dims: '12ft × 10ft × 7ft (h)', rate: 27, variant: 6 },
]

function pickStudioKind(studio) {
  const raw = `${studio.id} ${studio.name}`.toLowerCase()
  if (raw.includes('podcast')) return 'podcast'
  if (raw.includes('outdoor')) return 'outdoor'
  if (raw.includes('water')) return 'water'
  if (raw.includes('grand')) return 'grand'
  if (raw.includes('long')) return 'long'
  if (raw.includes('mini')) return 'mini'
  return 'default'
}

function StudioPreviewSvg({ kind }) {
  const palette =
    kind === 'grand'
      ? { a: '#24180f', b: '#b07a3c', c: '#fff2de', d: '#6b3c12' }
      : kind === 'long'
        ? { a: '#20160f', b: '#d49a4e', c: '#fff3dd', d: '#5d2f0f' }
        : kind === 'mini'
          ? { a: '#1c1410', b: '#c99a6b', c: '#fff1dd', d: '#4c2710' }
          : kind === 'podcast'
            ? { a: '#141112', b: '#c7b08c', c: '#f6efe4', d: '#2c221e' }
            : kind === 'outdoor'
              ? { a: '#102016', b: '#59a06f', c: '#eaf7ee', d: '#1f3b26' }
              : kind === 'water'
                ? { a: '#0f1b24', b: '#5aa6c9', c: '#eaf6ff', d: '#163446' }
                : { a: '#1e1510', b: '#b07a3c', c: '#fff2de', d: '#4c2b10' }

  return (
    <svg
      className={styles.previewSvg}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.a} />
          <stop offset="0.55" stopColor={palette.d} />
          <stop offset="1" stopColor={palette.b} />
        </linearGradient>

        <radialGradient id="glow" cx="50%" cy="25%" r="70%">
          <stop offset="0" stopColor={palette.c} stopOpacity="0.32" />
          <stop offset="0.55" stopColor={palette.c} stopOpacity="0.12" />
          <stop offset="1" stopColor={palette.c} stopOpacity="0" />
        </radialGradient>

        <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.9  0 0 0 0 0.85  0 0 0 0 0.8  0 0 0 0.12 0" />
        </filter>

        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#bg)" />
      <rect width="400" height="300" fill="url(#glow)" />

      <g opacity="0.55" filter="url(#grain)">
        <rect width="400" height="300" fill="#fff" />
      </g>

      <g opacity="0.9">
        <path
          d="M0 214C62 198 110 194 152 196C200 198 244 212 298 220C342 227 372 224 400 212V300H0V214Z"
          fill="url(#floor)"
        />
        <path
          d="M30 210C95 190 162 186 210 194C278 205 318 232 370 222"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {kind === 'podcast' && (
        <g transform="translate(258 92)" opacity="0.95">
          <path
            d="M34 70c-11.6 0-21-9.4-21-21V25c0-11.6 9.4-21 21-21s21 9.4 21 21v24c0 11.6-9.4 21-21 21Z"
            fill="rgba(255,255,255,0.22)"
          />
          <path
            d="M10 45c2.8 15.6 14.2 24.3 24 24.3S55.2 60.6 58 45"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M34 69v22M18 91h32"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      )}

      {kind === 'outdoor' && (
        <g transform="translate(270 56)" opacity="0.92">
          <circle cx="44" cy="44" r="26" fill="rgba(255,255,255,0.18)" />
          <path
            d="M44 6v18M44 64v18M6 44h18M64 44h18M16 16l12 12M60 60l12 12M72 16L60 28M28 60L16 72"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      )}

      {kind === 'water' && (
        <g transform="translate(250 174)" opacity="0.95">
          <path
            d="M14 32c18-14 40-14 58 0c18 14 40 14 58 0"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M14 54c18-14 40-14 58 0c18 14 40 14 58 0"
            fill="none"
            stroke="rgba(255,255,255,0.26)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      )}

      {(kind === 'grand' || kind === 'long' || kind === 'mini' || kind === 'default') && (
        <g transform="translate(32 72)" opacity="0.95">
          <rect
            x="0"
            y="0"
            width="184"
            height="128"
            rx="18"
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="2"
          />
          <path
            d="M24 104c26-28 52-28 78 0c19-22 38-22 58 0"
            fill="none"
            stroke="rgba(255,255,255,0.26)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="140" cy="40" r="18" fill="rgba(255,255,255,0.18)" />
          <path
            d="M140 30v20M130 40h20"
            stroke="rgba(255,255,255,0.44)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      )}

      <g opacity="0.65">
        <circle cx="70" cy="60" r="34" fill="rgba(255,255,255,0.12)" />
        <circle cx="340" cy="112" r="40" fill="rgba(255,255,255,0.08)" />
        <circle cx="316" cy="78" r="18" fill="rgba(255,255,255,0.12)" />
      </g>
    </svg>
  )
}

function StudioCard({ studio }) {
  const to = `/studios/${studio.id}`
  const kind = pickStudioKind(studio)
  return (
    <Link className={styles.card} to={to} aria-label={`Select ${studio.name}`}>
      <div className={styles.image} data-variant={studio.variant} role="img" aria-label={`${studio.name} preview`}>
        <StudioPreviewSvg kind={kind} />
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{studio.name}</div>
        <div className={styles.dims}>{studio.dims}</div>
        <div className={styles.rate}>
          <span className={styles.amount}>₹{studio.rate * 100}</span>
          <span className={styles.per}>/hr</span>
        </div>
      </div>
    </Link>
  )
}

export default function Spaces() {
  return (
    <section id="studios" className={styles.section} aria-labelledby="studios-title">
      <div id="select-studio" className={styles.header}>
        <a href="#studios-grid" className={styles.hoursPill}>
          Select Your Studio Now
        </a>
        <h2 id="studios-title" className={styles.title}>
          Our studios
        </h2>
      </div>

      <div id="studios-grid" className={styles.grid} role="list">
        {studios.map((s) => (
          <StudioCard key={s.id} studio={s} />
        ))}
      </div>

      <div className={styles.hours} aria-label="Hours">
        <span className={styles.hoursPill}>Open 7 Days a Week</span>
      </div>
    </section>
  )
}
