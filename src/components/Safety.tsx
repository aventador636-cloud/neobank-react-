import { ShieldCheck, Zap, Lock, Eye } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Heading } from './Layout'
import { useResponsive } from '../hooks/useResponsive'

const items = [
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} color="#a78bfa" />,
    iconAnim: 'safetyPulse 2.5s ease-in-out infinite',
    stat: '1.4 млн ₽',
    title: 'Страхование вкладов',
    desc: 'Средства застрахованы государством через АСВ',
    iconBg: 'rgba(167,139,250,0.12)',
    glow: 'rgba(167,139,250,0.10)',
    border: 'rgba(167,139,250,0.18)',
    delay: '0s',
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} color="#60a5fa" />,
    iconAnim: 'safetyZap 1.8s ease-in-out infinite',
    stat: '< 1 сек',
    title: 'Мгновенная блокировка',
    desc: 'Заморозьте карту в приложении одним касанием',
    iconBg: 'rgba(96,165,250,0.12)',
    glow: 'rgba(96,165,250,0.10)',
    border: 'rgba(96,165,250,0.18)',
    delay: '0.1s',
  },
  {
    icon: <Eye size={28} strokeWidth={1.5} color="#4ade80" />,
    iconAnim: 'safetyScan 3s ease-in-out infinite',
    stat: '24 / 7',
    title: 'Мониторинг транзакций',
    desc: 'Каждый платёж проверяется системой в реальном времени',
    iconBg: 'rgba(74,222,128,0.12)',
    glow: 'rgba(74,222,128,0.10)',
    border: 'rgba(74,222,128,0.18)',
    delay: '0.2s',
  },
  {
    icon: <Lock size={28} strokeWidth={1.5} color="#f59e0b" />,
    iconAnim: 'safetyPulse 2.8s ease-in-out infinite',
    stat: '3D Secure',
    title: 'Защита платежей',
    desc: 'Международный стандарт безопасности VISA и Mastercard',
    iconBg: 'rgba(245,158,11,0.12)',
    glow: 'rgba(245,158,11,0.10)',
    border: 'rgba(245,158,11,0.18)',
    delay: '0.3s',
  },
]

export default function Safety() {
  const { isMobile, isTablet } = useResponsive()

  return (
    <Section>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Heading size="lg">Защищено. Застраховано. Проверено.</Heading>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: 16,
      }}>
        {items.map(item => (
          <div key={item.title} className="safety-card" style={{
            position: 'relative', overflow: 'hidden',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${item.border}`,
            borderRadius: t.r24,
            padding: '32px 24px',
            display: 'flex', flexDirection: 'column', gap: 20,
            animation: `safetyFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${item.delay} both`,
          }}>
            {/* Top glow */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse at 50% -10%, ${item.glow} 0%, transparent 65%)`,
            }} />

            {/* Icon */}
            <div style={{
              position: 'relative', zIndex: 1,
              width: 56, height: 56, borderRadius: t.r16,
              background: item.iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ animation: item.iconAnim }}>
                {item.icon}
              </div>
            </div>

            {/* Stat */}
            <div className="shimmer" style={{
              position: 'relative', zIndex: 1,
              fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              {item.stat}
            </div>

            {/* Text */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes safetyFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes safetyPulse {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.18); opacity: 0.85; }
        }
        @keyframes safetyZap {
          0%, 80%, 100% { transform: scale(1);    opacity: 1; }
          88%            { transform: scale(1.25); opacity: 0.7; }
          94%            { transform: scale(0.92); opacity: 1; }
        }
        @keyframes safetyScan {
          0%, 100% { transform: translateY(0px); }
          40%       { transform: translateY(-4px); }
          60%       { transform: translateY(4px); }
        }
        .safety-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .safety-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.3);
        }
      `}</style>
    </Section>
  )
}
