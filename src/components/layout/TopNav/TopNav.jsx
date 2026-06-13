import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext.jsx'
import { useAuthMode } from '../../../auth/AuthModeContext.jsx'
import Button from '../../ui/Button/Button.jsx'
import Icon from '../../ui/Icon/Icon.jsx'
import Modal from '../../ui/Modal/Modal.jsx'
import styles from './TopNav.module.css'

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { status, user, logout } = useAuth()
  const { setAuthMode } = useAuthMode()
  const isHome = location.pathname === '/'
  const isAuthPage = location.pathname === '/auth' || location.pathname.startsWith('/auth/')
  const isBookingsPage = location.pathname === '/bookings' || location.pathname === '/my-bookings' || location.pathname === '/help' || location.pathname === '/checkout'
  const isMyBookingsPage = location.pathname === '/my-bookings'
  const needsAuth = isAuthPage && !user

  const appLinks = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/bookings', label: 'Bookings' },
      { to: '/my-bookings', label: 'My Bookings' },
      { to: '/contact', label: 'Contact' },
      { to: '/help', label: 'Help' },
    ],
    [],
  )

  const homeLinks = useMemo(
    () => [
      { href: '#main-content', label: 'Home' },
      { href: '#about', label: 'About Us' },
      { href: '#services', label: 'Services' },
      { href: '#gallery', label: 'Gallery' },
      { href: '#studios', label: 'Studios' },
      { href: '#pricing', label: 'Pricing' },
      { to: '/my-bookings', label: 'My Bookings' },
      { href: '#contact', label: 'Contact Us' },
    ],
    [],
  )

  const bookingsLinks = useMemo(
    () => [
      { href: '/#main-content', label: 'Home', type: 'navigate' },
      { to: '/bookings', label: 'Bookings' },
      { to: '/my-bookings', label: 'My Bookings' },
      { to: '/help', label: 'Help' },
    ],
    [],
  )

  const showCompact =
    location.pathname === '/' ||
    location.pathname === '/auth' ||
    location.pathname.startsWith('/auth/') ||
    location.pathname === '/bookings' ||
    location.pathname === '/contact' ||
    location.pathname === '/help' ||
    location.pathname === '/checkout'

  const menuLinks = isHome ? homeLinks : (isBookingsPage ? bookingsLinks : appLinks)

  const scrollToHash = useCallback((hash) => {
    const id = String(hash || '').replace(/^#/, '')
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    const header = document.querySelector('[data-top-nav]')
    const headerHeight = header ? header.getBoundingClientRect().height : 0
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 12

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (!isHome || !location.hash) return

    const timer = window.setTimeout(() => {
      scrollToHash(location.hash)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [isHome, location.hash, scrollToHash])

  function handleHomeAnchorClick(href, afterClick) {
    return (e) => {
      e.preventDefault()

      if (needsAuth) {
        setAuthModalOpen(true)
        return
      }

      if (typeof afterClick === 'function') afterClick()
      window.history.replaceState(null, '', href)
      scrollToHash(href)
    }
  }

  function handleNavClick(link) {
    return (e) => {
      e.preventDefault()
      if (needsAuth) {
        setAuthModalOpen(true)
        return
      }
      if (link.href) {
        handleHomeAnchorClick(link.href)()
      } else if (link.to) {
        navigate(link.to)
      }
    }
  }

  return (
    <>
      <header data-top-nav className={[styles.header, isHome || isAuthPage || isBookingsPage ? styles.headerHome : null].filter(Boolean).join(' ')}>
        {(isHome || isAuthPage || isBookingsPage) && (
          <div className={styles.topStrip}>
            <div className={styles.topStripInner}>
              <div className={styles.metaGroup}>
                <a href="tel:+919821213177" className={styles.metaItem}>
                  <Icon name="phone" size={13} />
                  <span>982121 3177</span>
                </a>
                <span className={styles.metaItem}>
                  <span className={styles.metaDot} aria-hidden="true" />
                  <span>Rajouri Garden, New Delhi</span>
                </span>
              </div>
              <div className={styles.socials} aria-label="Social links">
                <a href="#contact" className={styles.social} aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2"/>
                  </svg>
                </a>
                <a href="#contact" className={styles.social} aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#insta-gradient)"/>
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m0-2C4.1 0 0 4.1 0 7.8v8.4C0 19.9 4.1 24 7.8 24h8.4c3.7 0 7.8-4.1 7.8-7.8V7.8C24 4.1 19.9 0 16.2 0H7.8z" opacity="0"/>
                    <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8.2a3.2 3.2 0 1 1 3.2-3.2 3.2 3.2 0 0 1-3.2 3.2zm6.8-9.8a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z" fill="#fff"/>
                    <defs>
                      <linearGradient id="insta-gradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
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
          </div>
        )}

        <div className={[styles.inner, isHome || isAuthPage || isBookingsPage ? styles.innerHome : null].filter(Boolean).join(' ')}>
          <NavLink to="/" className={[styles.brand, isHome || isAuthPage || isBookingsPage ? styles.brandHome : null].filter(Boolean).join(' ')} aria-label="Go to home" onClick={(e) => {
            if (needsAuth) {
              e.preventDefault()
              setAuthModalOpen(true)
            }
          }}>
            <span className={styles.mark} aria-hidden="true">
              <Icon name="spark" size={isHome || isAuthPage || isBookingsPage ? 38 : 30} />
            </span>
            <span className={styles.brandText}>
              <span className={styles.name}>{isHome || isAuthPage || isBookingsPage ? 'SIMAR SINGH' : 'Simar Siggh Studio'}</span>
              <span className={styles.tag}>{isHome || isAuthPage || isBookingsPage ? 'STUDIOS' : 'Sessions • Shoots • Voice'}</span>
            </span>
          </NavLink>

          <nav className={styles.nav} aria-label="Primary">
            {isHome || isAuthPage
              ? homeLinks.map((l) => {
                  if (l.to) {
                    return (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) =>
                          [styles.link, styles.linkHome, isActive ? styles.linkActive : null]
                            .filter(Boolean)
                            .join(' ')
                        }
                        onClick={(e) => {
                          if (needsAuth) {
                            e.preventDefault()
                            setAuthModalOpen(true)
                          }
                        }}
                      >
                        {l.label}
                      </NavLink>
                    );
                  } else {
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        className={[styles.link, styles.linkHome].join(' ')}
                        onClick={handleHomeAnchorClick(l.href)}
                      >
                        {l.label}
                      </a>
                    );
                  }
                })
              : isBookingsPage
              ? bookingsLinks.map((l) => {
                  if (l.type === 'navigate') {
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        className={[styles.link, styles.linkHome].join(' ')}
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/#main-content')
                        }}
                      >
                        {l.label}
                      </a>
                    );
                  } else {
                    return (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) =>
                          [styles.link, styles.linkHome, isActive ? styles.linkActive : null]
                            .filter(Boolean)
                            .join(' ')
                        }
                      >
                        {l.label}
                      </NavLink>
                    );
                  }
                })
              : appLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      [styles.link, isActive ? styles.linkActive : null]
                        .filter(Boolean)
                        .join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
          </nav>

          <div className={styles.actions}>
            {(!isHome && !isAuthPage && !isBookingsPage) && status === 'ready' && !user && (
              <Button 
                variant="secondary" 
                size="sm" 
                className={styles.auth}
                onClick={() => {
                  setAuthMode('login')
                  navigate('/auth')
                }}
              >
                Log in
              </Button>
            )}
            {(!isHome && !isAuthPage && !isBookingsPage) && status === 'ready' && user && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className={styles.auth}
                onClick={async () => {
                  await logout()
                }}
              >
                Log out
              </Button>
            )}
            {isBookingsPage ? (
              <Button
                as="a"
                href="/#contact"
                variant="primary"
                size="sm"
                className={[styles.call, styles.callHome].filter(Boolean).join(' ')}
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/#contact')
                }}
              >
                Contact Us
              </Button>
            ) : (
              <Button
                variant={showCompact ? 'secondary' : 'primary'}
                size="sm"
                className={[styles.call, isHome || isAuthPage ? styles.callHome : null].filter(Boolean).join(' ')}
                onClick={(e) => {
                  if (needsAuth) {
                    e.preventDefault()
                    setAuthModalOpen(true)
                    return
                  }
                  if (isHome) {
                    navigate('/bookings')
                  }
                }}
              >
                <Icon name="phone" size={18} />
                {isHome || isAuthPage ? 'Book Now' : 'Call'}
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={styles.menu}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <Modal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
        description="Quick navigation and actions."
        size="sm"
      >
        <div className={styles.menuBody}>
          {status === 'ready' && user && (
            <div className={styles.userBox}>
              <div className={styles.userName}>{user.fullName}</div>
              <div className={styles.userMeta}>{user.mobile}</div>
            </div>
          )}
          <div className={styles.menuLinks}>
            {isHome || isAuthPage
              ? menuLinks.map((l) => {
                  if (l.to) {
                    return (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) =>
                          [styles.menuLink, isActive ? styles.menuLinkActive : null]
                            .filter(Boolean)
                            .join(' ')
                        }
                        onClick={(e) => {
                          if (needsAuth) {
                            e.preventDefault()
                            setMenuOpen(false)
                            setAuthModalOpen(true)
                            return
                          }
                          setMenuOpen(false)
                        }}
                      >
                        {l.label}
                      </NavLink>
                    );
                  } else {
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        className={styles.menuLink}
                        onClick={(e) => {
                          if (needsAuth) {
                            e.preventDefault()
                            setMenuOpen(false)
                            setAuthModalOpen(true)
                            return
                          }
                          handleHomeAnchorClick(l.href, () => setMenuOpen(false))(e)
                        }}
                      >
                        {l.label}
                      </a>
                    );
                  }
                })
              : isBookingsPage
              ? menuLinks.map((l) => {
                  if (l.type === 'navigate') {
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        className={styles.menuLink}
                        onClick={(e) => {
                          e.preventDefault()
                          setMenuOpen(false)
                          navigate('/#main-content')
                        }}
                      >
                        {l.label}
                      </a>
                    );
                  } else {
                    return (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) =>
                          [styles.menuLink, isActive ? styles.menuLinkActive : null]
                            .filter(Boolean)
                            .join(' ')
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        {l.label}
                      </NavLink>
                    );
                  }
                })
              : menuLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      [styles.menuLink, isActive ? styles.menuLinkActive : null]
                        .filter(Boolean)
                        .join(' ')
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                ))}
          </div>
          <div className={styles.menuActions}>
            {status === 'ready' && !user && (
              <Button 
                variant="secondary" 
                onClick={() => {
                  setMenuOpen(false)
                  setAuthMode('login')
                  navigate('/auth')
                }}
              >
                Log in
              </Button>
            )}
            {status === 'ready' && user && (
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  await logout()
                  setMenuOpen(false)
                }}
              >
                Log out
              </Button>
            )}
            <Button as="a" href="mailto:simarsinghstudios@gmail.com" variant="secondary">
              <Icon name="mail" size={18} />
              Email
            </Button>
            <Button as="a" href="tel:+919821213177">
              <Icon name="phone" size={18} />
              Call now
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Authentication Required"
        description="Please login or create an account first to continue exploring the studio and booking services."
        size="sm"
      >
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => {
              setAuthModalOpen(false)
              setAuthMode('login')
              if (!isAuthPage) navigate('/auth')
            }} 
            style={{ flex: 1 }}
          >
            Login Now
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => {
              setAuthModalOpen(false)
              setAuthMode('register')
              if (!isAuthPage) navigate('/auth')
            }} 
            style={{ flex: 1 }}
          >
            Register
          </Button>
        </div>
      </Modal>
    </>
  )
}
