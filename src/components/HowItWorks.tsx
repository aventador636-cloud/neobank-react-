import { CreditCard, ScanLine, Zap } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Label, Heading, Btn } from './Layout'
import { useResponsive } from '../hooks/useResponsive'
import type { ReactNode } from 'react'

const STEPS: {
  n: string
  icon: ReactNode
  iconClass: string
  title: string
  desc: string
  accent: string
}[] = [
  {
    n: '01',
    icon: <CreditCard size={26} strokeWidth={1.5} color="#a78bfa" />,
    iconClass: 'how-icon-card',
    title: 'Выберите карту',
    desc: 'Стандартная, Premium или Diners Club — выберите тариф который подходит вашему стилю жизни.',
    accent: '#a78bfa',
  },
  {
    n: '02',
    icon: <ScanLine size={26} strokeWidth={1.5} color="#60a5fa" />,
    iconClass: 'how-icon-scan',
    title: 'Заполните заявку',
    desc: 'Только паспорт и телефон. Никаких офисов — всё онлайн за 5 минут.',
    accent: '#60a5fa',
  },
  {
    n: '03',
    icon: <Zap size={26} strokeWidth={1.5} color="#4ade80" />,
    iconClass: 'how-icon-zap',
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
        marginBottom: 48,
      }}>
        {STEPS.map((step, i) => (
          <div key={step.n} className="how-card" style={{
            position: 'relative', overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid rgba(255,255,255,0.07)`,
            borderRadius: 24,
            padding: isMobile ? '24px 20px' : '32px 28px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            alignItems: 'flex-start',
            gap: isMobile ? 16 : 20,
            animation: `howFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s both`,
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
          }}>
            {/* Top glow */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse at 50% -10%, ${step.accent}10 0%, transparent 60%)`,
            }} />

            {/* Icon container */}
            <div style={{
              position: 'relative', flexShrink: 0,
              width: 52, height: 52, borderRadius: 16,
              background: `${step.accent}14`,
              border: `1px solid ${step.accent}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div className={step.iconClass}>{step.icon}</div>

              {/* Number badge */}
              <div style={{
                position: 'absolute', top: -8, right: -8,
                width: 20, height: 20, borderRadius: '50%',
                background: step.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 800, color: '#000', letterSpacing: '-0.02em',
              }}>{step.n}</div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
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

        /* CreditCard — плавает вверх-вниз с лёгким наклоном */
        .how-icon-card {
          animation: iconCardFloat 3s ease-in-out infinite;
          display: inline-flex;
        }
        @keyframes iconCardFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-5px) rotate(2deg); }
        }

        /* ScanLine — луч сканирует снизу вверх */
        .how-icon-scan {
          animation: iconScanPulse 2s ease-in-out infinite;
          display: inline-flex;
        }
        @keyframes iconScanPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          40%       { transform: translateY(-3px); opacity: 0.6; }
          60%       { transform: translateY(3px); opacity: 0.6; }
        }

        /* Zap — вспышка с scale */
        .how-icon-zap {
          animation: iconZapFlash 2.2s ease-in-out infinite;
          display: inline-flex;
        }
        @keyframes iconZapFlash {
          0%, 80%, 100% { transform: scale(1);    opacity: 1; }
          88%            { transform: scale(1.3);  opacity: 0.7; filter: brightness(1.6); }
          94%            { transform: scale(0.92); opacity: 1; }
        }
      `}</style>
    </Section>
  )
}
