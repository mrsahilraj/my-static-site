import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './auth/AuthContext.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import AppShell from './components/layout/AppShell/AppShell.jsx'

const Home = lazy(() => import('./pages/Home/Home.jsx'))
const LandingAuth = lazy(() => import('./pages/LandingAuth/LandingAuth.jsx'))
const Bookings = lazy(() => import('./pages/Bookings/Bookings.jsx'))
const MyBookings = lazy(() => import('./pages/MyBookings/MyBookings.jsx'))
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'))
const Help = lazy(() => import('./pages/Help/Help.jsx'))
const BookingInfo = lazy(() => import('./pages/BookingInfo/BookingInfo.jsx'))
const Checkout = lazy(() => import('./pages/Checkout/Checkout.jsx'))
const Login = lazy(() => import('./pages/Auth/Login/Login.jsx'))
const Register = lazy(() => import('./pages/Auth/Register/Register.jsx'))
const ForgotMpin = lazy(() => import('./pages/Auth/ForgotMpin/ForgotMpin.jsx'))
const GrandStudio = lazy(() => import('./pages/Studios/GrandStudio/GrandStudio.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))

function RootRoute() {
  const location = useLocation()
  const { status, user } = useAuth()

  if (status === 'loading') {
    return <div style={{ padding: 24 }}>Loading…</div>
  }

  if (!location.hash || !user) {
    return <Navigate to="/auth" replace />
  }

  return <Home />
}

function AuthRoute() {
  const { status, user } = useAuth()

  if (status === 'loading') {
    return <div style={{ padding: 24 }}>Loading…</div>
  }

  return user ? <Navigate to="/#main-content" replace /> : <LandingAuth />
}

export default function App() {
  const location = useLocation()
  
  useEffect(() => {
    // If there's a hash, let the browser handle scrolling to the element
    if (location.hash) {
      return
    }
    // Otherwise, scroll to the top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [location.pathname, location.search, location.hash])
  
  return (
    <AppShell>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/auth" element={<AuthRoute />} />
          <Route path="/auth/login" element={<Navigate to="/auth" replace />} />
          <Route path="/auth/register" element={<Navigate to="/auth" replace />} />
          <Route path="/auth/forgot" element={<Navigate to="/auth" replace />} />
          <Route
        path="/bookings"
        element={
          <RequireAuth>
            <Bookings />
          </RequireAuth>
        }
      />
          <Route
            path="/my-bookings"
            element={
              <RequireAuth>
                <MyBookings />
              </RequireAuth>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/booking-info/*" element={<Navigate to="/bookings" replace />} />
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/studios/:studioId" element={<GrandStudio />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}
