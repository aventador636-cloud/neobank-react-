import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type { User } from './auth-context'

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
