import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import { useAuthMode } from './AuthModeContext.jsx'

export default function RequireAuth({ children }) {
  const { status, user } = useAuth()
  const location = useLocation()
  const { setAuthMode } = useAuthMode()

  if (status !== 'ready') return <div style={{ padding: 24 }}>Loading…</div>
  if (!user) {
    setAuthMode('login')
    return <Navigate to="/auth" replace />
  }

  return children
}

