import { useEffect, useState } from 'react'
import { t } from '../styles/tokens'
import { Btn } from './Layout'
import type { CardType } from '../data/cards'

interface ModalProps { open: boolean; cardType: CardType; onClose: () => void }

export default function Modal({ open, cardType, onClose }: ModalProps) {
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) setTimeout(() => setSuccess(false), 300)
  }, [open])

  if (!open) return null

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: t.r16,
    background: t.surface, border: `1px solid ${t.border}`,
    color: t.textPrimary, fontSize: 15, outline: 'none',
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 460, borderRadius: t.r24, padding: 40, position: 'relative',
        background: '#131416', border: `1px solid ${t.border}`,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, width: 32, height: 32,
          borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: t.surface, color: t.textTertiary, fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        {!success ? <>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textTertiary, marginBottom: 8 }}>
            {cardType === 'premium' ? 'Премиум карта' : 'Стандартная карта'}
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.02em', marginBottom: 6 }}>
            Открыть счёт
          </h2>
          <p style={{ fontSize: 14, color: t.textSecondary, marginBottom: 28 }}>
            Заполните заявку — свяжемся в течение 15 минут
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Имя', type: 'text', placeholder: 'Иван Иванов' },
              { label: 'Телефон', type: 'tel', placeholder: '+7 (___) ___-__-__' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: t.textTertiary, marginBottom: 6, letterSpacing: '0.05em' }}>
                  {f.label}
                </label>
                <input type={f.type} placeholder={f.placeholder} style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = t.purple; e.target.style.background = 'rgba(167,139,250,0.05)' }}
                  onBlur={e => { e.target.style.borderColor = t.border; e.target.style.background = t.surface }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: t.textTertiary, marginBottom: 6, letterSpacing: '0.05em' }}>Тип карты</label>
              <select defaultValue={cardType} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                <option value="standard">Стандартная — бесплатно</option>
                <option value="premium">Премиум — 299 ₽/мес</option>
              </select>
            </div>
          </div>

          <Btn onClick={() => { setSuccess(true); setTimeout(onClose, 2800) }} style={{ width: '100%' }}>
            Отправить заявку
          </Btn>
        </> : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.02em', marginBottom: 8 }}>Заявка принята!</h3>
            <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.65 }}>Менеджер свяжется с вами в течение 15 минут</p>
          </div>
        )}
      </div>
    </div>
  )
}
