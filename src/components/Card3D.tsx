import { useRef } from 'react'
import type { CardProduct } from '../data/cards'
import { t } from '../styles/tokens'
import { useResponsive } from '../hooks/useResponsive'

interface Card3DProps { card: CardProduct }

function BrandLogo({ brand, size = 'card' }: { brand: string; size?: 'card' | 'label' }) {
  if (brand === 'VISA') {
    const h = size === 'label' ? 22 : 18
    const w = Math.round(h * 2.8)
    return (
      <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', borderRadius: 2 }}>
        <svg width={w} height={h} viewBox="0 0 78 25" fill="none" style={{ display: 'block' }}>
          <path d="M30.5 1.5 L24 23.5 H18L24.5 1.5 H30.5Z" fill="#1A1F71"/>
          <path d="M52.5 2C51 1.4 48.6 0.8 45.6 0.8C39.7 0.8 35.5 3.8 35.5 8.1C35.5 11.3 38.5 13.1 40.8 14.2C43.1 15.3 43.9 16 43.9 17C43.9 18.5 42 19.1 40.3 19.1C37.9 19.1 36.6 18.7 34.6 17.9L33.8 17.5L33 22.2C34.7 23 37.9 23.6 41.2 23.6C47.5 23.6 51.6 20.6 51.6 16C51.6 13.4 49.9 11.5 46.3 9.9C44.3 8.9 43.1 8.2 43.1 7.1C43.1 6.1 44.2 5.1 46.5 5.1C48.4 5.1 49.8 5.5 50.9 5.9L51.5 6.2L52.5 2Z" fill="#1A1F71"/>
          <path d="M60.5 1.5H55.8C54.4 1.5 53.3 1.9 52.7 3.3L44 23.5H50.3C50.3 23.5 51.3 20.9 51.5 20.3C52.2 20.3 58.3 20.3 59.2 20.3C59.4 21.1 59.9 23.5 59.9 23.5H65.5L60.5 1.5ZM53.3 15.7C53.8 14.4 55.9 8.9 55.9 8.9C55.9 8.9 56.5 7.3 56.8 6.3L57.2 8.7C57.2 8.7 58.5 14.5 58.8 15.7H53.3Z" fill="#1A1F71"/>
          <path d="M14.5 1.5L8.7 16.4L8.1 13.4C7.1 10.2 4 6.7 0.5 4.9L5.8 23.5H12.2L21.5 1.5H14.5Z" fill="#1A1F71"/>
          <path d="M4 1.5H-5.5L-5.6 1.9C1.9 3.7 6.9 7.9 8.1 13.4L6.8 3.3C6.6 2 5.4 1.5 4 1.5Z" fill="#F7A600" transform="translate(5.5, 0)"/>
        </svg>
        <div className="logo-shimmer" />
      </div>
    )
  }

  if (brand === 'Mastercard') {
    const r  = size === 'label' ? 11 : 9
    const cx1 = r + 2
    const cx2 = cx1 + r * 1.3
    const w  = Math.ceil(cx2 + r + 2)
    const h  = Math.ceil(r * 2 + 4)
    const cy = h / 2
    return (
      <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', borderRadius: 2 }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ display: 'block' }}>
          <circle cx={cx1} cy={cy} r={r} fill="#EB001B" />
          <circle cx={cx2} cy={cy} r={r} fill="#F79E1B" />
          {/* overlap lens — простая аппроксимация */}
          <path
            d={`M${(cx1+cx2)/2} ${cy - r * 0.85} A${r} ${r} 0 0 1 ${(cx1+cx2)/2} ${cy + r * 0.85} A${r} ${r} 0 0 1 ${(cx1+cx2)/2} ${cy - r * 0.85}`}
            fill="#FF5F00"
          />
        </svg>
        <div className="logo-shimmer" />
      </div>
    )
  }

  if (brand === 'Diners Club') {
    const s = size === 'label' ? 28 : 22
    return (
      <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', borderRadius: '50%' }}>
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none" style={{ display: 'block' }}>
          <circle cx="14" cy="14" r="12.5" stroke="#d4a853" strokeWidth="1.5" />
          <path d="M14 1.5 A12.5 12.5 0 0 1 14 26.5" fill="rgba(212,168,83,0.15)" />
          <line x1="14" y1="1.5" x2="14" y2="26.5" stroke="#d4a853" strokeWidth="1.5" />
        </svg>
        <div className="logo-shimmer logo-shimmer--gold" />
      </div>
    )
  }

  return <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>{brand}</span>
}

export default function Card3D({ card }: Card3DProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useResponsive()

  const isPremium = card.id === 'premium'
  const isDiners  = card.id === 'diners'

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    if (wrapRef.current) {
      wrapRef.current.style.animation = 'none'
      wrapRef.current.style.transform = `rotateX(${-dy * 12}deg) rotateY(${dx * 16}deg) translateY(-6px)`
    }
    if (glareRef.current) {
      const gx = ((e.clientX - rect.left) / rect.width)  * 100
      const gy = ((e.clientY - rect.top)  / rect.height) * 100
      glareRef.current.style.opacity = '1'
      glareRef.current.style.background =
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
    }
  }

  const onMouseLeave = () => {
    if (wrapRef.current) {
      wrapRef.current.style.animation = 'cardFloat 6s ease-in-out infinite'
      wrapRef.current.style.transform = ''
    }
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <>
      <div style={{ perspective: '1000px', cursor: 'pointer' }} onMouseMove={isMobile ? undefined : onMouseMove} onMouseLeave={isMobile ? undefined : onMouseLeave}>
        <div ref={wrapRef} style={{
          transformStyle: 'preserve-3d',
          animation: isMobile ? 'none' : 'cardFloat 6s ease-in-out infinite',
          transition: isMobile ? 'none' : 'transform 0.1s linear',
          willChange: isMobile ? 'auto' : 'transform',
          position: 'relative',
        }}>

          {/* ── Card body ── */}
          <div style={{
            width: '100%',
            aspectRatio: '1.586',
            borderRadius: 24,
            padding: '28px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            background: isDiners ? '#0f0c08' : isPremium ? '#0e0b16' : '#0b0e17',
            boxShadow: `0 24px 60px rgba(0,0,0,0.6)`,
          }}>


            {/* Glare overlay */}
            <div ref={glareRef} style={{
              position: 'absolute', inset: 0, borderRadius: 24,
              opacity: 0, pointerEvents: 'none', zIndex: 3,
              transition: 'opacity 0.25s',
            }} />

            {/* Background brand mark */}
            <div style={{
              position: 'absolute', right: -20, bottom: -30,
              fontSize: 180, fontWeight: 900, lineHeight: 1,
              letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.025)',
              userSelect: 'none', pointerEvents: 'none', zIndex: 0,
              fontFamily: t.fontFamily,
            }}>N</div>

            {/* Subtle radial glow */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
              background: isDiners
                ? 'radial-gradient(ellipse at 80% 0%, rgba(212,168,83,0.10) 0%, transparent 60%)'
                : isPremium
                ? 'radial-gradient(ellipse at 80% 0%, rgba(167,139,250,0.07) 0%, transparent 60%)'
                : 'radial-gradient(ellipse at 80% 0%, rgba(96,165,250,0.07) 0%, transparent 60%)',
            }} />

            {/* ── Chip ── */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: 40, height: 30, borderRadius: 6,
                background: 'linear-gradient(135deg, #8a7340 0%, #e8cc7a 40%, #c4a84f 60%, #f0d98a 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 1px 4px rgba(0,0,0,0.4)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Chip lines */}
                <div style={{ position: 'absolute', top: '33%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
                <div style={{ position: 'absolute', top: '66%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
                <div style={{ position: 'absolute', left: '33%', top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.15)' }} />
              </div>

              {/* Contactless icon */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, opacity: 0.35 }}>
                {[12, 9, 6].map(w => (
                  <div key={w} style={{
                    height: 1.5, width: w, borderRadius: 1,
                    background: '#fff', alignSelf: 'flex-end',
                  }} />
                ))}
              </div>
            </div>

            {/* ── Card number ── */}
            <div style={{
              position: 'relative', zIndex: 1,
              fontFamily: `'SF Mono', 'Fira Code', monospace`,
              fontSize: 15, letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}>
              {card.number}
            </div>

            {/* ── Bottom row ── */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Card holder
                </div>
                <div className={isDiners ? 'card-name-diners' : isPremium ? 'card-name-premium' : 'card-name-standard'} style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>
                  {card.holder}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Valid thru
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                  12/29
                </div>
              </div>
            </div>

          </div>

          {/* Card shadow */}
          {!isMobile && (
            <div style={{
              position: 'absolute', bottom: -30, left: '15%', right: '15%', height: 30,
              background: isDiners
                ? 'radial-gradient(ellipse, rgba(212,168,83,0.25) 0%, transparent 70%)'
                : isPremium
                ? 'radial-gradient(ellipse, rgba(167,139,250,0.25) 0%, transparent 70%)'
                : 'radial-gradient(ellipse, rgba(96,165,250,0.2) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }} />
          )}

        </div>
      </div>

      {/* Brand row under card */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, padding: '0 4px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.textTertiary, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {isDiners ? 'Exclusive' : isPremium ? 'Premium' : 'Standard'}
        </span>
        <BrandLogo brand={card.brand} size="label" />
      </div>

      <style>{`
        @keyframes logoShimmer {
          0%   { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .logo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
          animation: logoShimmer 2.8s ease-in-out infinite;
          pointer-events: none;
          will-change: transform;
        }
        .logo-shimmer--gold {
          background: linear-gradient(105deg, transparent 30%, rgba(255,220,120,0.6) 50%, transparent 70%);
        }

        @keyframes cardFloat {
          0%,100% { transform: translateY(0px) rotateX(1deg) rotateY(-3deg); }
          50%      { transform: translateY(-14px) rotateX(-1deg) rotateY(3deg); }
        }

        .card-name-standard {
          background: linear-gradient(90deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cardStripeShimmer 4s linear infinite;
        }
        .card-name-premium {
          background: linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cardStripeShimmer 4s linear infinite;
        }
        .card-name-diners {
          background: linear-gradient(90deg, #b8882a 0%, #f0c96a 40%, #d4a853 70%, #e8d48a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cardStripeShimmer 4s linear infinite;
        }
      `}</style>
    </>
  )
}
