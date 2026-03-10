import { t } from '../styles/tokens'
import { Section, Label, Heading, Btn } from './Layout'
import { useResponsive } from '../hooks/useResponsive'

const STEPS = [
  {
    n: '01',
    icon: '🃏',
    title: 'Выберите карту',
    desc: 'Стандартная, Premium или Diners Club — выберите тариф который подходит вашему стилю жизни.',
    accent: '#a78bfa',
  },
  {
    n: '02',
    icon: '✍️',
    title: 'Заполните заявку',
    desc: 'Только паспорт и телефон. Никаких офисов — всё онлайн за 5 минут.',
    accent: '#60a5fa',
  },
  {
    n: '03',
    icon: '🚀',
    title: 'Пользуйтесь сразу',
    desc: 'Виртуальная карта доступна мгновенно. Физическая — курьером в течение 1–3 дней.',
    accent: '#4ade80',
  },
]

interface HowItWorksProps { onCta: () => void }

export default function HowItWorks({ onCta }: HowItWorksProps) {
  const { isMobile, isTablet } = useResponsive()

  return (
    <Section>
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
        <Label>Просто и быстро</Label>
        <Heading size="lg">Три шага до вашей карты</Heading>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? 16 : 24,
        position: 'relative',
        marginBottom: 48,
      }}>
        {/* Connector line — desktop only */}
        {!isMobile && !isTablet && (
          <div style={{
            position: 'absolute',
            top: 36, left: '16%', right: '16%',
            height: 1,
            background: 'linear-gradient(90deg, rgba(167,139,250,0.3), rgba(96,165,250,0.3), rgba(74,222,128,0.3))',
            pointerEvents: 'none', zIndex: 0,
          }} />
        )}

        {STEPS.map((step, i) => (
          <div key={step.n} className="how-card" style={{
            position: 'relative', zIndex: 1,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid rgba(255,255,255,0.07)`,
            borderRadius: 24,
            padding: isMobile ? '24px 20px' : '32px 28px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isMobile ? 'flex-start' : 'flex-start',
            gap: isMobile ? 16 : 20,
            animation: `howFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s both`,
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
          }}>
            {/* Number badge */}
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              background: `${step.accent}18`,
              border: `1px solid ${step.accent}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <span style={{ fontSize: 20 }}>{step.icon}</span>
              <div style={{
                position: 'absolute', top: -8, right: -8,
                width: 20, height: 20, borderRadius: '50%',
                background: step.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 800, color: '#000',
              }}>{step.n}</div>
            </div>

            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                {step.title}
              </div>
              <div style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.65 }}>
                {step.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Btn onClick={onCta}>Начать прямо сейчас</Btn>
      </div>

      <style>{`
        @keyframes howFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .how-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.3);
        }
      `}</style>
    </Section>
  )
}
