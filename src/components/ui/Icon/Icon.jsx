const icons = {
  home: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-3.5V14a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v7.5H5.5A1.5 1.5 0 0 1 4 20v-9.5Z"
        strokeWidth="1.7"
      />
    </svg>
  ),
  calendar: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M7 3v3M17 3v3M4.5 9h15"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        strokeWidth="1.7"
      />
    </svg>
  ),
  mail: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.5 7.5h15v10h-15v-10Z"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m5.2 8.2 6.8 5 6.8-5"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  help: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        strokeWidth="1.7"
      />
      <path
        d="M9.5 9.2a2.7 2.7 0 1 1 4.2 2.3c-.9.6-1.7 1.2-1.7 2.5"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M12 17h0" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  ),
  phone: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M8.5 4.5 6.9 6.1c-1 1-1.3 2.5-.7 3.8 1.6 3.5 4.4 6.3 7.9 7.9 1.3.6 2.8.3 3.8-.7l1.6-1.6a1.5 1.5 0 0 0-.3-2.4l-2.4-1.5a1.5 1.5 0 0 0-1.9.3l-.8.8a10.6 10.6 0 0 1-4.8-4.8l.8-.8a1.5 1.5 0 0 0 .3-1.9L10.9 4.8a1.5 1.5 0 0 0-2.4-.3Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  menu: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 7h14M5 12h14M5 17h14"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  mic: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
        strokeWidth="1.7"
      />
      <path
        d="M19 11a7 7 0 0 1-14 0M12 18v3M8.5 21h7"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  camera: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M8 7.5 9.3 6h5.4L16 7.5h2A2 2 0 0 1 20 9.5v9A2 2 0 0 1 18 20.5H6A2 2 0 0 1 4 18.5v-9A2 2 0 0 1 6 7.5h2Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 17a3.1 3.1 0 1 0 0-6.2A3.1 3.1 0 0 0 12 17Z"
        strokeWidth="1.6"
      />
    </svg>
  ),
  spark: (props) => (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <defs>
        <linearGradient id="ring" x1="14" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f0d89a" />
          <stop offset="0.46" stopColor="#cfa24f" />
          <stop offset="1" stopColor="#a8742b" />
        </linearGradient>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 20) rotate(90) scale(32)">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill="#070707" />
      <circle cx="32" cy="32" r="30" fill="url(#glow)" />
      <circle cx="32" cy="32" r="29" stroke="url(#ring)" strokeWidth="2.4" />
      <circle cx="32" cy="32" r="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />

      <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.98">
        <circle cx="32" cy="24" r="12" stroke="rgba(255,255,255,0.55)" strokeWidth="3.2" />
        <circle cx="24.7" cy="38" r="12" stroke="rgba(255,255,255,0.55)" strokeWidth="3.2" />
        <circle cx="39.3" cy="38" r="12" stroke="rgba(255,255,255,0.55)" strokeWidth="3.2" />
        <path
          d="M32 22.4c5.6 0 10.2 4.6 10.2 10.2S37.6 42.8 32 42.8 21.8 38.2 21.8 32.6 26.4 22.4 32 22.4Z"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2.2"
        />
      </g>
    </svg>
  ),
}

export default function Icon({ name, size = 22, className, ...props }) {
  const Comp = icons[name]
  if (!Comp) return null
  return (
    <Comp
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}
