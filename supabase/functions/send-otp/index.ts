// Supabase Edge Function: send-otp
// Отправляет SMS с кодом через smsc.ru
// Активировать когда будем переходить с мок-авторизации на реальную

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory OTP store (живёт пока функция активна)
const otpStore = new Map<string, { code: string; expiresAt: number }>()

async function sendSms(phone: string, message: string) {
  const params = new URLSearchParams({
    login: Deno.env.get('SMSC_LOGIN') ?? '',
    psw: Deno.env.get('SMSC_PASSWORD') ?? '',
    phones: phone,
    mes: message,
    fmt: '3',
    charset: 'utf-8',
  })
  const res = await fetch(`https://smsc.ru/sys/send.php?${params}`)
  return res.json()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const path = url.pathname.replace('/send-otp', '')

  // POST /send-otp → отправить код
  if (req.method === 'POST' && path === '') {
    const { phone } = await req.json()
    if (!phone) return new Response(JSON.stringify({ error: 'phone required' }), { status: 400, headers: corsHeaders })

    const code = Math.floor(1000 + Math.random() * 9000).toString()
    otpStore.set(phone, { code, expiresAt: Date.now() + 5 * 60 * 1000 })

    await sendSms(phone, `Ваш код NeoBank: ${code}`)

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  // POST /send-otp/verify → проверить код и создать/найти пользователя
  if (req.method === 'POST' && path === '/verify') {
    const { phone, code } = await req.json()
    if (!phone || !code) return new Response(JSON.stringify({ error: 'phone and code required' }), { status: 400, headers: corsHeaders })

    const entry = otpStore.get(phone)
    if (!entry) return new Response(JSON.stringify({ error: 'code not found or expired' }), { status: 400, headers: corsHeaders })
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(phone)
      return new Response(JSON.stringify({ error: 'code expired' }), { status: 400, headers: corsHeaders })
    }
    if (entry.code !== code) return new Response(JSON.stringify({ error: 'invalid code' }), { status: 400, headers: corsHeaders })

    otpStore.delete(phone)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Найти или создать профиль
    const { data: existing } = await supabase
      .from('profiles')
      .select('*')
      .eq('phone', phone)
      .single()

    if (existing) return new Response(JSON.stringify(existing), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const { data, error } = await supabase
      .from('profiles')
      .insert([{ phone }])
      .select()
      .single()

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders })

    return new Response(JSON.stringify(data), { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  return new Response('Not found', { status: 404, headers: corsHeaders })
})
