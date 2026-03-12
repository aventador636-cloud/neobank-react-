import { useRef, useEffect, useState } from 'react'
import { t } from '../styles/tokens'
import { Container, Btn } from './Layout'
import Card3D from './Card3D'
import { cards } from '../data/cards'
import { useResponsive } from '../hooks/useResponsive'

interface HeroProps { onCta: () => void }


export default function Hero({ onCta }: HeroProps) {
  const { isMobile, isTablet } = useResponsive()
  const blackCard = cards.find(c => c.id === 'black')!
  const heroRef = useRef<HTMLDivElement>(null)
  const cardWrapRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)
  const [scrollReady, setScrollReady] = useState(false)

  useEffect(() => {
    setScrollReady(true)
    const handleScroll = () => {
      if (!heroRef.current || !cardWrapRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const heroH = rect.height
      // progress: 0 = hero top at viewport top, 1 = hero fully scrolled out
      const progress = Math.min(Math.max(-rect.top / heroH, 0), 1)

      const rotateY = -18 + progress * 24       // -18° → 6°
      const rotateX = 8 - progress * 14         // 8° → -6°
      const scale   = 0.92 + progress * 0.08    // 0.92 → 1.0
      const translateZ = progress * 40           // 0 → 40px
      const brightness = 0.85 + progress * 0.2  // 0.85 → 1.05

      cardWrapRef.current.style.transform =
        `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px) scale(${scale})`
      cardWrapRef.current.style.filter = `brightness(${brightness})`

      // Glow behind card — intensify + shift with scroll
      if (glowRef.current) {
        const glowScale = 1 + progress * 0.4
        const glowOpacity = 0.15 + progress * 0.2
        glowRef.current.style.transform = `translate(-50%, -50%) scale(${glowScale})`
        glowRef.current.style.opacity = String(glowOpacity)
      }

      // Ambient glow — parallax (moves slower)
      if (ambientRef.current) {
        const parallaxY = -100 + progress * 60
        ambientRef.current.style.transform = `translateX(-50%) translateY(${parallaxY}px)`
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow — parallax */}
      <div ref={ambientRef} style={{
        position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 700, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.12) 0%, transparent 65%)',
        filter: 'blur(60px)', willChange: 'transform',
      }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? 48 : isTablet ? 56 : 80,
          alignItems: 'center',
          paddingTop: isMobile ? 32 : 80,
          paddingBottom: isMobile ? 32 : 80,
        }}>

          {/* ── Left: text ── */}
          <div>
            <h1 className="shimmer" style={{
              fontSize: isMobile ? 44 : isTablet ? 56 : 72,
              fontWeight: 900, lineHeight: 1.0,
              letterSpacing: '-0.04em',
              marginBottom: 20,
            }}>
              Банк нового<br />поколения
            </h1>

            <p style={{
              fontSize: isMobile ? 16 : 18,
              lineHeight: 1.65, color: t.textSecondary,
              maxWidth: 440, marginBottom: 36,
            }}>
              Управляйте деньгами там, где удобно — переводы, кэшбэк и аналитика в одном приложении.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
              <Btn onClick={onCta}>Открыть счёт бесплатно</Btn>
              <Btn variant="ghost" href="#cards">Смотреть карты</Btn>
            </div>

          </div>

          {/* ── Right: card ── */}
          <div style={{
            display: 'flex', justifyContent: isMobile ? 'center' : isTablet ? 'center' : 'flex-end',
            position: 'relative',
          }}>
            {/* Glow behind card — dynamic */}
            <div ref={glowRef} style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? 280 : 400, height: isMobile ? 200 : 300, pointerEvents: 'none',
              background: 'radial-gradient(ellipse, rgba(167,139,250,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)', willChange: 'transform, opacity',
            }} />
            <div
              ref={cardWrapRef}
              style={{
                width: isMobile ? 300 : isTablet ? 360 : 420,
                position: 'relative',
                transition: scrollReady ? 'none' : 'transform 0.6s ease',
                willChange: 'transform, filter',
              }}
            >
              <Card3D card={blackCard} disableFloat />
            </div>
          </div>

        </div>
      </Container>

      {/* Bottom fade */}
      <div style={{
        height: 80,
        background: `linear-gradient(to bottom, transparent, ${t.bg})`,
        marginTop: -80, position: 'relative', zIndex: 2, pointerEvents: 'none',
      }} />
    </div>
  )
}
