import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../../components/ui/Button/Button.jsx'
import Footer from '../../components/sections/Footer/Footer.jsx'
import TextField from '../../components/ui/TextField/TextField.jsx'
import { EquipmentImage, studioCatalog } from '../Studios/GrandStudio/GrandStudio.jsx'
import styles from '../BookingInfo/BookingInfo.module.css'

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function clampQty(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 0
  if (n < 0) return 0
  if (n > 10) return 10
  return Math.round(n)
}

function normalizeMobile(input) {
  const raw = String(input ?? '').trim()
  const digits = raw.replace(/[^\d]/g, '')
  if (digits.length === 10) return digits
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 13 && digits.startsWith('091')) return digits.slice(3)
  return digits
}

function isValidEmail(email) {
  const v = String(email ?? '').trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function readDraft() {
  try {
    const raw = sessionStorage.getItem('booking_info_draft_v1')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

export default function Bookings() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [draft, setDraft] = useState(null)
  const [studioId, setStudioId] = useState('grand')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [start, setStart] = useState('10:00')
  const [hours, setHours] = useState(2)
  const [equipmentQty, setEquipmentQty] = useState({})
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    company: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const studioFromQuery = searchParams.get('studio')
    const durationFromQuery = Number(searchParams.get('duration'))
    const qtyFromQuery = searchParams.get('qty')

    let qtyParsed = null
    if (qtyFromQuery) {
      try {
        qtyParsed = JSON.parse(decodeURIComponent(qtyFromQuery))
      } catch {
        qtyParsed = null
      }
    }

    if (studioFromQuery && studioCatalog[studioFromQuery]) {
      setStudioId(studioFromQuery)
      setDate(new Date().toISOString().slice(0, 10))
      setStart('10:00')
      if (Number.isFinite(durationFromQuery) && durationFromQuery >= 1) {
        setHours(durationFromQuery)
      }
      if (qtyParsed && typeof qtyParsed === 'object' && !Array.isArray(qtyParsed)) {
        const next = {}
        Object.entries(qtyParsed).forEach(([id, qty]) => {
          if (typeof id === 'string') {
            const q = clampQty(qty)
            if (q > 0) next[id] = q
          }
        })
        setEquipmentQty(next)
      }
      return
    }

    const nextDraft = readDraft()
    if (!nextDraft) {
      // If no draft, just use defaults
      return
    }
    setDraft(nextDraft)
    const nextStudioId = studioCatalog[nextDraft.studioId] ? nextDraft.studioId : 'grand'
    setStudioId(nextStudioId)
    setDate(nextDraft.date ? String(nextDraft.date) : new Date().toISOString().slice(0, 10))
    setStart(nextDraft.start ? String(nextDraft.start) : '10:00')
    setHours(Number.isFinite(Number(nextDraft.hours)) ? Math.max(1, Math.min(12, Math.round(Number(nextDraft.hours)))) : 2)
    setEquipmentQty(() => {
      const src = nextDraft.equipmentQty && typeof nextDraft.equipmentQty === 'object' ? nextDraft.equipmentQty : {}
      const out = {}
      Object.entries(src).forEach(([id, qty]) => {
        if (typeof id !== 'string') return
        const q = clampQty(qty)
        if (q > 0) out[id] = q
      })
      return out
    })
  }, [searchParams])

  const studio = studioCatalog[studioId]
  const equipmentList = useMemo(() => studio?.equipment ?? [], [studio])
  const hourlyRate = Number(studio?.price ?? draft?.hourlyRate ?? 0) || 0
  const fees = Number(draft?.fees ?? 200) || 0

  const equipmentSelected = useMemo(() => {
    const byId = new Map(equipmentList.map((it) => [it.id, it]))
    return Object.entries(equipmentQty)
      .map(([id, qty]) => {
        const item = byId.get(id)
        if (!item) return null
        const q = clampQty(qty)
        if (q <= 0) return null
        return { id, name: item.name, price: item.price, qty: q, total: item.price * q }
      })
      .filter(Boolean)
  }, [equipmentList, equipmentQty])

  const studioCharges = hourlyRate * hours
  const equipmentCharges = equipmentSelected.reduce((sum, row) => sum + row.total, 0)
  const total = studioCharges + equipmentCharges + fees

  function setQty(id, nextQty) {
    setEquipmentQty((prev) => {
      const q = clampQty(nextQty)
      const next = { ...prev }
      if (q <= 0) {
        if (hasOwn(next, id)) delete next[id]
        return next
      }
      next[id] = q
      return next
    })
  }

  function validate() {
    const next = {}
    if (!String(form.fullName ?? '').trim()) next.fullName = 'Full name is required.'
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email.'
    const mobile = normalizeMobile(form.mobile)
    if (mobile.length !== 10) next.mobile = 'Enter a valid 10-digit mobile number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onReview() {
    if (!validate()) return

    const payload = {
      studioId: studio?.id ?? studioId,
      studioName: studio?.name ?? draft?.studioName ?? 'Studio',
      hourlyRate,
      hours,
      date,
      start,
      equipment: equipmentSelected,
      studioCharges,
      equipmentCharges,
      fees,
      subtotal: studioCharges + equipmentCharges,
      total,
      customer: {
        fullName: String(form.fullName).trim(),
        email: String(form.email).trim(),
        mobile: normalizeMobile(form.mobile),
        company: String(form.company ?? '').trim(),
        notes: String(form.notes ?? '').trim(),
      },
    }

    sessionStorage.setItem('checkout_booking_v1', JSON.stringify(payload))
    navigate('/checkout')
  }

  return (
    <div className={styles.page}>
      <header className={styles.banner} aria-label="Booking information">
        <div className={styles.bannerInner}>
          <img className={styles.bannerLogo} src="/favicon.svg" alt="" aria-hidden="true" />
          <div className={styles.bannerTitle}>BOOKING INFORMATION</div>
          <div className={styles.bannerSub}>Complete your details before checkout.</div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.pageGrid}>
          <div className={styles.topGrid}>
            <section className={[styles.card, styles.studioCard].join(' ')} aria-label="Studio selection">
              <div className={styles.cardTitle}>Selected Studio</div>
              <div className={styles.studioRow}>
                <div className={styles.studioMedia} aria-hidden="true">
                  <img src="/favicon.svg" alt="" className={styles.studioMark} />
                </div>
                <div className={styles.studioMeta}>
                  <div className={styles.studioName}>{studio.name}</div>
                  <div className={styles.studioRate}>₹{hourlyRate} / hr</div>
                </div>
              </div>

              <div className={styles.inputs}>
                <label className={styles.field}>
                  <span className={styles.label}>Studio Selection</span>
                  <select
                    value={studioId}
                    onChange={(e) => setStudioId(e.target.value)}
                    className={styles.selectField}
                  >
                    {Object.values(studioCatalog).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </label>
                <TextField
                  id="bi-date"
                  label="Booking date"
                  type="date"
                  className={styles.pickerField}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <TextField
                  id="bi-start"
                  label="Start time"
                  type="time"
                  className={styles.pickerField}
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  required
                />
                <label className={styles.field}>
                  <span className={styles.label}>Number of hours</span>
                  <div className={styles.hoursRow}>
                    <button type="button" className={styles.hourBtn} onClick={() => setHours((h) => Math.max(1, h - 1))} disabled={hours <= 1}>
                      −
                    </button>
                    <div className={styles.hoursVal}>{hours}</div>
                    <button type="button" className={styles.hourBtn} onClick={() => setHours((h) => Math.min(12, h + 1))} disabled={hours >= 12}>
                      +
                    </button>
                  </div>
                </label>
                <div className={styles.chargeRow}>
                  <span>Studio Charges</span>
                  <span>₹{studioCharges}</span>
                </div>
              </div>
            </section>

            <section className={[styles.card, styles.equipmentPanel].join(' ')} aria-label="Equipment selection">
              <div className={styles.equipmentHead}>
                <div>
                  <div className={styles.cardTitle}>Equipment Selection</div>
                  
                </div>
                <div className={styles.equipmentMeta}>
                  <span>{equipmentSelected.length} selected</span>
                </div>
              </div>

              <div className={styles.equipmentGridWrap}>
                <div className={styles.equipmentGrid} role="list">
                  {equipmentList.map((item) => {
                    const qty = hasOwn(equipmentQty, item.id) ? equipmentQty[item.id] : 0
                    const selected = qty > 0
                    return (
                      <div key={item.id} className={styles.equipmentItem} role="listitem">
                        <div
                          className={[styles.equipmentCard, selected ? styles.equipmentCardSelected : null].filter(Boolean).join(' ')}
                          onClick={() => setQty(item.id, selected ? 0 : 1)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setQty(item.id, selected ? 0 : 1)
                            }
                          }}
                          aria-pressed={selected}
                          role="button"
                          tabIndex={0}
                        >
                          <div className={styles.equipmentMedia} data-kind={item.kind} role="img" aria-label={`${item.name} preview`}>
                            <EquipmentImage name={item.name} kind={item.kind} />
                          </div>
                          <div className={styles.equipmentBody}>
                            <div className={styles.equipmentName}>{item.name}</div>
                            <div className={styles.equipmentFooter} aria-label={`${item.name} controls`}>
                              <div className={styles.equipmentPrice} aria-label="Price">
                                ₹{item.price}
                              </div>
                              <div className={styles.qty}>
                                <button
                                  type="button"
                                  className={styles.qtyBtn}
                                  aria-label={`Decrease ${item.name}`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setQty(item.id, clampQty(qty - 1))
                                  }}
                                  disabled={qty <= 0}
                                >
                                  −
                                </button>
                                <span className={styles.qtyVal} aria-label="Quantity">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  className={styles.qtyBtn}
                                  aria-label={`Increase ${item.name}`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setQty(item.id, clampQty(qty + 1))
                                  }}
                                  disabled={qty >= 10}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>

          <aside className={[styles.card, styles.summaryCard].join(' ')} aria-label="Booking summary">
            <div className={styles.summaryHead}>
              <div>
                <div className={styles.cardTitle}>Booking Summary</div>
                <div className={styles.summaryHint}>Review your studio, equipment, pricing, and details before proceeding.</div>
              </div>
            </div>

            <div className={styles.summaryLayout}>
              <div className={styles.summaryList}>
                <div className={styles.summaryRow}>
                  <span className={styles.k}>Studio</span>
                  <span className={styles.v}>{studio.name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.k}>Date</span>
                  <span className={styles.v}>{date || '—'}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.k}>Time</span>
                  <span className={styles.v}>{start || '—'}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.k}>Total hours</span>
                  <span className={styles.v}>{hours}</span>
                </div>
                <div className={styles.summaryDivider} aria-hidden="true" />
                <div className={styles.summaryRow}>
                  <span className={styles.k}>Studio charges</span>
                  <span className={styles.v}>₹{studioCharges}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.k}>Equipment charges</span>
                  <span className={styles.v}>₹{equipmentCharges}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.k}>Convenience charges</span>
                  <span className={styles.v}>₹{fees}</span>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Grand total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className={styles.formBlock} aria-label="Customer information">
                <div className={styles.formTitle}>Customer Information</div>
                <TextField
                  id="bi-name"
                  label="Full name"
                  value={form.fullName}
                  onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))}
                  required
                  error={errors.fullName}
                />
                <TextField
                  id="bi-email"
                  label="Email address"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                  required
                  error={errors.email}
                />
                <TextField
                  id="bi-mobile"
                  label="Mobile number"
                  inputMode="tel"
                  value={form.mobile}
                  onChange={(e) => setForm((v) => ({ ...v, mobile: e.target.value }))}
                  required
                  error={errors.mobile}
                />
                <TextField
                  id="bi-company"
                  label="Company name (optional)"
                  value={form.company}
                  onChange={(e) => setForm((v) => ({ ...v, company: e.target.value }))}
                />
                <TextField
                  id="bi-notes"
                  label="Special requirements / notes (optional)"
                  as="textarea"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((v) => ({ ...v, notes: e.target.value }))}
                />

                <Button type="button" size="lg" onClick={onReview}>
                  Review Booking Details
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
