import { useState } from 'react'
import { t } from '../styles/tokens'
import { useAuth } from '../context/AuthContext'
import { useResponsive } from '../hooks/useResponsive'

interface AuthModalProps {
  onClose: () => void
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  let result = '+7'
  if (digits.length > 1) result += ' ' + digits.slice(1, 4)
  if (digits.length > 4) result += ' ' + digits.slice(4, 7)
  if (digits.length > 7) result += ' ' + digits.slice(7, 9)
  if (digits.length > 9) result += ' ' + digits.slice(9, 11)
  return result
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { login } = useAuth()
  const { isMobile } = useResponsive()
  const [phone, setPhone] = useState('')

  const phoneDigits = phone.replace(/\D/g, '')
  const phoneReady = phoneDigits.length === 11

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, ''))
  }

  const handleLogin = () => {
    if (!phoneReady) return
    login(formatPhone(phone))
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      <div style={{
        width: isMobile ? '92vw' : 400, background: t.surface,
        border: `1px solid ${t.border}`, borderRadius: t.r24,
        padding: isMobile ? '32px 24px' : '40px 36px', position: 'relative',
        animation: 'modalSlide 0.25s ease',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
      }}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', cursor: 'pointer',
          color: t.textTertiary, fontSize: 22, lineHeight: 1, padding: 4,
          transition: t.ease,
        }}
          onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
          onMouseLeave={e => (e.currentTarget.style.color = t.textTertiary)}
        >×</button>

        {/* Logo */}
        <div style={{ marginBottom: 28 }}>
          <span className="shimmer" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>NeoBank</span>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, marginBottom: 8 }}>Войти в кабинет</h2>
        <p style={{ fontSize: 14, color: t.textSecondary, marginBottom: 28 }}>Введите номер телефона для входа</p>

        <label style={{ fontSize: 12, fontWeight: 600, color: t.textTertiary, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Номер телефона
        </label>
        <input
          autoFocus
          type="tel"
          value={formatPhone(phone)}
          onChange={handlePhoneChange}
          onKeyDown={e => e.key === 'Enter' && phoneReady && handleLogin()}
          placeholder="+7 999 999 99 99"
          style={{
            width: '100%', boxSizing: 'border-box',
            background: t.bg, border: `1px solid ${t.border}`,
            borderRadius: t.r12, padding: '14px 16px',
            color: t.textPrimary, fontSize: 18, fontFamily: 'monospace',
            outline: 'none', transition: t.ease, letterSpacing: '0.05em',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)')}
          onBlur={e => (e.currentTarget.style.borderColor = t.border)}
        />

        <button
          onClick={handleLogin}
          disabled={!phoneReady}
          style={{
            width: '100%', marginTop: 16, height: 52, borderRadius: t.r12,
            border: 'none', cursor: phoneReady ? 'pointer' : 'not-allowed',
            background: phoneReady
              ? 'linear-gradient(90deg, #a78bfa, #60a5fa)'
              : t.surfaceHover,
            color: t.textPrimary, fontSize: 15, fontWeight: 700,
            transition: t.ease, opacity: phoneReady ? 1 : 0.5,
          }}
        >
          Войти
        </button>

        <p style={{ fontSize: 12, color: t.textTertiary, marginTop: 16, textAlign: 'center' }}>
          Нет аккаунта? Он будет создан автоматически
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalSlide { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  )
}
