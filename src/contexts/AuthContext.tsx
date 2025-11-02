import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface User {
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  isAnonymous: boolean
  signIn: () => Promise<void>
  signOut: () => void
  setAnonymous: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for hardcoded Google sign-in
const MOCK_USER: User = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAnonymous, setIsAnonymous] = useState(false)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('gtm-bud-auth')
    const storedAnonymous = localStorage.getItem('gtm-bud-anonymous')
    
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth)
        setIsAuthenticated(parsed.isAuthenticated)
        setUser(parsed.user)
      } catch (e) {
        console.error('Failed to parse stored auth:', e)
      }
    }
    
    if (storedAnonymous === 'true') {
      setIsAnonymous(true)
    }
  }, [])

  const signIn = async () => {
    // Simulate Google OAuth loading
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Set authenticated user
    const authData = {
      isAuthenticated: true,
      user: MOCK_USER
    }
    
    setIsAuthenticated(true)
    setUser(MOCK_USER)
    setIsAnonymous(false)
    
    // Save to localStorage
    localStorage.setItem('gtm-bud-auth', JSON.stringify(authData))
    localStorage.removeItem('gtm-bud-anonymous')
  }

  const signOut = () => {
    setIsAuthenticated(false)
    setUser(null)
    setIsAnonymous(false)
    localStorage.removeItem('gtm-bud-auth')
    localStorage.removeItem('gtm-bud-anonymous')
    localStorage.removeItem('gtm-bud-campaign-data')
  }

  const setAnonymous = (value: boolean) => {
    setIsAnonymous(value)
    if (value) {
      localStorage.setItem('gtm-bud-anonymous', 'true')
    } else {
      localStorage.removeItem('gtm-bud-anonymous')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isAnonymous,
        signIn,
        signOut,
        setAnonymous
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

