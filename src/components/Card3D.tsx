import { useRef } from 'react'
import type { CardProduct } from '../data/cards'
import { t } from '../styles/tokens'
import { useResponsive } from '../hooks/useResponsive'

interface Card3DProps { card: CardProduct; balance?: number; disableFloat?: boolean }

// Per-card visual config
const cardThemes = {
  standard: {
    tier: 'STANDARD',
    tierSub: '',
    bg: 'linear-gradient(155deg, #0a0d14 0%, #0e1118 35%, #090c12 70%, #0c0f16 100%)',
    border: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(40,40,50,0.5) 30%, rgba(129,140,248,0.12) 60%, rgba(96,165,250,0.15))',
    aurora: 'radial-gradient(ellipse at 15% -10%, rgba(96,165,250,0.10) 0%, transparent 45%), radial-gradient(ellipse at 85% 110%, rgba(129,140,248,0.06) 0%, transparent 45%)',
    shadow: 'rgba(96,165,250,0.15)',
    watermark: 'linear-gradient(135deg, rgba(96,165,250,0.04), rgba(129,140,248,0.02))',
    tierGrad: 'linear-gradient(90deg, #60a5fa, #818cf8)',
    nameClass: 'card-name-standard',
  },
  premium: {
    tier: 'PREMIUM',
    tierSub: '',
    bg: 'linear-gradient(155deg, #0d0b14 0%, #12101c 35%, #0a0910 70%, #0e0c16 100%)',
    border: 'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(40,40,50,0.5) 30%, rgba(192,132,252,0.12) 60%, rgba(167,139,250,0.18))',
    aurora: 'radial-gradient(ellipse at 15% -10%, rgba(167,139,250,0.10) 0%, transparent 45%), radial-gradient(ellipse at 85% 110%, rgba(192,132,252,0.06) 0%, transparent 45%)',
    shadow: 'rgba(167,139,250,0.20)',
    watermark: 'linear-gradient(135deg, rgba(167,139,250,0.04), rgba(192,132,252,0.02))',
    tierGrad: 'linear-gradient(90deg, #a78bfa, #c084fc)',
    nameClass: 'card-name-premium',
  },
  black: {
    tier: 'BLACK',
    tierSub: 'WORLD ELITE',
    bg: 'linear-gradient(155deg, #111214 0%, #1a1a1f 20%, #0f1012 45%, #18181d 65%, #111214 100%)',
    border: 'linear-gradient(135deg, rgba(200,200,220,0.35), rgba(60,60,65,0.7) 25%, rgba(167,139,250,0.2) 50%, rgba(180,180,200,0.25) 75%, rgba(96,165,250,0.2))',
    aurora: 'radial-gradient(ellipse at 25% 0%, rgba(200,200,220,0.08) 0%, transparent 40%), radial-gradient(ellipse at 75% 100%, rgba(167,139,250,0.07) 0%, transparent 40%), radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)',
    shadow: 'rgba(167,139,250,0.20)',
    watermark: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(167,139,250,0.02))',
    tierGrad: 'linear-gradient(90deg, #c0c0d0, #a78bfa, #c0c0d0)',
    nameClass: 'card-name-black',
  },
} as const

function MastercardLogo({ muted, chrome }: { muted?: boolean; chrome?: boolean }) {
  if (chrome) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <svg width="48" height="30" viewBox="0 0 48 30" fill="none">
          <defs>
            <linearGradient id="mcChromeL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a8a9a" />
              <stop offset="40%" stopColor="#c0c0cc" />
              <stop offset="60%" stopColor="#707080" />
              <stop offset="100%" stopColor="#9a9aaa" />
            </linearGradient>
            <linearGradient id="mcChromeR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9a9aaa" />
              <stop offset="35%" stopColor="#d0d0dd" />
              <stop offset="65%" stopColor="#808090" />
              <stop offset="100%" stopColor="#a8a8b8" />
            </linearGradient>
            <linearGradient id="mcChromeM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b0b0c0" />
              <stop offset="50%" stopColor="#e0e0ee" />
              <stop offset="100%" stopColor="#a0a0b0" />
            </linearGradient>
          </defs>
          <circle cx="17" cy="15" r="12" fill="url(#mcChromeL)" />
          <circle cx="31" cy="15" r="12" fill="url(#mcChromeR)" />
          <path d="M24 4.5a12 12 0 010 21 12 12 0 010-21z" fill="url(#mcChromeM)" />
        </svg>
        <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', background: 'linear-gradient(90deg, #888898, #c0c0d0, #888898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>mastercard</span>
      </div>
    )
  }
  const o1 = muted ? 0.7 : 1
  const o2 = muted ? 0.55 : 1
  const o3 = muted ? 0.6 : 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <svg width="48" height="30" viewBox="0 0 48 30" fill="none">
        <circle cx="17" cy="15" r="12" fill={`rgba(235,0,27,${o1})`} />
        <circle cx="31" cy="15" r="12" fill={`rgba(247,158,27,${o2})`} />
        <path d="M24 4.5a12 12 0 010 21 12 12 0 010-21z" fill={`rgba(255,95,0,${o3})`} />
      </svg>
      <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.15)' }}>mastercard</span>
    </div>
  )
}

function VisaLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <svg width="56" height="18" viewBox="0 0 78 25" fill="none" style={{ opacity: 0.7 }}>
        <path d="M30.5 1.5 L24 23.5 H18L24.5 1.5 H30.5Z" fill="#fff"/>
        <path d="M52.5 2C51 1.4 48.6 0.8 45.6 0.8C39.7 0.8 35.5 3.8 35.5 8.1C35.5 11.3 38.5 13.1 40.8 14.2C43.1 15.3 43.9 16 43.9 17C43.9 18.5 42 19.1 40.3 19.1C37.9 19.1 36.6 18.7 34.6 17.9L33.8 17.5L33 22.2C34.7 23 37.9 23.6 41.2 23.6C47.5 23.6 51.6 20.6 51.6 16C51.6 13.4 49.9 11.5 46.3 9.9C44.3 8.9 43.1 8.2 43.1 7.1C43.1 6.1 44.2 5.1 46.5 5.1C48.4 5.1 49.8 5.5 50.9 5.9L51.5 6.2L52.5 2Z" fill="#fff"/>
        <path d="M60.5 1.5H55.8C54.4 1.5 53.3 1.9 52.7 3.3L44 23.5H50.3C50.3 23.5 51.3 20.9 51.5 20.3C52.2 20.3 58.3 20.3 59.2 20.3C59.4 21.1 59.9 23.5 59.9 23.5H65.5L60.5 1.5ZM53.3 15.7C53.8 14.4 55.9 8.9 55.9 8.9C55.9 8.9 56.5 7.3 56.8 6.3L57.2 8.7C57.2 8.7 58.5 14.5 58.8 15.7H53.3Z" fill="#fff"/>
        <path d="M14.5 1.5L8.7 16.4L8.1 13.4C7.1 10.2 4 6.7 0.5 4.9L5.8 23.5H12.2L21.5 1.5H14.5Z" fill="#fff"/>
        <path d="M4 1.5H-5.5L-5.6 1.9C1.9 3.7 6.9 7.9 8.1 13.4L6.8 3.3C6.6 2 5.4 1.5 4 1.5Z" fill="rgba(255,255,255,0.5)" transform="translate(5.5, 0)"/>
      </svg>
      <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.15)' }}>visa</span>
    </div>
  )
}


export default function Card3D({ card, balance, disableFloat }: Card3DProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useResponsive()

  const theme = cardThemes[card.id]
  const patternId = `card3dLines-${card.id}`

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
      wrapRef.current.style.animation = disableFloat ? 'none' : 'cardFloat 6s ease-in-out infinite'
      wrapRef.current.style.transform = ''
    }
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <>
      <div style={{ perspective: '1000px', cursor: 'pointer' }} onMouseMove={isMobile ? undefined : onMouseMove} onMouseLeave={isMobile ? undefined : onMouseLeave}>
        <div ref={wrapRef} style={{
          transformStyle: 'preserve-3d',
          animation: isMobile || disableFloat ? 'none' : 'cardFloat 6s ease-in-out infinite',
          transition: isMobile ? 'none' : 'transform 0.1s linear',
          willChange: isMobile ? 'auto' : 'transform',
          position: 'relative',
        }}>

          {/* Holographic border wrapper */}
          <div style={{
            width: '100%', aspectRatio: '1.586',
            borderRadius: 24, padding: 1.5,
            position: 'relative', overflow: 'hidden',
            background: theme.border,
            boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 30px ${theme.shadow}`,
          }}>
            {/* Inner card body */}
            <div style={{
              borderRadius: 22.5, padding: '28px 30px',
              height: '100%', boxSizing: 'border-box',
              position: 'relative', overflow: 'hidden',
              background: theme.bg,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>

              {/* Glare overlay */}
              <div ref={glareRef} style={{
                position: 'absolute', inset: 0, borderRadius: 22.5,
                opacity: 0, pointerEvents: 'none', zIndex: 3,
                transition: 'opacity 0.25s',
              }} />

              {/* Aurora glow */}
              <div className="card-aurora" style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: card.id === 'black' ? 0.6 : 0.45, zIndex: 0,
                background: theme.aurora,
              }} />

              {/* Brushed-metal diagonal lines */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: card.id === 'black' ? 0.05 : 0.025, zIndex: 0 }}>
                <defs>
                  <pattern id={patternId} width={card.id === 'black' ? '4' : '6'} height={card.id === 'black' ? '4' : '6'} patternUnits="userSpaceOnUse" patternTransform={card.id === 'black' ? 'rotate(25)' : 'rotate(30)'}>
                    <line x1="0" y1="0" x2="0" y2={card.id === 'black' ? '4' : '6'} stroke="#fff" strokeWidth={card.id === 'black' ? '0.3' : '0.4'} />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
              </svg>

              {/* Metallic shimmer sweep — Black only */}
              {card.id === 'black' && (
                <div className="card-metal-shimmer" style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
                  background: 'linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 58%, transparent 65%, transparent 100%)',
                  backgroundSize: '300% 100%',
                }} />
              )}

              {/* Background watermark */}
              <div style={{
                position: 'absolute', right: -20, bottom: -30,
                fontSize: 180, fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.05em', pointerEvents: 'none', zIndex: 0,
                userSelect: 'none', fontFamily: t.fontFamily,
                background: theme.watermark,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>N</div>

              {/* ── Top row: chip + NFC + tier badge ── */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* EMV chip */}
                  <div style={{
                    width: 40, height: 30, borderRadius: 6,
                    background: 'linear-gradient(145deg, #b8974a, #e8d48a, #c9a64e, #d4b860)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: '33%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
                    <div style={{ position: 'absolute', top: '66%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
                    <div style={{ position: 'absolute', left: '33%', top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.15)' }} />
                  </div>
                  {/* Contactless NFC waves */}
                  <svg width="16" height="16" viewBox="0 0 12 12" style={{ opacity: 0.3 }}>
                    <path d="M3 9.5a5.5 5.5 0 010-7" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" />
                    <path d="M5 8a3.2 3.2 0 010-4" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" />
                    <path d="M7 6.8a1.2 1.2 0 010-1.6" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                {/* Tier label */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  {theme.tierSub && (
                    <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)' }}>{theme.tierSub}</span>
                  )}
                  <span style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.2em',
                    background: theme.tierGrad,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{theme.tier}</span>
                </div>
              </div>

              {/* ── Balance ── */}
              {balance !== undefined && (
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
                    {balance.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              )}

              {/* ── Card number ── */}
              <div style={{
                position: 'relative', zIndex: 1,
                fontFamily: `'SF Mono', 'Fira Code', monospace`,
                fontSize: 15, letterSpacing: '0.22em',
                color: balance !== undefined ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.45)',
                fontWeight: 500, whiteSpace: 'nowrap',
              }}>
                {card.number}
              </div>

              {/* ── Bottom row: holder + valid thru + CVV + brand logo ── */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ display: 'flex', gap: 24, marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', marginBottom: 2 }}>VALID THRU</div>
                      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>12/29</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', marginBottom: 2 }}>CVV</div>
                      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>•••</div>
                    </div>
                  </div>
                  <div className={theme.nameClass} style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>
                    {card.holder}
                  </div>
                </div>
                {/* Brand logo */}
                {card.brand === 'Mastercard' ? <MastercardLogo muted={card.id !== 'black'} chrome={card.id === 'black'} /> : <VisaLogo />}
              </div>

            </div>
          </div>

          {/* Card shadow */}
          {!isMobile && (
            <div style={{
              position: 'absolute', bottom: -30, left: '15%', right: '15%', height: 30,
              background: `radial-gradient(ellipse, ${theme.shadow} 0%, transparent 70%)`,
              filter: 'blur(10px)',
            }} />
          )}

        </div>
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
        .card-name-black {
          background: linear-gradient(90deg, #8888a0 0%, #c8c8dd 25%, #a78bfa 50%, #c8c8dd 75%, #8888a0 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cardStripeShimmer 4s linear infinite;
        }
        .card-aurora {
          animation: auroraShift 6s ease-in-out infinite alternate;
        }
        @keyframes auroraShift {
          0%   { opacity: 0.4; filter: hue-rotate(0deg); }
          50%  { opacity: 0.55; filter: hue-rotate(15deg); }
          100% { opacity: 0.4; filter: hue-rotate(-10deg); }
        }
        .card-metal-shimmer {
          animation: metalSweep 4s ease-in-out infinite;
        }
        @keyframes metalSweep {
          0%   { background-position: 150% 0; }
          100% { background-position: -50% 0; }
        }
      `}</style>
    </>
  )
}
