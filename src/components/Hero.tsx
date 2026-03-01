import { Users, Percent, BadgeDollarSign, Globe } from 'lucide-react'
import { t } from '../styles/tokens'
import { Container, Btn } from './Layout'
import BrandAnimation from './BrandAnimation'
import { useResponsive } from '../hooks/useResponsive'

interface HeroProps { onCta: () => void }

export default function Hero({ onCta }: HeroProps) {
  const { isMobile, isTablet } = useResponsive()
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
          <BrandAnimation size={isMobile ? 280 : isTablet ? 360 : 480} />
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 64 }}>
            <Btn onClick={onCta}>Открыть счёт бесплатно</Btn>
            <Btn variant="ghost" href="#cards">Сравнить карты</Btn>
          </div>

          {/* ── Trust bar ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 12,
            paddingTop: 40, paddingBottom: 64,
          }}>
            {[
              { icon: <Users size={20} strokeWidth={1.5} color="#a78bfa" />, val: '1М+', desc: 'довольных клиентов', stripe: 'trust-stripe-purple', glow: 'rgba(167,139,250,0.06)', iconBg: 'rgba(167,139,250,0.1)', iconBorder: 'rgba(167,139,250,0.15)', delay: '0s' },
              { icon: <Percent size={20} strokeWidth={1.5} color="#60a5fa" />, val: '5%', desc: 'кэшбэк на покупки', stripe: 'trust-stripe-blue', glow: 'rgba(96,165,250,0.06)', iconBg: 'rgba(96,165,250,0.1)', iconBorder: 'rgba(96,165,250,0.15)', delay: '0.1s' },
              { icon: <BadgeDollarSign size={20} strokeWidth={1.5} color="#4ade80" />, val: '0₽', desc: 'обслуживание навсегда', stripe: 'trust-stripe-green', glow: 'rgba(74,222,128,0.06)', iconBg: 'rgba(74,222,128,0.1)', iconBorder: 'rgba(74,222,128,0.15)', delay: '0.2s' },
            ].map(s => (
              <div key={s.val} style={{
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                padding: '32px 20px', borderRadius: t.r24,
                background: '#0d0e11',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
                animation: `trustFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${s.delay} both`,
              }}>
                {/* Animated top stripe */}
                <div className={s.stripe} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: `${t.r24} ${t.r24} 0 0` }} />
                {/* Radial glow */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 0%, ${s.glow} 0%, transparent 65%)` }} />

                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 44, height: 44, borderRadius: t.r12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: s.iconBg, border: `1px solid ${s.iconBorder}`,
                }}>
                  {s.icon}
                </div>
                <div className="shimmer" style={{ position: 'relative', zIndex: 1, fontSize: 44, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ position: 'relative', zIndex: 1, fontSize: 14, color: t.textSecondary, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          {/* ── Announcement card ── */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
            padding: isMobile ? '20px 24px' : '24px 32px',
            borderRadius: t.r24, marginBottom: 64,
            background: '#0d0e11',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
            animation: 'trustFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both',
          }}>
            {/* Animated stripe */}
            <div className="trust-stripe-purple" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: `${t.r24} ${t.r24} 0 0` }} />
            {/* Glow */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 10% 50%, rgba(167,139,250,0.07) 0%, transparent 55%)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 48, height: 48, borderRadius: t.r12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)',
              }}>
                <Globe size={22} strokeWidth={1.5} color="#a78bfa" style={{ animation: 'globeSpin 6s linear infinite' }} />
              </div>
              <div>
                <div className="shimmer" style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Переводы за рубеж
                </div>
                <div className="shimmer" style={{ fontSize: 13, marginTop: 2, opacity: 0.6 }}>
                  Отправляйте деньги в любую точку мира мгновенно
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
              <button style={{
                padding: '10px 20px', borderRadius: t.r12, border: '1px solid rgba(167,139,250,0.25)',
                background: 'rgba(167,139,250,0.08)', color: '#a78bfa',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(167,139,250,0.15)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,139,250,0.4)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(167,139,250,0.08)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,139,250,0.25)' }}
              >
                <span className="shimmer">Узнать первым</span>
              </button>
            </div>
          </div>

          <style>{`
            @keyframes globeSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
          `}</style>

          <style>{`
            @keyframes trustFadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .trust-stripe-purple {
              background: linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #a78bfa 100%);
              background-size: 200% auto;
              animation: trustStripe 4s linear infinite;
            }
            .trust-stripe-blue {
              background: linear-gradient(90deg, #60a5fa 0%, #818cf8 50%, #60a5fa 100%);
              background-size: 200% auto;
              animation: trustStripe 4s linear infinite;
            }
            .trust-stripe-green {
              background: linear-gradient(90deg, #4ade80 0%, #34d399 50%, #4ade80 100%);
              background-size: 200% auto;
              animation: trustStripe 4s linear infinite;
            }
            @keyframes trustStripe {
              0%   { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
          `}</style>
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
