import { createContext } from 'react'

export interface User {
  phone: string
  name: string
}

export interface AuthCtx {
  user: User | null
  login: (phone: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthCtx>({
  user: null,
  login: () => {},
  logout: () => {},
})
