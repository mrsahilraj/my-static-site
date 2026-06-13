import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [status, setStatus] = useState('loading')
  const [user, setUser] = useState(null)

  const refresh = useCallback(async () => {
    setStatus('loading')
    try {
      const data = await apiFetch('/api/auth/me')
      setUser(data.user)
      setStatus('ready')
    } catch {
      setUser(null)
      setStatus('ready')
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const register = useCallback(async (payload) => {
    const data = await apiFetch('/api/auth/register', { method: 'POST', body: payload })
    setUser(data.user)
    return data.user
  }, [])

  const login = useCallback(async (payload) => {
    const data = await apiFetch('/api/auth/login', { method: 'POST', body: payload })
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (payload) => {
    const data = await apiFetch('/api/auth/profile', { method: 'POST', body: payload })
    setUser(data.user)
    return data.user
  }, [])

  const value = useMemo(
    () => ({ status, user, refresh, register, login, logout, updateProfile }),
    [status, user, refresh, register, login, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
