import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('shopkart-token') || '')
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shopkart-user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const login = (newToken, newUser) => {
    localStorage.setItem('shopkart-token', newToken)
    localStorage.setItem('shopkart-user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('shopkart-token')
    localStorage.removeItem('shopkart-user')
    setToken('')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
