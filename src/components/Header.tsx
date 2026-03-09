import { t } from '../styles/tokens'
import { Btn } from './Layout'
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
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <span className="shimmer" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
          NeoBank
        </span>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32 }}>
            {['Карты', 'Кредиты', 'Вклады', 'О банке'].map(item => (
              <a key={item} href="#" style={{ fontSize: 14, fontWeight: 500, color: t.textSecondary, transition: t.ease }}
                onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
                onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}>
                {item}
              </a>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Btn variant="ghost" onClick={onLogin} style={{ height: 40, fontSize: 14 }}>Войти</Btn>
          <Btn onClick={onCta} style={{ height: 40, fontSize: 14 }}>{isMobile ? 'Счёт' : 'Открыть счёт'}</Btn>
        </div>

      </div>
    </header>
  )
}
