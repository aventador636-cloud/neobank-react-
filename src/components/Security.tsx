import { ShieldCheck, ScanFace, Zap } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Heading } from './Layout'
import { useResponsive } from '../hooks/useResponsive'

const items = [
  {
    icon: <ShieldCheck size={36} strokeWidth={1.25} color="#4ade80" />,
    iconAnim: 'secIconPulse 2.5s ease-in-out infinite',
    title: 'Защита 24/7',
    desc: 'Мониторинг каждой транзакции в реальном времени. Подозрительный платёж блокируется до завершения.',
    tag: 'Реальное время',
    tagColor: '#4ade80',
    iconBg: 'rgba(74,222,128,0.1)',
    glow: 'rgba(74,222,128,0.08)',
    watermark: '🛡',
    delay: '0s',
  },
  {
    icon: <ScanFace size={36} strokeWidth={1.25} color={t.blue} />,
    iconAnim: 'secIconScan 3s ease-in-out infinite',
    title: 'Сертификация VISA / MC',
    desc: 'Поддержка 3D Secure и международных стандартов безопасности платёжных систем.',
    tag: '3D Secure',
    tagColor: t.blue,
    iconBg: 'rgba(96,165,250,0.1)',
    glow: 'rgba(96,165,250,0.08)',
    watermark: '◈',
    delay: '0.1s',
  },
  {
    icon: <Zap size={36} strokeWidth={1.25} color={t.purple} />,
    iconAnim: 'secIconZap 1.8s ease-in-out infinite',
    title: 'Мгновенная блокировка',
    desc: 'Один клик в приложении — карта заблокирована. Разблокировка — так же быстро.',
    tag: 'В приложении',
    tagColor: t.purple,
    iconBg: 'rgba(167,139,250,0.1)',
    glow: 'rgba(167,139,250,0.08)',
    watermark: '⚡',
    delay: '0.2s',
  },
]

export default function Security() {
  const { isMobile } = useResponsive()

  return (
    <Section>
      <Heading size="lg" style={{ marginBottom: 48 }}>Ваши деньги<br />под защитой</Heading>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
        {items.map(item => (
          <div key={item.title} className="sec-card" style={{
            position: 'relative', overflow: 'hidden',
            padding: isMobile ? 32 : 40, borderRadius: t.r24,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: `0 8px 40px rgba(0,0,0,0.2), 0 0 80px ${item.glow.replace('0.08', '0.05')}`,
            display: 'flex', flexDirection: 'column', gap: 20,
            animation: `secFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${item.delay} both`,
          }}>
            {/* Radial glow */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse at 20% 20%, ${item.glow.replace('0.08', '0.14')} 0%, transparent 65%)`,
            }} />

            {/* Watermark */}
            <div style={{
              position: 'absolute', right: -8, bottom: -16,
              fontSize: 120, lineHeight: 1, opacity: 0.04,
              userSelect: 'none', pointerEvents: 'none',
              filter: 'grayscale(1)',
            }}>
              {item.watermark}
            </div>

            {/* Icon */}
            <div style={{
              position: 'relative', zIndex: 1,
              width: 64, height: 64, borderRadius: t.r16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: item.iconBg,
            }}>
              <div style={{ animation: item.iconAnim }}>
                {item.icon}
              </div>
            </div>

            {/* Text */}
            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h3 className="shimmer" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.7, flex: 1 }}>
                {item.desc}
              </p>
            </div>

            {/* Tag */}
            <span style={{
              position: 'relative', zIndex: 1,
              alignSelf: 'flex-start', padding: '5px 14px', borderRadius: t.r999,
              fontSize: 12, fontWeight: 600,
              color: item.tagColor, background: item.iconBg,
            }}>
              {item.tag}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes secFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sec-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .sec-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.3), 0 0 100px rgba(129,140,248,0.07) !important;
        }

        @keyframes secIconPulse {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.18); opacity: 0.85; }
        }
        @keyframes secIconScan {
          0%, 100% { transform: translateY(0px) scaleY(1); }
          40%       { transform: translateY(-5px) scaleY(1.08); }
          60%       { transform: translateY(5px) scaleY(0.95); }
        }
        @keyframes secIconZap {
          0%, 80%, 100% { transform: scale(1);    opacity: 1; }
          88%            { transform: scale(1.25); opacity: 0.7; }
          94%            { transform: scale(0.92); opacity: 1; }
        }
      `}</style>
    </Section>
  )
}
