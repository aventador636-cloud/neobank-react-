import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { UserData } from '../api'

interface AuthCtx {
  user: UserData | null
  login: (phone: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)

  const login = (phone: string) => {
    setUser({
      id: Date.now().toString(),
      phone,
      name: null,
      email: null,
      created_at: new Date().toISOString(),
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
