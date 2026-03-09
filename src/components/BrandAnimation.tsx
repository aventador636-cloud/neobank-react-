import { useEffect, useRef, useState } from 'react'
import { t } from '../styles/tokens'

interface BrandAnimationProps { size?: number }

export default function BrandAnimation({ size = 480 }: BrandAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const frameRef  = useRef<number>(0)
  const timeRef   = useRef<number>(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducedMotion(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, { threshold: 0.05 })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const DPR = window.devicePixelRatio || 1
    const SIZE = size
    canvas.width  = SIZE * DPR
    canvas.height = SIZE * DPR
    canvas.style.width  = `${SIZE}px`
    canvas.style.height = `${SIZE}px`
    ctx.scale(DPR, DPR)

    const cx = SIZE / 2
    const cy = SIZE / 2

    const particles = Array.from({ length: 60 }, (_, i) => ({
      angle:  (i / 60) * Math.PI * 2,
      radius: 80 + Math.random() * 100,
      speed:  0.003 + Math.random() * 0.004,
      size:   1 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.5,
    }))

    function drawStatic() {
      ctx.clearRect(0, 0, SIZE, SIZE)

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120)
      glow.addColorStop(0, 'rgba(139,92,246,0.16)')
      glow.addColorStop(0.5, 'rgba(96,165,250,0.08)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 120, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, 188, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(167,139,250,0.12)'
      ctx.lineWidth = 1
      ctx.setLineDash([8, 12])
      ctx.stroke()

      const grad = ctx.createLinearGradient(cx - 38, cy - 42, cx + 38, cy + 42)
      grad.addColorStop(0, '#a78bfa')
      grad.addColorStop(1, '#60a5fa')

      ctx.save()
      ctx.translate(cx, cy)
      ctx.beginPath()
      ctx.moveTo(-28, 42)
      ctx.lineTo(-28, -42)
      ctx.strokeStyle = grad
      ctx.lineWidth = 7
      ctx.lineCap = 'round'
      ctx.setLineDash([])
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(-28, -42)
      ctx.lineTo(28, 42)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(28, 42)
      ctx.lineTo(28, -42)
      ctx.stroke()
      ctx.restore()
    }

    function draw(ts: number) {
      if (document.hidden || !inView) {
        frameRef.current = 0
        return
      }

      timeRef.current = ts * 0.001
      const time = timeRef.current

      ctx.clearRect(0, 0, SIZE, SIZE)

      for (let i = 0; i < 3; i++) {
        const rot   = time * (0.25 + i * 0.1) * (i % 2 === 0 ? 1 : -1)
        const r     = 180 + i * 14
        const alpha = 0.08 + i * 0.04

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rot)
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(167,139,250,${alpha})`
        ctx.lineWidth   = 1
        ctx.setLineDash([4 + i * 6, 12 + i * 4])
        ctx.stroke()
        ctx.restore()
      }

      particles.forEach(p => {
        p.angle += p.speed
        const x = cx + Math.cos(p.angle) * p.radius
        const y = cy + Math.sin(p.angle) * p.radius
        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3)
        const hue  = 260 + Math.sin(p.angle + time) * 30
        glow.addColorStop(0, `hsla(${hue},80%,75%,${p.opacity})`)
        glow.addColorStop(1, `hsla(${hue},80%,75%,0)`)
        ctx.beginPath()
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue},90%,80%,${p.opacity * 1.5})`
        ctx.fill()
      })

      const pulse  = 0.7 + Math.sin(time * 1.6) * 0.3
      const glow   = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120 * pulse)
      glow.addColorStop(0,   'rgba(139,92,246,0.18)')
      glow.addColorStop(0.5, 'rgba(96,165,250,0.08)')
      glow.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 120 * pulse, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      const scale  = 0.92 + Math.sin(time * 0.8) * 0.04
      const grad   = ctx.createLinearGradient(cx - 38 * scale, cy - 42 * scale, cx + 38 * scale, cy + 42 * scale)
      grad.addColorStop(0, '#a78bfa')
      grad.addColorStop(1, '#60a5fa')

      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(scale, scale)

      ctx.beginPath()
      ctx.moveTo(-28, 42)
      ctx.lineTo(-28, -42)
      ctx.strokeStyle = grad
      ctx.lineWidth   = 7
      ctx.lineCap     = 'round'
      ctx.setLineDash([])
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(-28, -42)
      ctx.lineTo(28, 42)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(28, 42)
      ctx.lineTo(28, -42)
      ctx.stroke()

      ctx.restore()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-time * 0.4)
      ctx.beginPath()
      ctx.arc(0, 0, 68, 0, Math.PI * 1.5)
      ctx.strokeStyle = 'rgba(167,139,250,0.25)'
      ctx.lineWidth   = 1.5
      ctx.setLineDash([])
      ctx.stroke()
      ctx.restore()

      frameRef.current = requestAnimationFrame(draw)
    }

    if (reducedMotion) {
      drawStatic()
      return () => cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = requestAnimationFrame(draw)

    const restartOnFocus = () => {
      if (!document.hidden && inView && !frameRef.current) {
        frameRef.current = requestAnimationFrame(draw)
      }
    }

    document.addEventListener('visibilitychange', restartOnFocus)

    return () => {
      document.removeEventListener('visibilitychange', restartOnFocus)
      cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
    }
  }, [size, inView, reducedMotion])

  return (
    <div ref={wrapperRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <div className="brand-name-shimmer">
          NeoBank
        </div>
        <p style={{ fontSize: 16, color: t.textTertiary, marginTop: 8, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
          Банк нового поколения
        </p>
      </div>

      <style>{`
        .brand-name-shimmer {
          font-size: clamp(36px, 8vw, 48px);
          font-weight: 900;
          letter-spacing: -0.04em;
          background: linear-gradient(90deg, #a78bfa 0%, #818cf8 25%, #60a5fa 50%, #a78bfa 75%, #818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: brandNameShimmer 4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-name-shimmer {
            animation: none;
            background-position: 50% center;
          }
        }
        @keyframes brandNameShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  )
}
