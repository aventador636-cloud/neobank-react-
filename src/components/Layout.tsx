import type { ReactNode, CSSProperties } from 'react'
import { t } from '../styles/tokens'
import { useResponsive } from '../hooks/useResponsive'

interface ContainerProps { children: ReactNode; style?: CSSProperties }
interface SectionProps   { children: ReactNode; style?: CSSProperties; id?: string }

export function Container({ children, style }: ContainerProps) {
  const { isMobile } = useResponsive()
  return (
    <div style={{ maxWidth: 1160, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px', ...style }}>
      {children}
    </div>
  )
}

export function Section({ children, style, id }: SectionProps) {
  const { isMobile, isTablet } = useResponsive()
  const padding = isMobile ? '48px 0' : isTablet ? '64px 0' : '96px 0'
  return (
    <section id={id} style={{ padding, ...style }}>
      <Container>{children}</Container>
    </section>
  )
}

export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p className="shimmer" style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', marginBottom: 20, ...style,
    }}>
      {children}
    </p>
  )
}

export function Heading({ children, size = 'xl', style }: { children: ReactNode; size?: 'lg' | 'xl' | 'xxl'; style?: CSSProperties }) {
  const sizes = { lg: 36, xl: 52, xxl: 72 }
  return (
    <h2 className="shimmer" style={{
      fontSize: sizes[size], fontWeight: 800, lineHeight: 1.05,
      letterSpacing: '-0.03em', ...style,
    }}>
      {children}
    </h2>
  )
}

export function Sub({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p style={{ fontSize: 17, lineHeight: 1.65, color: t.textSecondary, maxWidth: 480, ...style }}>
      {children}
    </p>
  )
}

interface BtnProps { children: ReactNode; onClick?: () => void; variant?: 'primary' | 'ghost'; href?: string; style?: CSSProperties }
export function Btn({ children, onClick, variant = 'primary', href, style }: BtnProps) {
  const base: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: 48, padding: '0 24px', borderRadius: t.r999,
    fontWeight: 700, fontSize: 15, cursor: 'pointer', border: 'none',
    transition: t.ease, whiteSpace: 'nowrap',
  }
  const variants = {
    primary: { background: 'linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)', color: '#fff' } as CSSProperties,
    ghost:   { background: 'rgba(255,255,255,0.07)', color: '#fff', border: `1px solid ${t.border}` } as CSSProperties,
  }
  const combined = { ...base, ...variants[variant], ...style }
  const label = variant === 'ghost' ? <span className="shimmer">{children}</span> : children
  if (href) return <a href={href} style={combined}>{label}</a>
  return (
    <button onClick={onClick} style={combined}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
    >
      {label}
    </button>
  )
}
