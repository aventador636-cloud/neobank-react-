import { useState } from 'react'
import { t } from '../styles/tokens'
import { useResponsive } from '../hooks/useResponsive'

interface HeaderProps { onCta: () => void; onLogin: () => void }

export default function Header({ onCta, onLogin }: HeaderProps) {
  const { isMobile } = useResponsive()
  const [active, setActive] = useState<'login' | 'open'>('login')

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(8,9,10,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        padding: isMobile ? '0 20px' : '0 40px',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        <span className="shimmer" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
          NeoBank
        </span>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32 }}>
            {[
              { label: 'Карты',   href: '#cards' },
              { label: 'О банке', href: '#faq'   },
            ].map(item => (
              <a key={item.label} href={item.href}
                style={{ fontSize: 14, fontWeight: 500, color: t.textSecondary, transition: t.ease }}
                onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
                onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Segmented pill */}
        <div style={{
          display: 'flex', alignItems: 'center', flexShrink: 0,
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${t.border}`,
          borderRadius: t.r999, padding: 3, gap: 2,
        }}>
          {([
            { id: 'login' as const, label: 'Войти',        mobileLabel: 'Войти',  action: onLogin },
            { id: 'open'  as const, label: 'Открыть счёт', mobileLabel: 'Счёт',   action: onCta  },
          ]).map(seg => {
            const isActive = active === seg.id
            return (
              <button
                key={seg.id}
                onClick={() => { setActive(seg.id); seg.action() }}
                style={{
                  height: 34, padding: '0 16px',
                  borderRadius: t.r999, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700,
                  transition: 'all 0.22s ease',
                  background: isActive ? 'linear-gradient(90deg, #a78bfa, #60a5fa)' : 'transparent',
                  color: isActive ? '#fff' : t.textSecondary,
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 12px rgba(167,139,250,0.35)' : 'none',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = t.textPrimary }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = t.textSecondary }}
              >
                {isMobile ? seg.mobileLabel : seg.label}
              </button>
            )
          })}
        </div>

      </div>
    </header>
  )
}
