import { useEffect, useRef, useState } from 'react'
import { t } from '../styles/tokens'
import { Container } from './Layout'
import { stats } from '../data/cards'

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active || target === 0) { setVal(target); return }
    const dur = 1400, step = 16, inc = target / (dur / step)
    let cur = 0
    const id = setInterval(() => {
      cur = Math.min(cur + inc, target)
      setVal(Math.floor(cur))
      if (cur >= target) clearInterval(id)
    }, step)
    return () => clearInterval(id)
  }, [active, target])
  return val
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const val = useCountUp(value, active)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ padding: '48px 40px' }}>
      <div className="shimmer" style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>
        {val}{suffix}
      </div>
      <div style={{ fontSize: 14, color: t.textTertiary, lineHeight: 1.4 }}>{label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <div style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
      <Container style={{ padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ borderRight: i < stats.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <StatItem {...s} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
