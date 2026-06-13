import TopNav from '../TopNav/TopNav.jsx'
import BottomNav from '../BottomNav/BottomNav.jsx'
import ScrollProgress from '../ScrollProgress/ScrollProgress.jsx'
import Footer from '../../sections/Footer/Footer.jsx'
import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import styles from './AppShell.module.css'

export default function AppShell({ children }) {
  const location = useLocation()
  const navType = useNavigationType()
  const scrollPositionsRef = useRef(new Map())

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    const key = location.key
    return () => {
      scrollPositionsRef.current.set(key, window.scrollY)
    }
  }, [location.key])

  useLayoutEffect(() => {
    const isStudioDetail = location.pathname.startsWith('/studios/')
    if (isStudioDetail) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (navType === 'POP') {
      const saved = scrollPositionsRef.current.get(location.key)
      window.scrollTo({ top: typeof saved === 'number' ? saved : 0, left: 0, behavior: 'auto' })
    }
  }, [location.key, location.pathname, navType])

  const showRootLanding = location.pathname === '/auth'
  const hideTopNav = location.pathname.startsWith('/studios/')
  const hideBottomNav = true
  const showFooter =
    location.pathname === '/' ||
    location.pathname === '/auth' ||
    location.pathname.startsWith('/auth/')

  return (
    <div className={styles.app}>
      <a className={styles.skip} href="#main-content">
        Skip to content
      </a>
      <ScrollProgress />
      {!hideTopNav && <TopNav />}
      <main
        id="main-content"
        className={[
          styles.main,
          hideBottomNav ? styles.mainNoBottomNav : styles.mainWithBottomNav,
          showRootLanding ? styles.mainBare : null,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </main>
      {showFooter && <Footer />}
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}
