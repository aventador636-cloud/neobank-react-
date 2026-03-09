import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  phone: string | null
  name: string | null
  email: string | null
  created_at: string
}

export type Card = {
  id: string
  user_id: string
  product_id: 'standard' | 'premium' | 'diners'
  holder: string | null
  status: 'active' | 'blocked' | 'pending'
  created_at: string
}

export type Transaction = {
  id: string
  user_id: string
  card_id: string | null
  name: string
  category: string | null
  amount: number
  icon: string | null
  created_at: string
}

export type Service = {
  id: string
  name: string
  price: number | null
  price_rub: number | null
  group: 'ai' | 'video' | 'music' | 'games' | null
  icon: string | null
  tag: string | null
  created_at: string
}

export type UserService = {
  id: string
  user_id: string
  service_id: string
  subscribed_at: string
}
