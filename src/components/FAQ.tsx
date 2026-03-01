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
          <h2 className="shimmer" style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: 16 }}>Частые<br />вопросы</h2>
          <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.65, marginBottom: 32 }}>
            Не нашли ответ? Напишите нам — поможем разобраться.
          </p>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 600,
            padding: '12px 20px', borderRadius: t.r999,
            background: t.surface, color: t.textSecondary,
            transition: 'color 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}
          >
            <span className="shimmer">Написать в поддержку →</span>
          </a>
        </div>

        {/* Right — accordion cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="faq-card" style={{
                borderRadius: t.r20,
                background: isOpen ? '#0f1014' : t.surface,
                overflow: 'hidden',
                transition: 'background 0.3s ease',
                animation: `faqFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s both`,
              }}>
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
                    alignItems: 'center', padding: '22px 24px', gap: 20,
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span className="shimmer" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>
                    {item.question}
                  </span>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isOpen ? 'rgba(129,140,248,0.15)' : 'rgba(255,255,255,0.05)',
                    transition: 'background 0.3s ease',
                  }}>
                    <ChevronDown
                      size={16}
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
                }}>
                  <p style={{
                    fontSize: 16, color: t.textSecondary, lineHeight: 1.8,
                    padding: '0 24px 28px',
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
          position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease;
        }
        .faq-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
      `}</style>
    </Section>
  )
}
