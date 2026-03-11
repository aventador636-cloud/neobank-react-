import { useState } from 'react'
import { Check } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Heading } from './Layout'
import Card3D from './Card3D'
import { cards } from '../data/cards'
import type { CardType } from '../data/cards'
import { useResponsive } from '../hooks/useResponsive'

interface CardsSectionProps { onOrder: (type: CardType) => void }

export default function CardsSection({ onOrder }: CardsSectionProps) {
  const { isMobile, isTablet } = useResponsive()
  const [mobileTab, setMobileTab] = useState(0)

  return (
    <Section id="cards">
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56 }}>
        <Heading size="lg">Выберите свою карту</Heading>
      </div>

      {/* ── Mobile: tab switcher ── */}
      {isMobile && (() => {
        const card = cards[mobileTab]
        const isPremium = card.id === 'premium'
        const isDiners  = card.id === 'diners'
        const accent = isDiners ? '#d4a853' : isPremium ? t.purple : t.blue

        return (
          <div>
            {/* Tabs */}
            <div style={{
              display: 'flex', background: 'rgba(255,255,255,0.04)',
              borderRadius: t.r999, padding: 4, gap: 4, marginBottom: 24,
              border: `1px solid ${t.border}`,
            }}>
              {cards.map((c, i) => (
                <button key={c.id} onClick={() => setMobileTab(i)} style={{
                  flex: 1, height: 36, borderRadius: t.r999, border: 'none',
                  cursor: 'pointer', fontSize: 12, fontWeight: 700,
                  transition: 'all 0.22s ease',
                  WebkitTapHighlightColor: 'transparent', outline: 'none',
                  background: mobileTab === i
                    ? c.id === 'diners' ? 'linear-gradient(90deg, #c8960c, #d4a853)'
                    : c.id === 'premium' ? 'linear-gradient(90deg, #a78bfa, #818cf8)'
                    : 'linear-gradient(90deg, #60a5fa, #818cf8)'
                    : 'transparent',
                  color: mobileTab === i ? '#fff' : t.textTertiary,
                  boxShadow: mobileTab === i ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
                }}>
                  {c.id === 'standard' ? 'Standard' : c.id === 'premium' ? 'Premium' : 'Diners'}
                </button>
              ))}
            </div>

            {/* Card content */}
            <div key={card.id} style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: t.r24,
              background: isPremium ? 'rgba(167,139,250,0.06)' : 'rgba(255,255,255,0.04)',
              border: isPremium ? '1px solid rgba(167,139,250,0.20)' : `1px solid ${t.border}`,
              padding: 24,
              animation: 'tabSlideIn 0.25s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(ellipse at 50% 0%, ${isDiners ? 'rgba(212,168,83,0.10)' : isPremium ? 'rgba(167,139,250,0.10)' : 'rgba(96,165,250,0.07)'} 0%, transparent 60%)`,
              }} />

              {/* Badge */}
              {card.badge && (
                <div style={{ position: 'relative', zIndex: 1, marginBottom: 14 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: t.r999,
                    background: isDiners ? 'rgba(212,168,83,0.15)' : 'rgba(167,139,250,0.15)',
                    border: `1px solid ${isDiners ? 'rgba(212,168,83,0.30)' : 'rgba(167,139,250,0.30)'}`,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    color: isDiners ? '#d4a853' : t.purple,
                  }}>
                    <span>★</span>{card.badge}
                  </span>
                </div>
              )}

              {/* Card3D — compact */}
              <div style={{ position: 'relative', zIndex: 1, marginBottom: 20, maxWidth: 280, margin: '0 auto 20px' }}>
                <Card3D card={card} />
              </div>

              {/* Title + price */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                <h3 className="shimmer" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em' }}>
                  {card.title}
                </h3>
                <div style={{ fontSize: 18, fontWeight: 800, color: accent, flexShrink: 0 }}>{card.price}</div>
              </div>
              <p style={{ position: 'relative', zIndex: 1, fontSize: 12, color: t.textTertiary, marginBottom: 20 }}>{card.priceNote}</p>

              {/* Features */}
              <ul style={{ position: 'relative', zIndex: 1, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {card.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: t.textPrimary }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${accent}18`,
                    }}>
                      <Check size={11} strokeWidth={2.5} color={accent} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button onClick={() => onOrder(card.id)} className="product-btn" style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: 52, borderRadius: t.r999, border: 'none',
                cursor: 'pointer', fontSize: 15, fontWeight: 700,
                WebkitTapHighlightColor: 'transparent',
                background: isDiners
                  ? 'linear-gradient(135deg, #c8960c, #d4a853)'
                  : isPremium
                  ? 'linear-gradient(135deg, #a78bfa, #818cf8)'
                  : 'linear-gradient(135deg, #60a5fa, #818cf8)',
                color: '#fff',
              }}>
                {card.cta}
              </button>
            </div>
          </div>
        )
      })()}

      {/* ── Desktop/Tablet: grid ── */}
      {!isMobile && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: 24, alignItems: 'stretch',
        }}>
          {cards.map((card, i) => {
            const isPremium = card.id === 'premium'
            const isDiners  = card.id === 'diners'
            const accent = isDiners ? '#d4a853' : isPremium ? t.purple : t.blue

            return (
              <div key={card.id} className="product-card" style={{
                position: 'relative', overflow: 'hidden',
                padding: 36, borderRadius: t.r24,
                background: isPremium ? 'rgba(167,139,250,0.06)' : 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                boxShadow: `0 8px 40px rgba(0,0,0,0.25), 0 0 80px ${isDiners ? 'rgba(212,168,83,0.06)' : isPremium ? 'rgba(167,139,250,0.10)' : 'rgba(96,165,250,0.03)'}`,
                border: isPremium ? '1px solid rgba(167,139,250,0.20)' : '1px solid transparent',
                display: 'flex', flexDirection: 'column',
                transform: isPremium ? 'translateY(-16px)' : undefined,
                animation: `productFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s both`,
              }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 0%, ${isDiners ? 'rgba(212,168,83,0.10)' : isPremium ? 'rgba(167,139,250,0.10)' : 'rgba(96,165,250,0.07)'} 0%, transparent 65%)` }} />

                {card.badge && (
                  <div style={{ position: 'relative', zIndex: 1, marginBottom: 16 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '5px 12px', borderRadius: t.r999,
                      background: isDiners ? 'rgba(212,168,83,0.15)' : 'rgba(167,139,250,0.15)',
                      border: `1px solid ${isDiners ? 'rgba(212,168,83,0.30)' : 'rgba(167,139,250,0.30)'}`,
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                      color: isDiners ? '#d4a853' : t.purple,
                    }}>
                      <span>★</span>{card.badge}
                    </span>
                  </div>
                )}

                <div style={{ position: 'relative', zIndex: 1, marginBottom: 32 }}>
                  <Card3D card={card} />
                </div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                    <h3 className="shimmer" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>{card.title}</h3>
                    <div style={{ fontSize: 18, fontWeight: 800, color: accent, flexShrink: 0 }}>{card.price}</div>
                  </div>
                  <p style={{ fontSize: 12, color: t.textTertiary, marginBottom: 16 }}>{card.priceNote}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, marginBottom: 24 }}>{card.description}</p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                    {card.features.map((f, fi) => (
                      <li key={f} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        fontSize: 14, fontWeight: 500, color: t.textPrimary,
                        animation: `productFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12 + 0.15 + fi * 0.06}s both`,
                      }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${accent}18` }}>
                          <Check size={11} strokeWidth={2.5} color={accent} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => onOrder(card.id)} className="product-btn" style={{
                    marginTop: 'auto', width: '100%', height: 52,
                    borderRadius: t.r999, border: 'none', cursor: 'pointer',
                    fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
                    background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 55%, #60a5fa 100%)',
                    color: '#fff',
                  }}>
                    {card.cta}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        @keyframes productFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .product-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.35), 0 0 120px rgba(129,140,248,0.08) !important;
        }
        .product-btn {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
          animation: btnBreathe 4s ease-in-out infinite;
        }
        .product-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 0 1px rgba(167,139,250,0.5), 0 8px 20px rgba(129,140,248,0.45), 0 20px 48px rgba(96,165,250,0.2);
          animation: none;
        }
        .product-btn:active {
          transform: translateY(-1px) scale(0.98);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        @keyframes btnBreathe {
          0%, 100% { box-shadow: 0 4px 16px rgba(129,140,248,0.2); }
          50%       { box-shadow: 0 4px 28px rgba(129,140,248,0.38); }
        }
      `}</style>
    </Section>
  )
}
