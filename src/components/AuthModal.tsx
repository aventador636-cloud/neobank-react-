import { useState, useRef, useEffect } from 'react'
import { t } from '../styles/tokens'
import { useAuth } from '../context/useAuth'
import { useResponsive } from '../hooks/useResponsive'

interface AuthModalProps {
  onClose: () => void
}

type Step = 'phone' | 'otp'

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
  const { isMobile, isSmallMobile } = useResponsive()
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const otpRef0 = useRef<HTMLInputElement>(null)
  const otpRef1 = useRef<HTMLInputElement>(null)
  const otpRef2 = useRef<HTMLInputElement>(null)
  const otpRef3 = useRef<HTMLInputElement>(null)
  const otpRefs = [otpRef0, otpRef1, otpRef2, otpRef3]

  useEffect(() => {
    if (step !== 'otp') return
    const id = window.setTimeout(() => otpRef0.current?.focus(), 100)
    return () => window.clearTimeout(id)
  }, [step])

  const phoneDigits = phone.replace(/\D/g, '')
  const phoneReady = phoneDigits.length === 11

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const digits = raw.replace(/\D/g, '')
    setPhone(digits)
    setError('')
  }

  const handleSendCode = async () => {
    if (!phoneReady) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setStep('otp')
  }

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const arr = otp.split('')
    arr[idx] = val
    const next = arr.join('')
    setOtp(next)
    setError('')
    if (val && idx < 3) otpRefs[idx + 1].current?.focus()
    if (next.length === 4) verifyOtp(next)
  }

  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!digits) return
    setOtp(digits)
    setError('')
    const focusIdx = Math.min(digits.length, 3)
    otpRefs[focusIdx].current?.focus()
    if (digits.length === 4) verifyOtp(digits)
  }

  const [verifying, setVerifying] = useState(false)

  const verifyOtp = async (code: string) => {
    setVerifying(true)
    await new Promise(r => setTimeout(r, 1500))
    setVerifying(false)
    if (code === '1234') {
      login(formatPhone(phone))
      onClose()
    } else {
      setError('Неверный код. Попробуйте 1234')
      setOtp('')
      otpRef0.current?.focus()
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      <div style={{
        width: isMobile ? '100%' : 400, maxWidth: 400, background: t.surface,
        border: `1px solid ${t.border}`, borderRadius: isMobile ? '24px 24px 0 0' : t.r24,
        padding: isMobile ? (isSmallMobile ? '24px 16px' : '28px 20px') : '40px 36px', position: 'relative',
        maxHeight: isMobile ? '90vh' : 'none', overflowY: 'auto',
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

        {step === 'phone' ? (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, marginBottom: 8 }}>Войти в кабинет</h2>
            <p style={{ fontSize: 14, color: t.textSecondary, marginBottom: 28 }}>Введите номер телефона — мы отправим код подтверждения</p>

            <label style={{ fontSize: 12, fontWeight: 600, color: t.textTertiary, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Номер телефона
            </label>
            <input
              autoFocus
              type="tel"
              value={formatPhone(phone)}
              onChange={handlePhoneChange}
              onKeyDown={e => e.key === 'Enter' && phoneReady && handleSendCode()}
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
              onClick={handleSendCode}
              disabled={!phoneReady || loading}
              style={{
                width: '100%', marginTop: 16, height: 52, borderRadius: t.r12,
                border: 'none', cursor: phoneReady && !loading ? 'pointer' : 'not-allowed',
                background: phoneReady && !loading
                  ? 'linear-gradient(90deg, #a78bfa, #60a5fa)'
                  : t.surfaceHover,
                color: t.textPrimary, fontSize: 15, fontWeight: 700,
                transition: t.ease, opacity: phoneReady ? 1 : 0.5,
              }}
            >
              {loading ? 'Отправка...' : 'Получить код'}
            </button>

            <p style={{ fontSize: 12, color: t.textTertiary, marginTop: 16, textAlign: 'center' }}>
              Нет аккаунта? Код подтверждения создаст его автоматически
            </p>
          </>
        ) : (
          <>
            <button onClick={() => { setStep('phone'); setOtp(''); setError('') }} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: t.textSecondary, fontSize: 13, padding: 0, marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 6, transition: t.ease,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
              onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}
            >
              ← Изменить номер
            </button>

            <h2 style={{ fontSize: 24, fontWeight: 700, color: t.textPrimary, marginBottom: 8 }}>Введите код</h2>
            <p style={{ fontSize: 14, color: t.textSecondary, marginBottom: 28 }}>
              Код отправлен на <span style={{ color: t.textPrimary, fontWeight: 600 }}>{formatPhone(phone)}</span>
            </p>

            {/* OTP inputs / spinner */}
            {verifying ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 16, padding: '8px 0' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  border: '3px solid rgba(167,139,250,0.15)',
                  borderTopColor: '#a78bfa',
                  animation: 'otpSpin 0.8s linear infinite',
                }} />
                <p style={{ fontSize: 14, color: t.textSecondary, fontWeight: 500 }}>Проверка кода...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: isSmallMobile ? 8 : 12, justifyContent: 'center', marginBottom: 16 }}>
                {[0, 1, 2, 3].map(i => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i] || ''}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKey(i, e)}
                    onPaste={handleOtpPaste}
                    style={{
                      width: isSmallMobile ? 52 : 64, height: isSmallMobile ? 52 : 64, textAlign: 'center',
                      fontSize: isSmallMobile ? 20 : 24, fontWeight: 700, fontFamily: 'monospace',
                      background: t.bg, border: `1px solid ${error ? '#f87171' : otp[i] ? 'rgba(167,139,250,0.5)' : t.border}`,
                      borderRadius: t.r12, color: t.textPrimary, outline: 'none',
                      transition: t.ease,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = error ? '#f87171' : 'rgba(167,139,250,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = error ? '#f87171' : otp[i] ? 'rgba(167,139,250,0.3)' : t.border)}
                  />
                ))}
              </div>
            )}

            {!verifying && error && (
              <p style={{ fontSize: 13, color: '#f87171', textAlign: 'center', marginBottom: 12 }}>{error}</p>
            )}

            <p style={{ fontSize: 12, color: t.textTertiary, textAlign: 'center', marginTop: 8 }}>
              Не пришёл код?{' '}
              <button onClick={() => { setOtp(''); setError('') }} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: t.purple, fontSize: 12, padding: 0,
              }}>
                Отправить повторно
              </button>
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalSlide { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes otpSpin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
}
