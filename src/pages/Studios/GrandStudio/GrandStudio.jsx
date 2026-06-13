import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../../components/sections/Footer/Footer.jsx'
import styles from './GrandStudio.module.css'

function BackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15.5 5 8.5 12l7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeartIcon({ filled, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20.5s-7-4.4-9.2-8.9C1 8 3.1 5.5 6.1 5.5c1.8 0 3.3.9 3.9 2.1.6-1.2 2.1-2.1 3.9-2.1 3 0 5.1 2.5 3.3 6.1C19 16.1 12 20.5 12 20.5Z"
        fill={filled ? 'rgba(210,74,74,0.92)' : 'transparent'}
        stroke={filled ? 'rgba(210,74,74,0.92)' : 'rgba(255,255,255,0.92)'}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Pin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 13.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function StudioHeroArtwork({ scene, studioName }) {
  const palette =
    scene === 'podcast'
      ? { bg: '#161113', a: '#f5ecdc', b: '#baa074' }
      : scene === 'outdoor'
        ? { bg: '#102116', a: '#e4f8e8', b: '#6eb584' }
        : scene === 'water'
          ? { bg: '#10202a', a: '#e5f6ff', b: '#6eb0d2' }
          : scene === 'mini'
            ? { bg: '#1f1711', a: '#fff0d9', b: '#d2a171' }
            : scene === 'long'
              ? { bg: '#1d1510', a: '#fff1da', b: '#d39a58' }
              : { bg: '#1b140f', a: '#fff0da', b: '#bf8a49' }

  return (
    <svg className={styles.photoArt} viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.bg} />
          <stop offset="1" stopColor={palette.b} />
        </linearGradient>
        <radialGradient id="hero-glow" cx="50%" cy="25%" r="70%">
          <stop offset="0" stopColor={palette.a} stopOpacity="0.2" />
          <stop offset="0.55" stopColor={palette.a} stopOpacity="0.08" />
          <stop offset="1" stopColor={palette.a} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="720" fill="url(#hero-bg)" />
      <rect width="1200" height="720" fill="url(#hero-glow)" />
      <ellipse cx="600" cy="610" rx="500" ry="130" fill="rgba(0,0,0,0.45)" />

      {(scene === 'grand' || scene === 'long' || scene === 'mini') && (
        <g opacity="0.92">
          <rect x="160" y="160" width="500" height="300" rx="30" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
          <path d="M240 410c70-80 145-80 225 0c54-62 108-62 165 0" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="14" strokeLinecap="round" />
          <circle cx="540" cy="240" r="48" fill="rgba(255,255,255,0.12)" />
          <path d="M540 212v56M512 240h56" stroke="rgba(255,255,255,0.3)" strokeWidth="12" strokeLinecap="round" />
          <path d="M740 160v360" stroke="rgba(255,255,255,0.14)" strokeWidth="10" strokeLinecap="round" />
          <path d="M850 160v360" stroke="rgba(255,255,255,0.14)" strokeWidth="10" strokeLinecap="round" />
          <path d="M740 220h110M740 310h110M740 400h110" stroke="rgba(255,255,255,0.14)" strokeWidth="10" strokeLinecap="round" />
        </g>
      )}

      {scene === 'podcast' && (
        <g opacity="0.96">
          <rect x="170" y="170" width="860" height="320" rx="42" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
          <ellipse cx="600" cy="470" rx="210" ry="44" fill="rgba(255,255,255,0.08)" />
          <path d="M436 475h328" stroke="rgba(255,255,255,0.3)" strokeWidth="16" strokeLinecap="round" />
          <path d="M500 474v100M700 474v100" stroke="rgba(255,255,255,0.24)" strokeWidth="14" strokeLinecap="round" />
          <path d="M554 228a46 46 0 0 1 92 0v96a46 46 0 0 1-92 0v-96Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.24)" strokeWidth="8" />
          <path d="M516 318c12 42 42 66 84 66s72-24 84-66" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="10" strokeLinecap="round" />
          <path d="M600 384v74M548 458h104" fill="none" stroke={palette.b} strokeWidth="10" strokeLinecap="round" />
        </g>
      )}

      {scene === 'outdoor' && (
        <g opacity="0.95">
          <circle cx="960" cy="170" r="78" fill="rgba(255,255,255,0.14)" />
          <path d="M220 510 390 292 540 450 672 328 880 520H220Z" fill="rgba(255,255,255,0.1)" />
          <path d="M300 470 420 370 520 440 640 360 820 470" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M610 270v168M530 438h160" fill="none" stroke={palette.b} strokeWidth="12" strokeLinecap="round" />
          <path d="M556 322c0-30 24-54 54-54s54 24 54 54-24 54-54 54-54-24-54-54Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.24)" strokeWidth="8" />
        </g>
      )}

      {scene === 'water' && (
        <g opacity="0.96">
          <path d="M180 462c86-48 172-48 258 0c86 48 172 48 258 0c86-48 172-48 258 0" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="18" strokeLinecap="round" />
          <path d="M180 534c86-48 172-48 258 0c86 48 172 48 258 0c86-48 172-48 258 0" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="18" strokeLinecap="round" />
          <rect x="324" y="202" width="552" height="180" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
          <path d="M520 382c0-70 36-126 80-126s80 56 80 126" fill="none" stroke={palette.b} strokeWidth="14" strokeLinecap="round" />
          <path d="M480 382h240" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="14" strokeLinecap="round" />
        </g>
      )}

      <text x="80" y="96" fill="rgba(255,255,255,0.22)" fontSize="42" fontWeight="800" letterSpacing="8">
        {studioName.toUpperCase()}
      </text>
    </svg>
  )
}

function StatIcon({ name }) {
  const common = { className: styles.statIcon, 'aria-hidden': true }
  if (name === 'acoustic') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M6.5 16.5c2.5-5.2 6.5-8.2 11-9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M8.2 18.2c1.7-3.5 4.6-5.9 8-6.7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M10 20c.9-1.9 2.4-3.2 4.2-3.7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    )
  }
  if (name === 'equipment') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M6 18.5h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 15.5h8M9 10.5h6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    )
  }
  if (name === 'support') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M12 12.5a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M4.8 20.1c1.7-3.4 4.2-5.1 7.2-5.1s5.5 1.7 7.2 5.1"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" {...common}>
      <path
        d="M6.5 9.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 7.5V6a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AboutCards() {
  const items = [
    { id: 'acoustic', title: 'Best Acoustic', sub: 'Design', icon: 'acoustic' },
    { id: 'equip', title: 'Industry Leading', sub: 'Equipment', icon: 'equipment' },
    { id: 'engineer', title: 'Engineer', sub: 'Support', icon: 'support' },
    { id: 'flex', title: 'Flexible', sub: 'Booking', icon: 'flex' },
  ]

  return (
    <div className={styles.aboutCards} role="list">
      {items.map((it) => (
        <div key={it.id} className={styles.aboutCard} role="listitem">
          <div className={styles.aboutIcon} aria-hidden="true">
            <StatIcon name={it.icon} />
          </div>
          <div className={styles.aboutTitle}>{it.title}</div>
          <div className={styles.aboutSub}>{it.sub}</div>
        </div>
      ))}
    </div>
  )
}

export function EquipmentImage({ name, kind }) {
  const key = String(name || kind || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

  const stroke = 'rgba(44, 32, 22, 0.68)'
  const accent = 'rgba(176, 122, 42, 0.92)'
  const soft = 'rgba(44, 32, 22, 0.12)'

  const common = {
    className: styles.eqSvg,
    viewBox: '0 0 200 200',
    fill: 'none',
    'aria-hidden': true,
  }

  const is = (s) => key.includes(s)

  if (is('gimbal')) {
    return (
      <svg {...common}>
        <path d="M86 36h28v22H86z" fill={soft} stroke={stroke} strokeWidth="6" />
        <path d="M100 58v72" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M84 130h32" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M72 154c0-12 12-22 28-22s28 10 28 22" fill={soft} stroke={stroke} strokeWidth="6" />
        <path d="M88 168h24" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M60 148h16M124 148h16" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <circle cx="138" cy="44" r="12" fill="rgba(255,255,255,0.55)" stroke={accent} strokeWidth="6" />
        <path d="M120 52 132 44" stroke={accent} strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  }

  if (is('teleprompter')) {
    return (
      <svg {...common}>
        <path
          d="M52 64h96a10 10 0 0 1 10 10v48a10 10 0 0 1-10 10H52a10 10 0 0 1-10-10V74a10 10 0 0 1 10-10Z"
          fill={soft}
          stroke={stroke}
          strokeWidth="6"
        />
        <path d="M66 84h68M66 102h54" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <path d="M82 132v16M118 132v16" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M64 164h72" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
      </svg>
    )
  }

  if (is('microphone') || is('mic')) {
    return (
      <svg {...common}>
        <path
          d="M82 54a18 18 0 0 1 36 0v40a18 18 0 0 1-36 0V54Z"
          fill={soft}
          stroke={stroke}
          strokeWidth="6"
        />
        <path d="M74 92c0 20 12 34 26 34s26-14 26-34" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <path d="M100 126v22" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M80 156h40" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M92 72h16" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.7" />
      </svg>
    )
  }

  if (is('wireless')) {
    return (
      <svg {...common}>
        <path d="M78 58h44v60a12 12 0 0 1-12 12H90a12 12 0 0 1-12-12V58Z" fill={soft} stroke={stroke} strokeWidth="6" />
        <path d="M90 82h20" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <path d="M100 136v18" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M84 164h32" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M58 70c10-10 22-15 42-15s32 5 42 15" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.55" />
        <path d="M70 86c7-7 16-10 30-10s23 3 30 10" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      </svg>
    )
  }

  if (is('tripod')) {
    return (
      <svg {...common}>
        <path d="M100 44v40" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M86 84h28" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <path d="M100 84 64 164" stroke={stroke} strokeWidth="7" strokeLinecap="round" />
        <path d="M100 84l36 80" stroke={stroke} strokeWidth="7" strokeLinecap="round" />
        <path d="M64 164h20M116 164h20" stroke={accent} strokeWidth="8" strokeLinecap="round" />
      </svg>
    )
  }

  if (is('camera') || is('vlogging')) {
    return (
      <svg {...common}>
        <path
          d="M58 78h84a10 10 0 0 1 10 10v44a10 10 0 0 1-10 10H58a10 10 0 0 1-10-10V88a10 10 0 0 1 10-10Z"
          fill={soft}
          stroke={stroke}
          strokeWidth="6"
        />
        <circle cx="100" cy="110" r="22" fill="rgba(255,255,255,0.55)" stroke={accent} strokeWidth="8" />
        <circle cx="100" cy="110" r="10" stroke={stroke} strokeWidth="6" />
        <path d="M76 72h22l8 10" stroke={stroke} strokeWidth="6" strokeLinejoin="round" />
        <path d="M140 96h10" stroke={accent} strokeWidth="8" strokeLinecap="round" />
      </svg>
    )
  }

  if (is('smart tv') || is('tv') || is('monitor')) {
    return (
      <svg {...common}>
        <path
          d="M52 64h96a10 10 0 0 1 10 10v56a10 10 0 0 1-10 10H52a10 10 0 0 1-10-10V74a10 10 0 0 1 10-10Z"
          fill={soft}
          stroke={stroke}
          strokeWidth="6"
        />
        <path d="M74 154h52" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M100 140v14" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M70 86h60" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.7" />
        <path d="M70 104h44" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.45" />
      </svg>
    )
  }

  if (is('podcast')) {
    return (
      <svg {...common}>
        <path d="M64 94c0-20 16-36 36-36s36 16 36 36" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <path d="M78 96c0-12 10-22 22-22s22 10 22 22" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.65" />
        <path d="M90 98c0-6 4-10 10-10s10 4 10 10" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.45" />
        <path
          d="M82 104a18 18 0 0 1 36 0v16a18 18 0 0 1-36 0v-16Z"
          fill={soft}
          stroke={stroke}
          strokeWidth="6"
        />
        <path d="M100 138v14" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M82 164h36" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
      </svg>
    )
  }

  if (is('smoke')) {
    return (
      <svg {...common}>
        <path d="M60 120h80a10 10 0 0 1 10 10v22H50v-22a10 10 0 0 1 10-10Z" fill={soft} stroke={stroke} strokeWidth="6" />
        <path d="M78 120V98h44v22" fill="rgba(255,255,255,0.55)" stroke={stroke} strokeWidth="6" />
        <path
          d="M78 76c0 10-10 12-10 22s10 12 10 22"
          stroke={accent}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M104 70c0 10-10 12-10 22s10 12 10 22"
          stroke={accent}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M132 76c0 10-10 12-10 22s10 12 10 22"
          stroke={accent}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    )
  }

  if (is('backdrop')) {
    return (
      <svg {...common}>
        <path d="M64 54h72v104H64z" fill="rgba(255,255,255,0.55)" stroke={stroke} strokeWidth="6" />
        <path d="M64 64h72" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.7" />
        <path d="M56 54h8v120h-8zM136 54h8v120h-8z" fill={soft} stroke={stroke} strokeWidth="6" />
        <path d="M52 174h96" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
      </svg>
    )
  }

  if (is('light') || is('lighting')) {
    return (
      <svg {...common}>
        <path d="M100 58c18 0 30 12 30 28s-12 28-30 28-30-12-30-28 12-28 30-28Z" fill="rgba(255,255,255,0.55)" stroke={accent} strokeWidth="8" />
        <path d="M100 116v14" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path d="M100 130 70 174M100 130l30 44" stroke={stroke} strokeWidth="7" strokeLinecap="round" />
        <path d="M66 174h16M118 174h16" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <path d="M100 44v10" stroke={accent} strokeWidth="8" strokeLinecap="round" />
      </svg>
    )
  }

  if (is('live') || is('mix') || is('editing') || is('edit')) {
    return (
      <svg {...common}>
        <path
          d="M58 82h84a10 10 0 0 1 10 10v38a10 10 0 0 1-10 10H58a10 10 0 0 1-10-10V92a10 10 0 0 1 10-10Z"
          fill={soft}
          stroke={stroke}
          strokeWidth="6"
        />
        <path d="M72 102h56M72 118h44" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.65" />
        <path d="M84 156h32" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        <path
          d="M72 140h56l8 16H64l8-16Z"
          fill="rgba(255,255,255,0.55)"
          stroke={stroke}
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path
        d="M56 74h88a10 10 0 0 1 10 10v50a10 10 0 0 1-10 10H56a10 10 0 0 1-10-10V84a10 10 0 0 1 10-10Z"
        fill={soft}
        stroke={stroke}
        strokeWidth="6"
      />
      <path d="M74 104h52" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.6" />
      <path d="M74 120h36" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function clampQty(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 1
  if (n < 1) return 1
  if (n > 10) return 10
  return Math.round(n)
}

function EquipmentCard({ item, selected, qty, onToggleSelected, onChangeQty }) {
  const qtyDisplay = selected ? qty : 1

  return (
    <div className={styles.eqItem}>
      <div
        className={[styles.eqCard, selected ? styles.eqCardSelected : null]
          .filter(Boolean)
          .join(' ')}
        onClick={onToggleSelected}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggleSelected()
          }
        }}
        aria-pressed={selected}
        role="button"
        tabIndex={0}
      >
        <div className={styles.eqMedia} data-kind={item.kind} role="img" aria-label={`${item.name} preview`}>
          <EquipmentImage name={item.name} kind={item.kind} />
        </div>
        <div className={styles.eqControls} aria-label={`${item.name} controls`}>
          <div className={styles.qty}>
            <button
              type="button"
              className={styles.qtyBtn}
              aria-label={`Decrease ${item.name}`}
              onClick={(e) => {
                e.stopPropagation()
                if (!selected) return
                onChangeQty(clampQty(qtyDisplay - 1))
              }}
              disabled={!selected || qtyDisplay <= 1}
            >
              −
            </button>
            <span className={styles.qtyVal} aria-label="Quantity">
              {qtyDisplay}
            </span>
            <button
              type="button"
              className={styles.qtyBtn}
              aria-label={`Increase ${item.name}`}
              onClick={(e) => {
                e.stopPropagation()
                if (!selected) {
                  onToggleSelected()
                  return
                }
                onChangeQty(clampQty(qtyDisplay + 1))
              }}
              disabled={selected && qtyDisplay >= 10}
            >
              +
            </button>
          </div>
          <div className={styles.eqPriceBox} aria-label="Price">
            ₹{item.price}
          </div>
        </div>
      </div>
      <div className={styles.eqCaption}>{item.name}</div>
    </div>
  )
}

function IncludedIcon({ name }) {
  const common = { className: styles.incIcon, 'aria-hidden': true }
  if (name === 'wifi') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M4.5 9.8c4.8-4 10.2-4 15 0"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M7.3 12.9c3.1-2.5 6.3-2.5 9.4 0"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M10.2 16c1.3-1 2.3-1 3.6 0"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path d="M12 19h0" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'parking') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M12 21s6.6-4.8 6.6-11a6.6 6.6 0 1 0-13.2 0c0 6.2 6.6 11 6.6 11Z"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <path
          d="M11 8.2h1.9a1.9 1.9 0 1 1 0 3.8H11V8.2Z"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <path
          d="M11 12v3.8"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (name === 'chroma') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M6.5 7.5h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="2.1"
        />
        <path
          d="M8.2 10.2h0"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="M11.3 15.2c.8-1.6 2-2.4 3.4-2.4s2.6.8 3.4 2.4"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M13.9 11.1h0"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (name === 'power') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M9.2 13.2V9.8a2.8 2.8 0 1 1 5.6 0v3.4"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M8.6 13.2h6.8"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M12 13.2v3.8"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M10.2 20.2c.7-1.3 2.9-1.3 3.6 0"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (name === 'kitchen') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M7.5 20.5V6.5a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v14"
          stroke="currentColor"
          strokeWidth="2.1"
        />
        <path
          d="M10 7.3h4M10 10.3h4M10 13.3h4"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (name === 'office') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M5.5 20.5h13a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="2.1"
        />
        <path
          d="M8.2 20.5v-3.2a1.6 1.6 0 0 1 1.6-1.6h4.4a1.6 1.6 0 0 1 1.6 1.6v3.2"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M9.3 11.2h0"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <path
          d="M14.7 11.2h0"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (name === 'tripod') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M12 4v5M9.5 9h5"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M12 9 6.5 20.5M12 9l5.5 11.5"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (name === 'podtable') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M6.5 10h11v4.8h-11V10Z"
          stroke="currentColor"
          strokeWidth="2.1"
        />
        <path
          d="M9 14.8v5.7M15 14.8v5.7"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M12 3.8v4.2"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M10.3 8h3.4"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (name === 'water') {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...common}>
        <path
          d="M7.5 10.2h7.4a2 2 0 0 1 2 2v4.2a3 3 0 0 1-3 3h-4.4a3 3 0 0 1-3-3v-6.2Z"
          stroke="currentColor"
          strokeWidth="2.1"
        />
        <path
          d="M17 12.5h.6a1.6 1.6 0 0 1 0 3.2H17"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M10 6.2c0 1 .8 1.7 0 2.7M13 6.2c0 1 .8 1.7 0 2.7"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" {...common}>
      <path
        d="M16.8 4.5h2.2v2.2M19 4.5l-5 5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M6.5 20.5v-7a2 2 0 0 1 2-2h3.2"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M6.5 20.5h7"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

const commonEquipment = [
  { id: 'gimbal', name: 'Gimbal', price: 5000, kind: 'gimbal' },
  { id: 'tv', name: 'Smart TV 75 inch', price: 5000, kind: 'tv' },
  { id: 'tele', name: 'Teleprompter', price: 5000, kind: 'tele' },
  { id: 'mics', name: 'Studio Microphones', price: 5000, kind: 'mic' },
  { id: 'wireless', name: 'Wireless Mic DJI', price: 5000, kind: 'wireless' },
  { id: 'vlogging', name: 'Vlogging Camera', price: 5000, kind: 'cam' },
  { id: 'pod', name: 'Podcast Kit', price: 5000, kind: 'pod' },
  { id: 'edit', name: 'Editing', price: 5000, kind: 'edit' },
  { id: 'smoke', name: 'Smoke machine', price: 5000, kind: 'smoke' },
  { id: 'backdrop', name: 'Customized Backdrop', price: 5000, kind: 'backdrop' },
  { id: 'light', name: 'Lighting Customized', price: 5000, kind: 'light' },
  { id: 'live', name: 'Live Video Mix', price: 5000, kind: 'live' },
]

const commonIncluded = [
  { id: 'wifi', lines: ['Free', 'Wi-Fi'], icon: 'wifi' },
  { id: 'parking', lines: ['Parking', 'Available'], icon: 'parking' },
  { id: 'chroma', lines: ['Chroma'], icon: 'chroma' },
  { id: 'power', lines: ['Power', 'Backup'], icon: 'power' },
  { id: 'kitchen', lines: ['Kitchen'], icon: 'kitchen' },
  { id: 'office', lines: ['Office', 'Support'], icon: 'office' },
  { id: 'tripod', lines: ['Tripods'], icon: 'tripod' },
  { id: 'podtable', lines: ['Podcast', 'Tables'], icon: 'podtable' },
  { id: 'water', lines: ['Water,', 'Tea'], icon: 'water' },
  { id: 'spot', lines: ['Spot', 'Lights'], icon: 'spot' },
]

export const studioCatalog = {
  grand: {
    id: 'grand',
    name: 'Grand Studio',
    title: 'GRAND STUDIO',
    dims: '25FT × 12FT × 16FT (H)',
    price: 2000,
    perLabel: '2000/hr',
    location: 'RAJOURI GARDEN, NEW DELHI',
    tags: ['Pro Audio', 'Acoustic Treated', 'Wi-Fi', 'HVAC'],
    description:
      'Welcome to Grand Studio — a creative space where sound, visuals, and storytelling come together. From podcasts and music production to professional video shoots, our studio is designed for creators and teams with multiple setup options and reliable support.',
    gallery: [
      { label: 'Grand Studio wide preview', scene: 'grand' },
      { label: 'Grand Studio lighting preview', scene: 'grand' },
      { label: 'Grand Studio setup preview', scene: 'grand' },
      { label: 'Grand Studio stage preview', scene: 'grand' },
      { label: 'Grand Studio ambience preview', scene: 'grand' },
    ],
    equipment: commonEquipment,
    included: commonIncluded,
  },
  long: {
    id: 'long',
    name: 'Long Studio',
    title: 'LONG STUDIO',
    dims: '25FT × 10FT × 10FT (H)',
    price: 1800,
    perLabel: '1800/hr',
    location: 'RAJOURI GARDEN, NEW DELHI',
    tags: ['Long Format', 'Flexible Setups', 'Wi-Fi', 'HVAC'],
    description:
      'Long Studio is built for extended frame compositions, interview layouts, and streamlined product shoots. The same polished workflow as Grand Studio is paired with a narrower footprint that works especially well for linear sets, walkthrough visuals, and controlled lighting setups.',
    gallery: [
      { label: 'Long Studio wide preview', scene: 'long' },
      { label: 'Long Studio interview preview', scene: 'long' },
      { label: 'Long Studio lighting preview', scene: 'long' },
      { label: 'Long Studio set preview', scene: 'long' },
      { label: 'Long Studio ambience preview', scene: 'long' },
    ],
    equipment: commonEquipment,
    included: commonIncluded,
  },
  mini: {
    id: 'mini',
    name: 'Mini Studio',
    title: 'MINI STUDIO',
    dims: '25FT × 10FT × 7FT (H)',
    price: 1500,
    perLabel: '1500/hr',
    location: 'RAJOURI GARDEN, NEW DELHI',
    tags: ['Compact Setup', 'Quick Shoots', 'Wi-Fi', 'HVAC'],
    description:
      'Mini Studio keeps the exact same booking flow and creator-friendly tools in a compact footprint. It is ideal for solo content sessions, talking heads, reels, short-form campaigns, and efficient production days where speed and consistency matter most.',
    gallery: [
      { label: 'Mini Studio wide preview', scene: 'mini' },
      { label: 'Mini Studio creator preview', scene: 'mini' },
      { label: 'Mini Studio product preview', scene: 'mini' },
      { label: 'Mini Studio lighting preview', scene: 'mini' },
      { label: 'Mini Studio ambience preview', scene: 'mini' },
    ],
    equipment: commonEquipment,
    included: commonIncluded,
  },
  podcast: {
    id: 'podcast',
    name: 'Podcast Studio',
    title: 'PODCAST STUDIO',
    dims: '13FT × 10FT × 7FT (H)',
    price: 1400,
    perLabel: '1400/hr',
    location: 'RAJOURI GARDEN, NEW DELHI',
    tags: ['Podcast Ready', 'Multi Mic', 'Wi-Fi', 'AC'],
    description:
      'Podcast Studio brings the full Grand Studio interface into a purpose-built conversation setup. Use it for interviews, roundtables, vodcasts, branded talk formats, and creator collaborations with an optimized mic-first environment and the same dependable studio support.',
    gallery: [
      { label: 'Podcast Studio hero preview', scene: 'podcast' },
      { label: 'Podcast Studio desk preview', scene: 'podcast' },
      { label: 'Podcast Studio mic preview', scene: 'podcast' },
      { label: 'Podcast Studio ambience preview', scene: 'podcast' },
      { label: 'Podcast Studio recording preview', scene: 'podcast' },
    ],
    equipment: commonEquipment,
    included: commonIncluded,
  },
  outdoor: {
    id: 'outdoor',
    name: 'Outdoor Shoot',
    title: 'OUTDOOR SHOOT',
    dims: '12FT × 10FT × 7FT (H)',
    price: 1600,
    perLabel: '1600/hr',
    location: 'RAJOURI GARDEN, NEW DELHI',
    tags: ['Natural Light', 'Portable Gear', 'Wi-Fi', 'Support'],
    description:
      'Outdoor Shoot extends the same premium studio workflow to open-air productions and natural-light concepts. Keep the identical screen structure, add-ons, and booking actions while switching to a setup that supports lifestyle frames, campaign content, and on-location creator shoots.',
    gallery: [
      { label: 'Outdoor Shoot hero preview', scene: 'outdoor' },
      { label: 'Outdoor Shoot natural light preview', scene: 'outdoor' },
      { label: 'Outdoor Shoot gear preview', scene: 'outdoor' },
      { label: 'Outdoor Shoot landscape preview', scene: 'outdoor' },
      { label: 'Outdoor Shoot ambience preview', scene: 'outdoor' },
    ],
    equipment: commonEquipment,
    included: commonIncluded,
  },
  water: {
    id: 'water',
    name: 'Water Shoot',
    title: 'WATER SHOOT',
    dims: '12FT × 10FT × 7FT (H)',
    price: 1700,
    perLabel: '1700/hr',
    location: 'RAJOURI GARDEN, NEW DELHI',
    tags: ['Water Set', 'Styled Lighting', 'Wi-Fi', 'Support'],
    description:
      'Water Shoot keeps every interaction, panel, and booking control from Grand Studio while shifting the content to a water-focused production environment. It is designed for splash visuals, beauty frames, dramatic motion shots, and controlled creative concepts with the same polished experience.',
    gallery: [
      { label: 'Water Shoot hero preview', scene: 'water' },
      { label: 'Water Shoot motion preview', scene: 'water' },
      { label: 'Water Shoot lighting preview', scene: 'water' },
      { label: 'Water Shoot set preview', scene: 'water' },
      { label: 'Water Shoot ambience preview', scene: 'water' },
    ],
    equipment: commonEquipment,
    included: commonIncluded,
  },
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8.5 4.5 6.9 6.1c-1 1-1.3 2.5-.7 3.8 1.6 3.5 4.4 6.3 7.9 7.9 1.3.6 2.8.3 3.8-.7l1.6-1.6a1.5 1.5 0 0 0-.3-2.4l-2.4-1.5a1.5 1.5 0 0 0-1.9.3l-.8.8a10.6 10.6 0 0 1-4.8-4.8l.8-.8a1.5 1.5 0 0 0 .3-1.9L10.9 4.8a1.5 1.5 0 0 0-2.4-.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14.5 6 8.5 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m9.5 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureIcon({ kind, ...props }) {
  if (kind === 'acoustic') return <StatIcon name="acoustic" {...props} />
  if (kind === 'equipment') return <StatIcon name="equipment" {...props} />
  if (kind === 'support') return <StatIcon name="support" {...props} />
  return <StatIcon name="flex" {...props} />
}

function RuleIcon({ kind, ...props }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', ...props }
  if (kind === 'smoking') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 8.6h3.4M12 8.6v3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'food') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 8v5M13 8v5M16 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'noise') {
    return (
      <svg {...common}>
        <path d="M5.5 14.5V9.7a1.8 1.8 0 0 1 1.8-1.8h2.1l3.6-2.8v14l-3.6-2.8H7.3a1.8 1.8 0 0 1-1.8-1.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16.5 9.2c1.4 1 2.2 2 2.2 3.3s-.8 2.3-2.2 3.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'respect') {
    return (
      <svg {...common}>
        <path d="M12 3.8 18.6 6v5.4c0 4.5-2.4 7.6-6.6 8.8-4.2-1.2-6.6-4.3-6.6-8.8V6L12 3.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m9.6 11.9 1.6 1.6 3.5-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function BookingWatermark(props) {
  return (
    <svg viewBox="0 0 560 320" fill="none" {...props}>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M98 208h112a16 16 0 0 0 16-16v-60a16 16 0 0 0-16-16H98a16 16 0 0 0-16 16v60a16 16 0 0 0 16 16Z" />
        <circle cx="154" cy="162" r="30" />
        <path d="M124 108h32l12 16" />
        <path d="M230 144h20" />
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M338 70h64l22 42-22 42h-64l-18-42 18-42Z" />
        <path d="M370 154v72" />
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M452 124a20 20 0 0 1 40 0v42a20 20 0 0 1-40 0v-42Z" />
        <path d="M444 160c0 26 16 44 28 44s28-18 28-44" />
        <path d="M472 204v26" />
        <path d="M448 240h48" />
        <path d="M424 112c18 10 28 24 28 42" opacity="0.7" />
      </g>
      <circle cx="446" cy="66" r="8" fill="currentColor" stroke="none" />
      <circle cx="414" cy="90" r="5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const commonOverview = (dims) => [
  { label: 'Size', value: dims },
  { label: 'Acoustic', value: 'Fully Acoustic Treated' },
  { label: 'Console', value: 'Digital Mixing Console' },
  { label: 'Monitoring', value: 'Full Range Studio Monitors' },
  { label: 'DAW Support', value: 'Pro Tools, Logic Pro, Ableton, Cubase' },
  { label: 'Max People', value: '8 - 10 People' },
  { label: 'Power Backup', value: 'Yes' },
  { label: 'Access', value: '24/7 (Prior Booking)' },
]

const commonAmenities = [
  { id: 'live-room', title: 'Spacious Live Room', scene: 'grand' },
  { id: 'control', title: 'Control Room', scene: 'long' },
  { id: 'booth', title: 'Recording Booth', scene: 'podcast' },
  { id: 'lounge', title: 'Lounge Area', scene: 'mini' },
  { id: 'pantry', title: 'Pantry', scene: 'water' },
]

const commonRules = [
  { id: 'smoking', text: 'No Smoking', kind: 'smoking' },
  { id: 'food', text: 'No Food or Drink in Studio', kind: 'food' },
  { id: 'noise', text: 'Maintain Noise Levels', kind: 'noise' },
  { id: 'respect', text: 'Respect Equipment & Property', kind: 'respect' },
  { id: 'recording', text: 'No Unauthorized Recording', kind: 'location' },
  { id: 'refund', text: 'Refund as per Policy', kind: 'location' },
]

const commonReviews = [
  {
    id: 'riya',
    name: 'Riya Verma',
    role: 'Artist',
    quote:
      'The room sounds incredible and the workflow is smooth. Perfect for quick sessions and premium creator shoots.',
  },
  {
    id: 'shiva',
    name: 'Shiva Kapoor',
    role: 'Producer',
    quote:
      'The ambience is professional, the team is helpful, and the setup feels exactly like a premium studio should.',
  },
  {
    id: 'arjun',
    name: 'Arjun Singh',
    role: 'Podcast Host',
    quote:
      'We shot and recorded in the same visit. The space, lighting, and support made the whole day seamless.',
  },
]

Object.values(studioCatalog).forEach((studio) => {
  studio.phone = '98212 3177'
  studio.badge = 'Premium Studio'
  studio.featureSet = [
    { id: 'pro', title: 'Pro Audio', sub: 'Setup', kind: 'acoustic' },
    { id: 'acoustic', title: 'Acoustic', sub: 'Treatment', kind: 'acoustic' },
    { id: 'gear', title: 'High-end', sub: 'Equipment', kind: 'equipment' },
    { id: 'support', title: 'Engineer', sub: 'Support', kind: 'support' },
    { id: 'access', title: '24x7', sub: 'Access', kind: 'flex' },
  ]
  studio.overview = commonOverview(studio.dims)
  studio.amenities = commonAmenities.map((item, index) => ({
    ...item,
    scene: index === 0 ? studio.gallery[0].scene : item.scene,
  }))
  studio.rules = commonRules
  studio.reviews = commonReviews.map((review) => ({
    ...review,
    quote: review.quote.replace('The room', `${studio.name}`),
  }))
})

function StudioHeader() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerMain}>
        <div className={styles.containerWide}>
          <Link to="/" className={styles.headerBrand}>
            <span className={styles.headerLogo}>S</span>
            <span className={styles.headerBrandText}>
              <span>SIMAR SINGH</span>
              <span>STUDIOS</span>
            </span>
          </Link>
          <nav className={styles.headerNav} aria-label="Studio page navigation">
            <Link to="/">Home</Link>
            <Link to="/#about">About Us</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#studios" className={styles.headerNavActive}>Studios</Link>
            <Link to="/#gallery">Gallery</Link>
            <Link to="/#pricing">Pricing</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/#contact">Contact Us</Link>
          </nav>
          <a href="tel:+919821213177" className={styles.callNowBtn}>
            Call Us Now
          </a>
        </div>
      </div>
    </header>
  )
}

function PhotoGallery({ studio }) {
  const [index, setIndex] = useState(0)
  const photos = studio.gallery

  useEffect(() => {
    setIndex(0)
  }, [studio.id])

  const current = photos[index] || photos[0]

  return (
    <div className={styles.galleryCard}>
      <span className={styles.galleryBadge}>{studio.badge}</span>
      <div className={styles.galleryImage} role="img" aria-label={current.label}>
        <StudioHeroArtwork scene={current.scene} studioName={studio.name} />
        <button
          type="button"
          className={[styles.galleryArrow, styles.galleryArrowLeft].join(' ')}
          onClick={() => setIndex((prev) => (prev - 1 + photos.length) % photos.length)}
          aria-label="Previous image"
        >
          <ChevronLeft className={styles.galleryArrowIcon} />
        </button>
        <button
          type="button"
          className={[styles.galleryArrow, styles.galleryArrowRight].join(' ')}
          onClick={() => setIndex((prev) => (prev + 1) % photos.length)}
          aria-label="Next image"
        >
          <ChevronRight className={styles.galleryArrowIcon} />
        </button>
      </div>
      <div className={styles.thumbRow}>
        {photos.map((photo, photoIndex) => (
          <button
            key={photo.label}
            type="button"
            className={[styles.thumb, photoIndex === index ? styles.thumbActive : null].filter(Boolean).join(' ')}
            onClick={() => setIndex(photoIndex)}
            aria-label={`Show ${photo.label}`}
          >
            <StudioHeroArtwork scene={photo.scene} studioName={studio.name} />
          </button>
        ))}
      </div>
    </div>
  )
}

function SectionTabs() {
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'rules', label: 'House Rules' },
    { id: 'reviews', label: 'Reviews' },
  ]

  return (
    <nav className={styles.sectionTabs} aria-label="Studio sections">
      {tabs.map((tab) => (
        <a key={tab.id} href={`#${tab.id}`} className={styles.sectionTab}>
          {tab.label}
        </a>
      ))}
    </nav>
  )
}

function AmenityCard({ amenity }) {
  return (
    <article className={styles.amenityCard}>
      <div className={styles.amenityMedia} aria-hidden="true">
        <StudioHeroArtwork scene={amenity.scene} studioName={amenity.title} />
      </div>
      <div className={styles.amenityTitle}>{amenity.title}</div>
    </article>
  )
}

function ReviewCard({ review }) {
  return (
    <article className={styles.reviewCard}>
      <div className={styles.reviewHead}>
        <div className={styles.reviewAvatar}>{review.name.charAt(0)}</div>
        <div className={styles.reviewMeta}>
          <div className={styles.reviewName}>{review.name}</div>
          <div className={styles.reviewRole}>{review.role}</div>
        </div>
      </div>
      <div className={styles.reviewStars}>★★★★★</div>
      <p className={styles.reviewText}>{review.quote}</p>
    </article>
  )
}

function SupportStrip() {
  const items = [
    'Professional Team',
    'Premium Equipment',
    'Creative Solutions',
    'Affordable Pricing',
    'Timely Delivery',
  ]

  return (
    <div className={styles.supportStrip}>
      <div className={styles.containerWide}>
        {items.map((item) => (
          <div key={item} className={styles.supportItem}>
            <span className={styles.supportDot} aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GrandStudio() {
  const { studioId = 'grand' } = useParams()
  const navigate = useNavigate()
  const studio = studioCatalog[studioId]
  const [liked, setLiked] = useState(false)
  const [addonQty, setAddonQty] = useState(() => ({}))
  const [duration, setDuration] = useState(1)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [start, setStart] = useState('10:00')

  const equipment = useMemo(() => studio?.equipment ?? [], [studio])
  const included = useMemo(() => studio?.included ?? [], [studio])
  const selectedAddonIds = useMemo(() => Object.keys(addonQty), [addonQty])
  const studioSubtotal = (studio?.price ?? 0) * duration
  const equipmentSelected = useMemo(() => {
    const byId = new Map((equipment ?? []).map((item) => [item.id, item]))
    return selectedAddonIds
      .map((id) => {
        const item = byId.get(id)
        if (!item) return null
        const qty = clampQty(addonQty[id])
        return { id, name: item.name, price: item.price, qty, total: item.price * qty }
      })
      .filter(Boolean)
  }, [equipment, selectedAddonIds, addonQty])
  const equipmentSubtotal = useMemo(() => {
    const priceById = new Map((equipment ?? []).map((item) => [item.id, item.price]))
    return selectedAddonIds.reduce((sum, id) => sum + (priceById.get(id) ?? 0) * clampQty(addonQty[id]), 0)
  }, [equipment, selectedAddonIds, addonQty])
  const fees = 200
  const subtotal = studioSubtotal + equipmentSubtotal
  const totalPrice = subtotal + fees

  const checkoutPayload = useMemo(
    () => ({
      studioId: studio?.id ?? '',
      studioName: studio?.name ?? studio?.title ?? 'Studio',
      hourlyRate: studio?.price ?? 0,
      hours: duration,
      date,
      start,
      equipment: equipmentSelected,
      equipmentCharges: equipmentSubtotal,
      studioCharges: studioSubtotal,
      subtotal,
      fees,
      total: totalPrice,
    }),
    [studio, duration, date, start, equipmentSelected, equipmentSubtotal, studioSubtotal, subtotal, fees, totalPrice],
  )

  useEffect(() => {
    if (!studio) return
    setLiked(false)
    setAddonQty({})
    setDuration(1)
    setDate(new Date().toISOString().slice(0, 10))
    setStart('10:00')
  }, [studio])

  if (!studio) return <Navigate to="/" replace />
  const showSectionTabs = studio.id !== 'long'

  return (
    <div className={styles.page}>
      <div className={styles.containerWide}>
        <div className={styles.breadcrumbs}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/#studios">Studios</Link>
          <span>/</span>
          <span>{studio.name}</span>
        </div>

        <button type="button" className={styles.backLink} onClick={() => navigate(-1)} aria-label="Back">
          <BackIcon className={styles.backIcon} />
          <span>Back</span>
        </button>

        <div className={styles.heroLayout}>
          <div className={styles.heroGalleryCol}>
            <PhotoGallery studio={studio} />
          </div>

          <aside className={styles.heroInfoCard}>
            <div className={styles.infoTop}>
              <div className={styles.infoMeta}>
                <div className={styles.heroTitle}>{studio.title}</div>
                <div className={styles.heroDims}>{studio.dims}</div>
              </div>
              <button
                type="button"
                className={styles.favoriteBtn}
                onClick={() => setLiked((v) => !v)}
                aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <HeartIcon className={styles.favoriteIcon} filled={liked} />
              </button>
            </div>

            <div className={styles.infoMiddle}>
              <div className={styles.watermark} aria-hidden="true">
                <BookingWatermark className={styles.watermarkArt} />
              </div>

              <div className={styles.priceStack}>
                <div className={styles.price}>₹{studio.price}</div>
                <div className={styles.perHour}>Per Hour</div>
              </div>

              <div className={styles.statBadges} role="list" aria-label="Studio stats">
                <div className={styles.statBadge} role="listitem">
                  <span className={styles.statIcon} aria-hidden="true">
                    ★
                  </span>
                  <span className={styles.statText}>4.9 Rating</span>
                </div>
                <div className={styles.statBadge} role="listitem">
                  <span className={styles.statText}>120+ Reviews</span>
                </div>
                <div className={styles.statBadge} role="listitem">
                  <span className={styles.statText}>120+ Bookings</span>
                </div>
              </div>
            </div>

            <div className={styles.featureRow} role="list">
              {studio.featureSet.map((item) => (
                <div key={item.id} className={styles.featureCard} role="listitem">
                  <span className={styles.featureBadge} aria-hidden="true">
                    <FeatureIcon kind={item.kind} className={styles.featureIcon} />
                  </span>
                  <span className={styles.featureTitle}>{item.title}</span>
                  <span className={styles.featureSub}>{item.sub}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {showSectionTabs ? <SectionTabs /> : null}

        <div className={styles.contentPanel}>
          <div className={styles.aboutOverviewGrid}>
            <section id="about" className={styles.panel} aria-labelledby="about-title">
              <h2 id="about-title" className={styles.panelTitle}>About This Studio</h2>
              <p className={styles.aboutText}>{studio.description}</p>
              <AboutCards />
            </section>

            <section className={styles.panel} aria-labelledby="overview-title">
              <h2 id="overview-title" className={styles.panelTitle}>Studio Overview</h2>
              <div className={styles.overviewTable}>
                {studio.overview.map((row) => (
                  <div key={row.label} className={styles.overviewRow}>
                    <div className={styles.overviewLabel}>{row.label}</div>
                    <div className={styles.overviewValue}>{row.value}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section id="equipment" className={styles.sectionBlock} aria-labelledby="equipment-title">
            <div className={styles.sectionHeading}>Equipment</div>
            <div className={styles.eqGrid} role="list">
              {equipment.map((item) => {
                const selected = Object.prototype.hasOwnProperty.call(addonQty, item.id)
                const qty = selected ? addonQty[item.id] : 1
                return (
                  <EquipmentCard
                    key={item.id}
                    item={item}
                    qty={qty}
                    selected={selected}
                    onToggleSelected={() => {
                      setAddonQty((prev) => {
                        const next = { ...prev }
                        if (Object.prototype.hasOwnProperty.call(next, item.id)) delete next[item.id]
                        else next[item.id] = 1
                        return next
                      })
                    }}
                    onChangeQty={(nextQty) => {
                      setAddonQty((prev) => {
                        if (!Object.prototype.hasOwnProperty.call(prev, item.id)) return prev
                        return { ...prev, [item.id]: clampQty(nextQty) }
                      })
                    }}
                  />
                )
              })}
            </div>
          </section>

          <div className={styles.includedBookingGrid}>
            <section className={[styles.sectionBlock, styles.includedCard].join(' ')} aria-labelledby="included-title">
              <div id="included-title" className={styles.sectionHeading}>Included With Booking</div>
              <div className={styles.incWrap} role="list">
                <div className={styles.incRow}>
                  {included.map((it) => (
                    <div key={it.id} className={styles.incItem} role="listitem">
                      <span className={styles.incIconWrap} aria-hidden="true">
                        <IncludedIcon name={it.icon} />
                      </span>
                      <div className={styles.incLabel}>
                        {it.lines.map((line, idx) => (
                          <span key={idx}>{line}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className={styles.bookingCard} aria-label="Booking panel">
              <div className={styles.bookingGroup}>
                <div className={styles.bookingLabel}>Duration</div>
                <div className={styles.durationRow}>
                  {[1, 2, 4, 8, 12].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      className={[styles.durationBtn, duration === hours ? styles.durationBtnActive : null].filter(Boolean).join(' ')}
                      onClick={() => setDuration(hours)}
                    >
                      {hours} HR
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.bookingGroup}>
                <div className={styles.bookingLabel}>Price</div>
                <div className={styles.priceRow}>
                  {[1, 2, 4, 8, 12].map((hours) => (
                    <div key={hours} className={[styles.priceCell, duration === hours ? styles.priceCellActive : null].filter(Boolean).join(' ')}>
                      ₹{studio.price * hours}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={styles.bookNowBtn}
                onClick={() => {
                  const draft = {
                    studioId: checkoutPayload.studioId,
                    studioName: checkoutPayload.studioName,
                    hourlyRate: checkoutPayload.hourlyRate,
                    hours: checkoutPayload.hours,
                    date: checkoutPayload.date,
                    start: checkoutPayload.start,
                    equipmentQty: addonQty,
                    fees: checkoutPayload.fees,
                  }
                  sessionStorage.setItem('booking_info_draft_v1', JSON.stringify(draft))
                  const params = new URLSearchParams()
                  params.set('studio', studio.id)
                  params.set('duration', String(duration))
                  if (Object.keys(addonQty).length > 0) {
                    params.set('qty', encodeURIComponent(JSON.stringify(addonQty)))
                  }
                  navigate(`/bookings?${params.toString()}`)
                }}
              >
                <span>Book Studio Now</span>
                <span>Advance Booking Recommended</span>
              </button>
              <div className={styles.bookingMeta}>
                <span>Selected add-ons: {selectedAddonIds.length}</span>
                <span>Total: ₹{totalPrice}</span>
              </div>
            </aside>
          </div>

          <section id="amenities" className={styles.sectionBlock} aria-labelledby="amenities-title">
            <div id="amenities-title" className={styles.sectionHeading}>Amenities</div>
            <div className={styles.amenityGrid}>
              {studio.amenities.map((amenity) => (
                <AmenityCard key={amenity.id} amenity={amenity} />
              ))}
            </div>
          </section>

          <section id="rules" className={styles.sectionBlock} aria-labelledby="rules-title">
            <div id="rules-title" className={styles.sectionHeading}>House Rules</div>
            <div className={styles.ruleGrid}>
              {studio.rules.map((rule) => (
                <div key={rule.id} className={styles.ruleCard}>
                  <RuleIcon kind={rule.kind} className={styles.ruleIcon} />
                  <span>{rule.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="reviews" className={styles.sectionBlock} aria-labelledby="reviews-title">
            <div className={styles.reviewHeader}>
              <div id="reviews-title" className={styles.sectionHeading}>Reviews & Testimonials</div>
              <a href="#reviews" className={styles.reviewLink}>View All Reviews</a>
            </div>
            <div className={styles.reviewGrid}>
              {studio.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <SupportStrip />
      <Footer />
    </div>
  )
}
