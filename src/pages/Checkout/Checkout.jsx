import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button.jsx'
import Modal from '../../components/ui/Modal/Modal.jsx'
import Footer from '../../components/sections/Footer/Footer.jsx'
import styles from './Checkout.module.css'

function clampQty(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 1
  if (n < 1) return 1
  if (n > 10) return 10
  return Math.round(n)
}

function readStoredBooking() {
  try {
    const raw = sessionStorage.getItem('checkout_booking_v1')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function readBookingDraft() {
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

function persistBooking(next) {
  sessionStorage.setItem('checkout_booking_v1', JSON.stringify(next))
}

function PaymentIcon({ kind }) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', className: styles.payIcon, 'aria-hidden': true }
  if (kind === 'upi') {
    return (
      <svg {...common}>
        <path d="M6 7h6l-3 5h3l-3 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 8h4v8h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'paytm') {
    return (
      <svg {...common}>
        <path d="M6 16V8h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 16V8h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'gpay') {
    return (
      <svg {...common}>
        <path d="M7 12a5 5 0 0 1 5-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 12a5 5 0 0 0 5 5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'phonepe') {
    return (
      <svg {...common}>
        <path d="M8 7h8v10H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 10h4M10 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'netbanking') {
    return (
      <svg {...common}>
        <path d="M4 10l8-5 8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M6 8h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [booking, setBooking] = useState(null)
  const [method, setMethod] = useState('upi')
  const [doneOpen, setDoneOpen] = useState(false)

  useEffect(() => {
    const fromState = location.state && typeof location.state === 'object' ? location.state.booking : null
    const stored = readStoredBooking()
    const next = fromState || stored
    if (!next) {
      navigate(readBookingDraft() ? '/bookings' : '/#select-studio', { replace: true })
      return
    }
    persistBooking(next)
    setBooking(next)
  }, [location.state, navigate])

  const summary = useMemo(() => {
    if (!booking) return null

    const hours = clampQty(booking.hours ?? 1)
    const hourlyRate = Number(booking.hourlyRate ?? 0) || 0
    const equipment = Array.isArray(booking.equipment) ? booking.equipment : []
    const normalizedEquipment = equipment
      .map((row) => {
        if (!row || typeof row !== 'object') return null
        const qty = clampQty(row.qty ?? 1)
        const price = Number(row.price ?? 0) || 0
        return {
          id: String(row.id ?? row.name ?? ''),
          name: String(row.name ?? 'Equipment'),
          qty,
          price,
          total: price * qty,
        }
      })
      .filter(Boolean)

    const studioCharges = Number(booking.studioCharges ?? hourlyRate * hours) || 0
    const equipmentCharges =
      Number(booking.equipmentCharges ?? normalizedEquipment.reduce((sum, row) => sum + row.total, 0)) || 0
    const fees = Number(booking.fees ?? 200) || 0
    const taxes = Number(booking.taxes ?? 0) || 0
    const subtotal = Number(booking.subtotal ?? studioCharges + equipmentCharges) || 0
    const total = Number(booking.total ?? subtotal + fees + taxes) || 0

    return {
      studioName: String(booking.studioName ?? 'Studio'),
      hours,
      hourlyRate,
      date: booking.date ? String(booking.date) : '',
      start: booking.start ? String(booking.start) : '',
      equipment: normalizedEquipment,
      customer: booking.customer && typeof booking.customer === 'object' ? booking.customer : null,
      studioCharges,
      equipmentCharges,
      subtotal,
      fees,
      taxes,
      total,
    }
  }, [booking])

  function updateDate(nextDate) {
    setBooking((prev) => {
      if (!prev) return prev
      const next = { ...prev, date: nextDate }
      persistBooking(next)
      return next
    })
  }

  function updateStart(nextStart) {
    setBooking((prev) => {
      if (!prev) return prev
      const next = { ...prev, start: nextStart }
      persistBooking(next)
      return next
    })
  }

  if (!summary) return null

  const paymentMethods = [
    { id: 'upi', label: 'UPI / QR Payment', meta: 'Pay using any UPI app', speed: 'Instant' },
    { id: 'paytm', label: 'Paytm', meta: 'Pay easily using Paytm', speed: 'Instant' },
    { id: 'gpay', label: 'Google Pay', meta: 'Pay easily using Google Pay', speed: 'Instant' },
    { id: 'phonepe', label: 'PhonePe', meta: 'Pay easily using PhonePe', speed: 'Instant' },
    { id: 'netbanking', label: 'Net Banking', meta: 'Pay using your bank account', speed: 'Instant' },
    { id: 'card', label: 'Debit / Credit Card', meta: 'Visa, MasterCard, RuPay & more', speed: 'Instant' },
  ]

  return (
    <div className={styles.page}>
      <Modal
        open={doneOpen}
        onClose={() => setDoneOpen(false)}
        title="Payment initiated"
        description="Your booking details are saved. This is a demo checkout screen."
        size="sm"
      >
        <div className={styles.doneActions}>
          <Button type="button" variant="secondary" onClick={() => setDoneOpen(false)}>
            Stay here
          </Button>
          <Button
            type="button"
            onClick={() => {
              setDoneOpen(false)
              navigate('/bookings')
            }}
          >
            Back to bookings
          </Button>
        </div>
      </Modal>

      <header className={styles.banner} aria-label="Confirm booking">
        <div className={styles.bannerInner}>
          <img className={styles.bannerLogo} src="/favicon.svg" alt="" aria-hidden="true" />
          <div className={styles.bannerTitle}>CONFIRM BOOKING</div>
          <div className={styles.bannerSub}>Review your booking details and complete your payment.</div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          <section className={styles.card} aria-label="Price details">
            <div className={styles.cardTitle}>
              <span className={styles.step}>1</span>
              <span>Price Details</span>
            </div>

            <div className={styles.details}>
              <div className={styles.row}>
                <span>
                  Studio ({summary.hours} Hours) <span className={styles.sep}>›</span> {summary.studioName}
                </span>
                <span>₹{summary.studioCharges}</span>
              </div>

              {summary.equipmentCharges ? (
                <div className={styles.row}>
                  <span>Equipment charges</span>
                  <span>₹{summary.equipmentCharges}</span>
                </div>
              ) : null}

              {summary.equipment.length ? (
                <div className={styles.equipList} aria-label="Selected equipment">
                  {summary.equipment.map((row) => (
                    <div key={row.id} className={styles.equipRow}>
                      <span className={styles.equipName}>{row.name}</span>
                      <span className={styles.equipMeta}>{row.qty} × ₹{row.price} = ₹{row.total}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className={styles.row}>
                <span>Sub Total</span>
                <span>₹{summary.subtotal}</span>
              </div>
              <div className={styles.row}>
                <span>Convenience Charges</span>
                <span>₹{summary.fees}</span>
              </div>
              {summary.taxes ? (
                <div className={styles.row}>
                  <span>Taxes</span>
                  <span>₹{summary.taxes}</span>
                </div>
              ) : null}

              <div className={styles.total}>
                <span>Total Amount</span>
                <span>₹{summary.total}</span>
              </div>
            </div>

            {summary.customer ? (
              <div className={styles.customer} aria-label="Customer details">
                <div className={styles.customerTitle}>Customer Details</div>
                <div className={styles.customerGrid}>
                  <div className={styles.customerRow}>
                    <span className={styles.customerK}>Name</span>
                    <span className={styles.customerV}>{String(summary.customer.fullName ?? '—')}</span>
                  </div>
                  <div className={styles.customerRow}>
                    <span className={styles.customerK}>Email</span>
                    <span className={styles.customerV}>{String(summary.customer.email ?? '—')}</span>
                  </div>
                  <div className={styles.customerRow}>
                    <span className={styles.customerK}>Mobile</span>
                    <span className={styles.customerV}>{String(summary.customer.mobile ?? '—')}</span>
                  </div>
                  {summary.customer.company ? (
                    <div className={styles.customerRow}>
                      <span className={styles.customerK}>Company</span>
                      <span className={styles.customerV}>{String(summary.customer.company)}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className={styles.when}>
              <div className={styles.whenTitle}>Date & Time</div>
              <div className={styles.whenGrid}>
                <label className={styles.whenField}>
                  <span>Date</span>
                  <input
                    className={styles.whenInput}
                    type="date"
                    value={summary.date}
                    onChange={(e) => updateDate(e.target.value)}
                  />
                </label>
                <label className={styles.whenField}>
                  <span>Start</span>
                  <input
                    className={styles.whenInput}
                    type="time"
                    value={summary.start}
                    onChange={(e) => updateStart(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </section>

          <section className={styles.card} aria-label="Payment method">
            <div className={styles.cardTitle}>
              <span className={styles.step}>2</span>
              <span>Choose Payment Method</span>
            </div>

            <div className={styles.methods} role="radiogroup" aria-label="Payment method list">
              {paymentMethods.map((m) => (
                <label key={m.id} className={[styles.method, method === m.id ? styles.methodActive : null].filter(Boolean).join(' ')}>
                  <input
                    className={styles.methodRadio}
                    type="radio"
                    name="payment-method"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                  />
                  <span className={styles.methodIcon}>
                    <PaymentIcon kind={m.id} />
                  </span>
                  <span className={styles.methodText}>
                    <span className={styles.methodLabel}>{m.label}</span>
                    <span className={styles.methodMeta}>{m.meta}</span>
                  </span>
                  <span className={styles.methodSpeed}>{m.speed}</span>
                  <span className={styles.methodDot} aria-hidden="true" />
                </label>
              ))}
            </div>

            <div className={styles.secureBox} aria-label="Secure payments notice">
              <div className={styles.secureIcon} aria-hidden="true" />
              <div>
                <div className={styles.secureTitle}>100% Secure Payments</div>
                <div className={styles.secureSub}>Your payment information is safe with us.</div>
              </div>
            </div>

            <div className={styles.legal}>
              By proceeding, you agree to our <Link to="/help">Terms & Conditions</Link>.
            </div>
          </section>
        </div>

        <div className={styles.payBar} aria-label="Total amount to pay">
          <div className={styles.payLeft}>
            <div className={styles.payLabel}>Total Amount to Pay</div>
            <div className={styles.payValue}>₹{summary.total}</div>
          </div>
          <button
            type="button"
            className={styles.payBtn}
            onClick={() => {
              persistBooking({ ...booking, paymentMethod: method })
              setDoneOpen(true)
            }}
          >
            <span>PAY ₹{summary.total} SECURELY</span>
            <span className={styles.payArrow} aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
