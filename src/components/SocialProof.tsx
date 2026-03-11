import { t } from '../styles/tokens'
import { Section, Label, Heading } from './Layout'
import { useResponsive } from '../hooks/useResponsive'

const REVIEWS = [
  {
    name: 'Алексей М.',
    role: 'Предприниматель',
    initials: 'АМ',
    color: '#a78bfa',
    rating: 5,
    text: 'Перевёл бизнес на NeoBank — никаких скрытых комиссий, кэшбэк реально начисляется. Поддержка отвечает за 2 минуты.',
  },
  {
    name: 'Мария К.',
    role: 'Фрилансер',
    initials: 'МК',
    color: '#60a5fa',
    rating: 5,
    text: 'Оформила карту за 4 минуты прямо с телефона. Всё интуитивно, дизайн приложения — лучший среди банков.',
  },
  {
    name: 'Дмитрий В.',
    role: 'Путешественник',
    initials: 'ДВ',
    color: '#4ade80',
    rating: 5,
    text: 'Mastercard Black открыл доступ к VIP-залам в 12 аэропортах за последние полгода. Карта окупила себя за первый месяц.',
  },
]

const STATS = [
  { val: '4.9', label: 'App Store', sub: '18 000+ отзывов' },
  { val: '4.8', label: 'Google Play', sub: '12 000+ отзывов' },
  { val: '1М+', label: 'Клиентов', sub: 'по всей России' },
]

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: 13 }}>★</span>
      ))}
    </div>
  )
}

export default function SocialProof() {
  const { isMobile, isTablet } = useResponsive()

  return (
    <Section>
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
        <Label>Отзывы</Label>
        <Heading size="lg">Нам доверяют люди</Heading>
      </div>

      {/* Store ratings */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: 12, marginBottom: 48,
      }}>
        {STATS.map(s => (
          <div key={s.label} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 20px', borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{s.val}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{s.label}</div>
              <div style={{ fontSize: 11, color: t.textTertiary }}>{s.sub}</div>
            </div>
            <div style={{ display: 'flex', gap: 1 }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#f59e0b', fontSize: 11 }}>★</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Review cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
        gap: 16,
      }}>
        {REVIEWS.map((r, i) => (
          <div key={r.name} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24, padding: '28px 24px',
            display: 'flex', flexDirection: 'column', gap: 16,
            animation: `reviewFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both`,
          }}>
            <Stars n={r.rating} />

            <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.7, flex: 1 }}>
              «{r.text}»
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: `${r.color}22`, border: `1px solid ${r.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: r.color,
              }}>{r.initials}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{r.name}</div>
                <div style={{ fontSize: 12, color: t.textTertiary }}>{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes reviewFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Section>
  )
}
