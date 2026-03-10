import { t } from '../styles/tokens'
import { Container, Btn } from './Layout'
import Card3D from './Card3D'
import { cards } from '../data/cards'
import { useResponsive } from '../hooks/useResponsive'

interface HeroProps { onCta: () => void }


export default function Hero({ onCta }: HeroProps) {
  const { isMobile, isTablet } = useResponsive()
  const premiumCard = cards.find(c => c.id === 'premium')!

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 700, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.12) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? 48 : isTablet ? 56 : 80,
          alignItems: 'center',
          paddingTop: isMobile ? 48 : 80,
          paddingBottom: isMobile ? 48 : 80,
        }}>

          {/* ── Left: text ── */}
          <div>
            <h1 className="shimmer" style={{
              fontSize: isMobile ? 44 : isTablet ? 56 : 72,
              fontWeight: 900, lineHeight: 1.0,
              letterSpacing: '-0.04em',
              marginBottom: 20,
            }}>
              Банк нового<br />поколения
            </h1>

            <p style={{
              fontSize: isMobile ? 16 : 18,
              lineHeight: 1.65, color: t.textSecondary,
              maxWidth: 440, marginBottom: 36,
            }}>
              Управляйте деньгами там, где удобно — переводы, кэшбэк и аналитика в одном приложении.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
              <Btn onClick={onCta}>Открыть счёт бесплатно</Btn>
              <Btn variant="ghost" href="#cards">Смотреть карты</Btn>
            </div>

          </div>

          {/* ── Right: card ── */}
          {!isMobile && (
            <div style={{
              display: 'flex', justifyContent: isTablet ? 'center' : 'flex-end',
              position: 'relative',
            }}>
              {/* Glow behind card */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400, height: 300, pointerEvents: 'none',
                background: 'radial-gradient(ellipse, rgba(167,139,250,0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }} />
              <div style={{ width: isTablet ? 360 : 420, position: 'relative' }}>
                <Card3D card={premiumCard} />
              </div>
            </div>
          )}

        </div>
      </Container>

      {/* Bottom fade */}
      <div style={{
        height: 80,
        background: `linear-gradient(to bottom, transparent, ${t.bg})`,
        marginTop: -80, position: 'relative', zIndex: 2, pointerEvents: 'none',
      }} />
    </div>
  )
}
