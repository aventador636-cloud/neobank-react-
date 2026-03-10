import { t } from '../styles/tokens'
import { useResponsive } from '../hooks/useResponsive'

interface HeaderProps { onCta: () => void; onLogin: () => void }

export default function Header({ onCta, onLogin }: HeaderProps) {
  const { isMobile } = useResponsive()

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

        {/* Two separate buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onLogin} style={{
            height: 36, padding: '0 16px',
            borderRadius: t.r999,
            border: `1px solid ${t.border}`,
            background: 'transparent',
            color: t.textSecondary,
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: t.ease, whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHover; e.currentTarget.style.color = t.textPrimary }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSecondary }}
          >
            Войти
          </button>

          <button onClick={onCta} style={{
            height: 36, padding: '0 18px',
            borderRadius: t.r999, border: 'none',
            background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
            color: '#fff',
            fontSize: 13, fontWeight: 700,
            cursor: 'pointer', transition: t.ease, whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {isMobile ? 'Счёт' : 'Открыть счёт'}
          </button>
        </div>

      </div>
    </header>
  )
}
