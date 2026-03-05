import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface User {
  phone: string
  name: string
}

interface AuthCtx {
  user: User | null
  login: (phone: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthCtx>({ user: null, login: () => {}, logout: () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AuthContext.Provider value={{
      user,
      login: (phone) => setUser({ phone, name: 'Vlasov Andrei' }),
      logout: () => setUser(null),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
