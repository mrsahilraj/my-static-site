import Hero from '../../components/sections/Hero/Hero.jsx'
import Services from '../../components/sections/Services/Services.jsx'
import Spaces from '../../components/sections/Spaces/Spaces.jsx'
import styles from './Home.module.css'

const gallery = [
  { id: 'control', title: 'Control Room', sub: 'Warm analog-inspired finish' },
  { id: 'podcast', title: 'Podcast Set', sub: 'Multi-angle creator setup' },
  { id: 'cinematic', title: 'Cinematic Stage', sub: 'Mood lighting and premium gear' },
]

const pricing = [
  {
    id: 'starter',
    title: 'Starter Session',
    price: '₹1,500/hr',
    sub: 'Ideal for quick recordings and solo creator shoots.',
    meta: 'For independent creators',
  },
  {
    id: 'pro',
    title: 'Pro Session',
    price: '₹2,000/hr',
    sub: 'Best for podcasts, interviews, and branded content days.',
    meta: 'Most popular package',
    featured: true,
  },
  {
    id: 'premium',
    title: 'Premium Production',
    price: 'Custom Quote',
    sub: 'Large-scale shoots with add-ons, crew support, and custom setups.',
    meta: 'For full production days',
  },
]

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
        <div className={styles.aboutShell}>
          <div className={styles.aboutContent}>
            <p className={styles.kicker}>About Us</p>
            <h2 id="about-title" className={styles.sectionTitle}>
              About Simar Siggh Studio
            </h2>
            <p className={styles.aboutSubheading}>
              Where Creativity Meets Professional Production
            </p>
            <p className={styles.sectionText}>
              Simar Siggh Studio is a premium creative space built for musicians, podcasters, filmmakers,
              and digital creators. We provide industry-standard recording, production, and content
              creation environments designed to help ideas become exceptional results. With professional
              equipment, expert support, and a seamless booking experience, we empower creators to focus
              on what matters most-creating outstanding content.
            </p>
          </div>

          <aside className={styles.aboutHighlights} aria-label="Studio highlights">
            <div className={styles.highlightEyebrow}>Why creators choose us</div>
            <div className={styles.highlightList}>
              <div className={styles.highlightItem}>Professional Recording &amp; Production Facilities</div>
              <div className={styles.highlightItem}>High-Quality Audio, Video &amp; Podcast Studios</div>
              <div className={styles.highlightItem}>Modern Equipment &amp; Creative Environment</div>
              <div className={styles.highlightItem}>Trusted by Artists, Brands &amp; Content Creators</div>
            </div>
          </aside>
        </div>
      </section>

      <div id="services" className={styles.sectionWrap}>
        <Services />
      </div>

      <section id="gallery" className={styles.gallerySection} aria-labelledby="gallery-title">
        <div className={[styles.sectionHeader, styles.galleryHeader].join(' ')}>
          <p className={[styles.kicker, styles.galleryKicker].join(' ')}>Gallery</p>
          <h2 id="gallery-title" className={[styles.sectionTitle, styles.galleryTitle].join(' ')}>
            Explore our professional recording rooms, podcast setups, creative production spaces, and
            behind-the-scenes moments that bring every project to life.
          </h2>
          <p className={styles.galleryDescription}>
            Every environment is designed to inspire creativity and deliver exceptional production quality.
          </p>
        </div>
        <div className={styles.galleryGrid}>
          {gallery.map((item, index) => (
            <article key={item.id} className={styles.galleryCard}>
              <div className={styles.galleryMedia} data-variant={index} aria-hidden="true" />
              <div className={styles.galleryBody}>
                <h3 className={styles.galleryCardTitle}>{item.title}</h3>
                <p className={styles.galleryCardSub}>{item.sub}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.sectionWrap}>
        <Spaces />
      </div>

      <section id="pricing" className={styles.pricingSection} aria-labelledby="pricing-title">
        <div className={[styles.sectionHeader, styles.pricingHeader].join(' ')}>
          <p className={[styles.kicker, styles.pricingKicker].join(' ')}>Pricing</p>
          <h2 id="pricing-title" className={[styles.sectionTitle, styles.pricingTitle].join(' ')}>
            Professional studio packages tailored for musicians, podcasters, creators, and brands
            seeking high-quality production experiences.
          </h2>
        </div>
        <div className={styles.pricingGrid}>
          {pricing.map((item) => (
            <article
              key={item.id}
              className={[styles.pricingCard, item.featured ? styles.pricingCardFeatured : null]
                .filter(Boolean)
                .join(' ')}
            >
              {item.featured && <div className={styles.pricingBadge}>Most Popular</div>}
              <div className={styles.pricingCardHeader}>
                <p className={styles.pricingMeta}>{item.meta}</p>
                <h3 className={styles.pricingCardTitle}>{item.title}</h3>
              </div>
              <div className={styles.pricingValue}>{item.price}</div>
              <p className={styles.pricingCardSub}>{item.sub}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
