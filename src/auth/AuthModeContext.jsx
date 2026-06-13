import { createContext, useContext, useState } from 'react'

const AuthModeContext = createContext()

export function AuthModeProvider({ children }) {
  const [authMode, setAuthMode] = useState('login')

  return (
    <AuthModeContext.Provider value={{ authMode, setAuthMode }}>
      {children}
    </AuthModeContext.Provider>
  )
}

export function useAuthMode() {
  const context = useContext(AuthModeContext)
  if (!context) {
    throw new Error('useAuthMode must be used within an AuthModeProvider')
  }
  return context
}
