import { useRef } from 'react'
import type { CardProduct } from '../data/cards'
import { t } from '../styles/tokens'

interface Card3DProps { card: CardProduct }

export default function Card3D({ card }: Card3DProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const isPremium = card.id === 'premium'

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
      <div style={{ perspective: '1000px', cursor: 'pointer' }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <div ref={wrapRef} style={{
          transformStyle: 'preserve-3d',
          animation: 'cardFloat 6s ease-in-out infinite',
          transition: 'transform 0.1s linear',
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
            background: isPremium ? '#0e0b16' : '#0b0e17',
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
              background: isPremium
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
            }}>
              {card.number}
            </div>

            {/* ── Bottom row ── */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Card holder
                </div>
                <div className={isPremium ? 'card-name-premium' : 'card-name-standard'} style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>
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
          <div style={{
            position: 'absolute', bottom: -30, left: '15%', right: '15%', height: 30,
            background: isPremium
              ? 'radial-gradient(ellipse, rgba(167,139,250,0.25) 0%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(96,165,250,0.2) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }} />

        </div>
      </div>

      {/* Brand row under card */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, padding: '0 4px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.textTertiary, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {card.id === 'premium' ? 'Premium' : 'Standard'}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
          {card.brand}
        </span>
      </div>

      <style>{`
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
      `}</style>
    </>
  )
}
