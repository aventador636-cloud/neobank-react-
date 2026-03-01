import { Users, Percent, BadgeDollarSign } from 'lucide-react'
import { t } from '../styles/tokens'
import { Container, Btn } from './Layout'
import BrandAnimation from './BrandAnimation'

interface HeroProps { onCta: () => void }

export default function Hero({ onCta }: HeroProps) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: 0 }}>

      {/* Ambient glow behind animation */}
      <div style={{
        position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 700, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.14) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Brand animation — самый верх ── */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
          <BrandAnimation />
        </div>

        {/* ── Headline ── */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontSize: 18, lineHeight: 1.7, color: t.textSecondary,
            marginBottom: 40, maxWidth: 480, margin: '0 auto 40px',
          }}>
            Кэшбэк до 5%, бесплатное обслуживание и полный контроль через приложение. Без скрытых комиссий.
          </p>

          {/* ── CTAs ── */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 64 }}>
            <Btn onClick={onCta}>Открыть счёт бесплатно</Btn>
            <Btn variant="ghost" href="#cards">Сравнить карты</Btn>
          </div>

          {/* ── Trust bar ── */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 48,
            paddingTop: 40, paddingBottom: 64,
            borderTop: `1px solid ${t.border}`,
          }}>
            {[
              { icon: <Users size={15} strokeWidth={1.75} color={t.textTertiary} />, val: '1М+', desc: 'клиентов' },
              { icon: <Percent size={15} strokeWidth={1.75} color={t.textTertiary} />, val: '5%', desc: 'кэшбэк' },
              { icon: <BadgeDollarSign size={15} strokeWidth={1.75} color={t.textTertiary} />, val: '0₽', desc: 'обслуживание' },
            ].map(s => (
              <div key={s.val} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {s.icon}
                <div>
                  <div className="shimmer" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 2 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>

      {/* Bottom fade into next section */}
      <div style={{
        height: 80,
        background: `linear-gradient(to bottom, transparent, ${t.bg})`,
        marginTop: -80, position: 'relative', zIndex: 2, pointerEvents: 'none',
      }} />
    </div>
  )
}
