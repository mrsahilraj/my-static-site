import { useState } from 'react'
import Icon from '../../ui/Icon/Icon.jsx'
import Reveal from '../../ui/Reveal/Reveal.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <footer id="contact" className={styles.footer} aria-label="Contact">
      <Reveal>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div className={styles.brandRow}>
              <span className={styles.logo} aria-hidden="true">
                <Icon name="spark" size={34} />
              </span>
              <div className={styles.brandText}>
                <div className={styles.brandName}>SIMAR SINGH</div>
                <div className={styles.brandSub}>STUDIOS</div>
              </div>
            </div>
            <p className={styles.subtitle}>
              Where sound becomes story. We provide end-to-end audio and video production services for brands,
              businesses, creators, and artists.
            </p>
            <div className={styles.socials}>
              <a href="#contact" className={styles.social} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2"/>
                </svg>
              </a>
              <a href="#contact" className={styles.social} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#insta-gradient-footer)"/>
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m0-2C4.1 0 0 4.1 0 7.8v8.4C0 19.9 4.1 24 7.8 24h8.4c3.7 0 7.8-4.1 7.8-7.8V7.8C24 4.1 19.9 0 16.2 0H7.8z" opacity="0"/>
                  <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8.2a3.2 3.2 0 1 1 3.2-3.2 3.2 3.2 0 0 1-3.2 3.2zm6.8-9.8a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z" fill="#fff"/>
                  <defs>
                    <linearGradient id="insta-gradient-footer" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#F77737"/>
                      <stop offset="25%" stopColor="#F77737"/>
                      <stop offset="50%" stopColor="#C32AA3"/>
                      <stop offset="75%" stopColor="#833AB4"/>
                      <stop offset="100%" stopColor="#405DE6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
              <a href="#contact" className={styles.social} aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
                </svg>
              </a>
              <a href="#contact" className={styles.social} aria-label="Twitter/X">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#14171a"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.linkCol}>
            <h2 className={styles.heading}>Quick Links</h2>
            <div className={styles.linkList}>
              <a href="#main-content">Home</a>
              <a href="#about">About Us</a>
              <a href="#services">Services</a>
              <a href="#studios">Studios</a>
              <a href="#gallery">Gallery</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>

          <div className={styles.linkCol}>
            <h2 className={styles.heading}>Our Services</h2>
            <div className={styles.linkList}>
              <a href="#services">Branding & Advertisement</a>
              <a href="#services">Social Media Marketing</a>
              <a href="#services">Photography & Videography</a>
              <a href="#services">Vocal Recording</a>
              <a href="#services">Video Recording</a>
              <a href="#services">Podcast Recording</a>
              <a href="#services">More Services</a>
            </div>
          </div>

          <div className={styles.contactCol}>
            <h2 className={styles.heading}>Contact Us</h2>
            <div className={styles.contactList}>
              <a href="tel:+919821213177" className={styles.contactItem}>
                <Icon name="phone" size={16} />
                <span>982121 3177</span>
              </a>
              <div className={styles.contactItem}>
                <span className={styles.pin} aria-hidden="true" />
                <span>Rajouri Garden, New Delhi</span>
              </div>
              <a href="mailto:simarsinghstudios@gmail.com" className={styles.contactItem}>
                <Icon name="mail" size={16} />
                <span>simarsinghstudios@gmail.com</span>
              </a>
              <button type="button" className={styles.quoteBtn} onClick={onSubmit}>
                {sent ? 'Request Sent' : 'Get a Quick Quote'}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} Simar Siggh Studio. All Rights Reserved.</p>
          <div className={styles.legal}>
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms & Conditions</a>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
