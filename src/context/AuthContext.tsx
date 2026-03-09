import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface UserData {
  id: string
  phone: string
  name: string | null
  email: string | null
  created_at: string
}

interface AuthCtx {
  user: UserData | null
  login: (phone: string, name?: string) => void
  updateProfile: (data: { name?: string; email?: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  login: () => {},
  updateProfile: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)

  const login = (phone: string, name?: string) => {
    setUser({
      id: Date.now().toString(),
      phone,
      name: name ?? null,
      email: null,
      created_at: new Date().toISOString(),
    })
  }

  const updateProfile = (data: { name?: string; email?: string }) => {
    setUser(prev => prev ? { ...prev, ...data } : null)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
