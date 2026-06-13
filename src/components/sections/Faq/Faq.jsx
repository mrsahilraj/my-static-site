import Accordion from '../../ui/Accordion/Accordion.jsx'
import Reveal from '../../ui/Reveal/Reveal.jsx'
import styles from './Faq.module.css'

const items = [
  {
    id: 'time',
    question: 'How far ahead should I book?',
    answer:
      'For weekends, booking 3–7 days ahead works best. Weekday slots are often available sooner.',
  },
  {
    id: 'gear',
    question: 'Can I bring my own gear?',
    answer:
      'Yes. Bring your mic, camera, or instruments. We’ll help you integrate it with the room setup.',
  },
  {
    id: 'reschedule',
    question: 'What’s the reschedule policy?',
    answer:
      'Reschedule requests are flexible when made early. Same-day changes depend on availability.',
  },
  {
    id: 'deliverables',
    question: 'Do you provide editing or mixing?',
    answer:
      'Optional post-production can be added during booking. You can also book the room only.',
  },
]

export default function Faq() {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <Reveal>
        <div className={styles.header}>
          <h2 id="faq-title" className={styles.title}>
            FAQs
          </h2>
          <p className={styles.subtitle}>Quick answers to the most common questions.</p>
        </div>
      </Reveal>
      <Accordion items={items} />
    </section>
  )
}

