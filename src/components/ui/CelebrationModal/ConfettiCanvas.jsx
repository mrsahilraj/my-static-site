import { useEffect, useRef } from 'react'
import styles from './ConfettiCanvas.module.css'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function ConfettiCanvas({ active }) {
  const ref = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (!active) return
    if (prefersReducedMotion()) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      canvas.style.width = `${Math.floor(rect.width)}px`
      canvas.style.height = `${Math.floor(rect.height)}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas.parentElement)

    const colors = [
      '#d6b47c',
      '#c0904a',
      '#ffffff',
      'rgba(255,255,255,0.75)',
    ]

    const originX = () => rand(0.18, 0.82)
    const originY = () => rand(0.18, 0.28)

    const maxParticles = 120
    const particles = Array.from({ length: maxParticles }, () => {
      const w = rand(6, 12)
      const h = rand(4, 10)
      const angle = rand(-Math.PI, Math.PI)
      const speed = rand(4.2, 8.8)
      const ox = originX()
      const oy = originY()
      return {
        x: ox * canvas.clientWidth,
        y: oy * canvas.clientHeight,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(6, 10),
        w,
        h,
        r: rand(0, Math.PI),
        vr: rand(-0.22, 0.22),
        color: colors[Math.floor(Math.random() * colors.length)],
        life: rand(70, 120),
        age: 0,
      }
    })

    function step() {
      if (!running) return
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'

      for (const p of particles) {
        p.age += 1
        p.vy += 0.26
        p.vx *= 0.992
        p.vy *= 0.992
        p.x += p.vx
        p.y += p.vy
        p.r += p.vr

        const t = Math.min(1, p.age / p.life)
        const alpha = 1 - t

        ctx.save()
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.r)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()

        if (p.age >= p.life || p.y > height + 40 || p.x < -40 || p.x > width + 40) {
          const w = rand(6, 12)
          const h = rand(4, 10)
          const angle = rand(-Math.PI, Math.PI)
          const speed = rand(4.2, 8.8)
          const ox = originX()
          const oy = originY()
          p.x = ox * width
          p.y = oy * height
          p.vx = Math.cos(angle) * speed
          p.vy = Math.sin(angle) * speed - rand(6, 10)
          p.w = w
          p.h = h
          p.r = rand(0, Math.PI)
          p.vr = rand(-0.22, 0.22)
          p.color = colors[Math.floor(Math.random() * colors.length)]
          p.life = rand(70, 120)
          p.age = 0
        }
      }

      ctx.restore()
      rafRef.current = window.requestAnimationFrame(step)
    }

    rafRef.current = window.requestAnimationFrame(step)
    return () => {
      running = false
      ro.disconnect()
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [active])

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />
}

