import { t } from '../styles/tokens'
import { Container, Btn } from './Layout'
import { useResponsive } from '../hooks/useResponsive'

interface CtaSectionProps { onCta: () => void }

export default function CtaSection({ onCta }: CtaSectionProps) {
  const { isMobile, isTablet } = useResponsive()

  return (
    <section style={{ padding: isMobile ? '64px 0' : '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.10) 0%, transparent 65%)',
      }} />
      {/* Top line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.25), rgba(96,165,250,0.25), transparent)',
        pointerEvents: 'none',
      }} />
      {/* Bottom line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.10), transparent)',
        pointerEvents: 'none',
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '48px 24px' : '72px 48px',
          borderRadius: 32,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(167,139,250,0.12)',
          backdropFilter: 'blur(16px)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Inner glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.08) 0%, transparent 60%)',
          }} />

          <p className="shimmer" style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            Начните сегодня
          </p>

          <h2 className="shimmer" style={{
            fontSize: isMobile ? 36 : isTablet ? 48 : 64,
            fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: 20,
          }}>
            Откройте счёт<br />за 5 минут
          </h2>

          <p style={{
            fontSize: 17, lineHeight: 1.65, color: t.textSecondary,
            maxWidth: 440, margin: '0 auto 40px',
          }}>
            Никаких очередей и документов. Только телефон — и карта уже в вашем кармане.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Btn onClick={onCta}>Открыть счёт бесплатно</Btn>
            <Btn variant="ghost" href="#cards">Сравнить карты</Btn>
          </div>
        </div>
      </Container>
    </section>
  )
}
