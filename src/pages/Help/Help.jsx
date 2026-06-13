import { useState } from 'react'
import { Link } from 'react-router-dom'
import Accordion from '../../components/ui/Accordion/Accordion.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import Modal from '../../components/ui/Modal/Modal.jsx'
import Reveal from '../../components/ui/Reveal/Reveal.jsx'
import TextField from '../../components/ui/TextField/TextField.jsx'
import styles from './Help.module.css'

// Enhanced FAQ data with categories
const faqData = {
  bookings: [
    {
      id: 'booking-1',
      question: 'How do I book a studio?',
      answer: 'Head to Bookings, choose a space, select your time, and submit a request. We confirm availability by email within 24 hours.',
    },
    {
      id: 'booking-2',
      question: 'Can I reschedule my booking?',
      answer: 'Reschedules are flexible when made at least 24 hours in advance. Same-day adjustments depend on open slots.',
    },
    {
      id: 'booking-3',
      question: 'What happens if I’m late?',
      answer: 'Your booking time still runs. If the next slot is open, we’ll try to extend your session.',
    },
  ],
  payments: [
    {
      id: 'payment-1',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, debit cards, and UPI payments.',
    },
    {
      id: 'payment-2',
      question: 'When will I be charged?',
      answer: 'You will be charged at the time of booking confirmation.',
    },
    {
      id: 'payment-3',
      question: 'Is there a cancellation policy?',
      answer: 'Full refunds are available for cancellations made 72 hours in advance. Partial refunds apply for shorter notice.',
    },
  ],
  studio: [
    {
      id: 'studio-1',
      question: 'Is parking available?',
      answer: 'Limited street parking is available nearby. Rideshare drop-off is recommended for busy evenings.',
    },
    {
      id: 'studio-2',
      question: 'Do you provide cameras?',
      answer: 'We provide lighting and basic stands. Camera rentals can be arranged as an add-on.',
    },
    {
      id: 'studio-3',
      question: 'What equipment is included?',
      answer: 'Each studio includes basic lighting, stands, and power outlets. Check individual studio pages for full details.',
    },
  ],
  troubleshooting: [
    {
      id: 'trouble-1',
      question: 'How do I access the studio?',
      answer: 'You will receive an access code and instructions via email 30 minutes before your booking starts.',
    },
    {
      id: 'trouble-2',
      question: 'What if equipment is not working?',
      answer: 'Contact support immediately. We will either resolve the issue or reschedule your booking at no extra cost.',
    },
  ],
}

function SupportModal({ open, onClose }) {
  function onSubmit(e) {
    e.preventDefault()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Send a support note"
      description="Share what you need and we’ll point you to the right option."
      size="sm"
    >
      <form className={styles.modalForm} onSubmit={onSubmit}>
        <TextField id="s-topic" label="Topic" placeholder="Booking / billing / gear…" required />
        <TextField id="s-email" label="Email" placeholder="you@example.com" inputMode="email" required />
        <TextField id="s-msg" label="Message" as="textarea" rows={5} placeholder="What’s going on?" required />
        <Button type="submit">Send</Button>
        <p className={styles.modalNote}>Demo flow—no data is stored.</p>
      </form>
    </Modal>
  )
}

export default function Help() {
  const [supportOpen, setSupportOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('bookings')



  const quickLinks = [
    { id: 'my-bookings-link', title: 'My Bookings', to: '/my-bookings' },
    { id: 'studios-link', title: 'Studios', to: '/#studios' },
    { id: 'pricing-link', title: 'Pricing', to: '/#pricing' },
    { id: 'contact-link', title: 'Contact Us', to: '/#contact' },
    { id: 'terms-link', title: 'Terms & Conditions', to: '#' },
    { id: 'privacy-link', title: 'Privacy Policy', to: '#' },
  ]

  const categories = [
    { id: 'bookings', label: 'Booking Related' },
    { id: 'payments', label: 'Payment Related' },
    { id: 'studio', label: 'Studio & Equipment' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ]

  return (
    <div className={styles.page}>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
      
      {/* HERO AREA */}
      <Reveal>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Help Center</h1>
          <p className={styles.heroSubtitle}>
            Find answers, manage your bookings, and get expert support whenever you need assistance.
          </p>
          <div className={styles.heroActions}>
            <Button onClick={() => setSupportOpen(true)}>Contact Support</Button>
            <Button variant="secondary" onClick={() => {
              document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Browse FAQs
            </Button>
          </div>
        </header>
      </Reveal>

      {/* CONTACT SUPPORT AREA */}
      <Reveal>
        <section className={styles.supportSection} aria-label="Contact support">
          <div className={styles.supportHeader}>
            <h2 className={styles.supportTitle}>Need More Help?</h2>
            <p className={styles.supportDescription}>
              Our support team is ready to assist you with bookings, payments, studio access, and technical issues.
            </p>
          </div>
          <div className={styles.supportCards}>
            {/* Card 1: Email Support */}
            <div className={styles.supportCard}>
              <div className={styles.supportCardIcon}>📧</div>
              <h3 className={styles.supportCardTitle}>Email Support</h3>
              <p className={styles.supportCardDesc}>
                Get assistance with bookings, payments, account issues, and general inquiries. Our support team will respond as quickly as possible.
              </p>
              <Button 
                as="a" 
                href="mailto:support@yourstudio.com"
                variant="primary"
                className={styles.supportCardBtn}
              >
                Send Email
              </Button>
            </div>

            {/* Card 2: Call Support */}
            <div className={styles.supportCard}>
              <div className={styles.supportCardIcon}>📞</div>
              <h3 className={styles.supportCardTitle}>Call Support</h3>
              <p className={styles.supportCardDesc}>
                Speak directly with our support team for urgent booking assistance, studio information, and technical help.
              </p>
              <Button 
                as="a" 
                href="tel:+919821213177"
                variant="primary"
                className={styles.supportCardBtn}
              >
                Call Now
              </Button>
            </div>

            {/* Card 3: Live Assistance */}
            <div className={styles.supportCard}>
              <div className={styles.supportCardIcon}>💬</div>
              <h3 className={styles.supportCardTitle}>Live Assistance</h3>
              <p className={styles.supportCardDesc}>
                Need immediate help? Connect with our support team for real-time guidance and faster issue resolution.
              </p>
              <Button 
                variant="primary"
                className={styles.supportCardBtn}
                onClick={() => setSupportOpen(true)}
              >
                Start Chat
              </Button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ SECTION */}
      <Reveal>
        <section id="faq-section" className={styles.faqSection} aria-label="Frequently asked questions">
          <div className={styles.faqHeader}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqCategories}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={[
                    styles.faqCategory,
                    activeCategory === cat.id ? styles.faqCategoryActive : null,
                  ].filter(Boolean).join(' ')}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.faqContent}>
            <Accordion 
              items={faqData[activeCategory]} 
              singleOpen={true}
            />
          </div>
        </section>
      </Reveal>

      {/* QUICK LINKS */}
      <Reveal>
        <section className={styles.quickLinksSection} aria-label="Quick links">
          <h2 className={styles.quickLinksTitle}>Quick Links</h2>
          <div className={styles.quickLinksGrid}>
            {quickLinks.map((link) => (
              <Link key={link.id} to={link.to} className={styles.quickLinkCard}>
                {link.title}
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* EMPTY STATE / CALL TO ACTION */}
      <Reveal>
        <section className={styles.ctaSection} aria-label="Get help">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Can't find what you're looking for?</h2>
            <p className={styles.ctaDescription}>
              Contact our support team and we'll help you as soon as possible.
            </p>
            <Button onClick={() => setSupportOpen(true)}>Get Support</Button>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
