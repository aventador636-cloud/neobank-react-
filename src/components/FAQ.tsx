import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Heading } from './Layout'
import { faqItems } from '../data/cards'
import { useResponsive } from '../hooks/useResponsive'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const { isTablet } = useResponsive()

  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '340px 1fr', gap: isTablet ? 40 : 80 }}>

        {/* Left — sticky */}
        <div style={{ position: isTablet ? 'static' : 'sticky', top: 100, alignSelf: 'start' }}>
          <p className="shimmer" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            FAQ
          </p>
          <h2 className="shimmer" style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: 20 }}>Частые<br />вопросы</h2>
          <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.7, marginBottom: 36 }}>
            Не нашли ответ? Напишите нам — поможем разобраться.
          </p>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 600,
            padding: '14px 24px', borderRadius: t.r999,
            background: '#0d0e11', color: t.textSecondary,
            transition: 'color 0.2s ease, background 0.2s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(129,140,248,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = t.textSecondary; (e.currentTarget as HTMLElement).style.background = '#0d0e11' }}
          >
            <span className="shimmer">Написать в поддержку →</span>
          </a>
        </div>

        {/* Right — accordion cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="faq-card" style={{
                position: 'relative',
                borderRadius: t.r24,
                background: isOpen ? '#0f1014' : '#0d0e11',
                overflow: 'hidden',
                transition: 'background 0.3s ease',
                animation: `faqFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s both`,
              }}>
                {/* Radial glow when open */}
                {isOpen && (
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 0% 0%, rgba(129,140,248,0.06) 0%, transparent 60%)',
                  }} />
                )}

                {/* Subtle top glow when open */}
                {isOpen && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.4), transparent)',
                    pointerEvents: 'none',
                  }} />
                )}

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '24px 28px', gap: 20,
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    position: 'relative', zIndex: 1,
                  }}
                >
                  <span className="shimmer" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>
                    {item.question}
                  </span>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isOpen ? 'rgba(129,140,248,0.15)' : 'rgba(255,255,255,0.05)',
                    transition: 'background 0.3s ease',
                  }}>
                    <ChevronDown
                      size={17}
                      strokeWidth={2}
                      color={isOpen ? '#818cf8' : t.textTertiary}
                      style={{
                        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.3s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                </button>

                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? 300 : 0,
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                  position: 'relative', zIndex: 1,
                }}>
                  <p style={{
                    fontSize: 16, color: t.textSecondary, lineHeight: 1.8,
                    padding: '0 28px 32px',
                  }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <style>{`
        @keyframes faqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .faq-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background 0.3s ease;
        }
        .faq-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }
      `}</style>
    </Section>
  )
}
