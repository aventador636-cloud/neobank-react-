import { useState, useRef, useEffect } from 'react'
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

const TEST_OTP = '1234'

export default function AuthModal({ onClose }: AuthModalProps) {
  const { login } = useAuth()
  const { isMobile } = useResponsive()
  const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => otpRefs[0].current?.focus(), 100)
    }
  }, [step])

  const phoneDigits = phone.replace(/\D/g, '')
  const phoneReady = phoneDigits.length === 11

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, ''))
    setError('')
  }

  const handleSendCode = () => {
    if (!phoneReady) return
    setStep('otp')
  }

  const handleVerify = async (code: string) => {
    if (code.length < 4) return
    setVerifying(true)
    await new Promise(r => setTimeout(r, 800))
    setVerifying(false)
    if (code === TEST_OTP) {
      setStep('name')
    } else {
      setError('Неверный код. Попробуйте ещё раз')
      setOtp('')
      otpRefs[0].current?.focus()
    }
  }

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const arr = otp.split('')
    arr[idx] = val
    const next = arr.join('')
    setOtp(next)
    setError('')
    if (val && idx < 3) otpRefs[idx + 1].current?.focus()
    if (next.length === 4) handleVerify(next)
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
    otpRefs[Math.min(digits.length, 3)].current?.focus()
    if (digits.length === 4) handleVerify(digits)
  }

  const handleBack = () => {
    setStep('phone')
    setOtp('')
    setError('')
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

        {step === 'name' ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                fontSize: 52, marginBottom: 16,
                animation: 'waveOnce 0.6s ease',
                display: 'inline-block', transformOrigin: '70% 80%',
              }}>👋</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: t.textPrimary, marginBottom: 8 }}>
                Добро пожаловать!
              </h2>
              <p style={{ fontSize: 14, color: t.textSecondary }}>
                Как вас зовут? Это нужно для персонализации
              </p>
            </div>

            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && name.trim()) { login(formatPhone(phone), name.trim()); onClose() } }}
              placeholder="Ваше имя"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: t.bg, border: `1px solid ${t.border}`,
                borderRadius: t.r12, padding: '14px 16px',
                color: t.textPrimary, fontSize: 18, fontFamily: t.fontFamily,
                outline: 'none', transition: t.ease, marginBottom: 12,
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)')}
              onBlur={e  => (e.currentTarget.style.borderColor = t.border)}
            />

            <button
              onClick={() => { login(formatPhone(phone), name.trim() || undefined); onClose() }}
              style={{
                width: '100%', height: 52, borderRadius: t.r12, border: 'none',
                background: name.trim()
                  ? 'linear-gradient(90deg, #a78bfa, #60a5fa)'
                  : t.surfaceHover,
                color: t.textPrimary, fontSize: 15, fontWeight: 700,
                cursor: 'pointer', transition: t.ease,
                opacity: name.trim() ? 1 : 0.6,
              }}
            >
              {name.trim() ? `Привет, ${name.trim().split(' ')[0]}! →` : 'Продолжить'}
            </button>

            <button
              onClick={() => { login(formatPhone(phone)); onClose() }}
              style={{
                width: '100%', marginTop: 10, background: 'none', border: 'none',
                color: t.textTertiary, fontSize: 13, cursor: 'pointer',
                padding: '6px 0', transition: t.ease,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = t.textSecondary)}
              onMouseLeave={e => (e.currentTarget.style.color = t.textTertiary)}
            >
              Пропустить
            </button>
          </>
        ) : step === 'phone' ? (
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
              Получить код
            </button>

            <p style={{ fontSize: 12, color: t.textTertiary, marginTop: 16, textAlign: 'center' }}>
              Нет аккаунта? Код подтверждения создаст его автоматически
            </p>
          </>
        ) : (
          <>
            <button onClick={handleBack} style={{
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
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
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
                      width: 64, height: 64, textAlign: 'center',
                      fontSize: 24, fontWeight: 700, fontFamily: 'monospace',
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
        @keyframes waveOnce {
          0%,100% { transform: rotate(0deg); }
          20%      { transform: rotate(20deg); }
          40%      { transform: rotate(-10deg); }
          60%      { transform: rotate(16deg); }
          80%      { transform: rotate(-6deg); }
        }
      `}</style>
    </div>
  )
}
