import { Check } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Label, Heading, Sub } from './Layout'
import Card3D from './Card3D'
import { cards } from '../data/cards'
import type { CardType } from '../data/cards'
import { useResponsive } from '../hooks/useResponsive'

interface CardsSectionProps { onOrder: (type: CardType) => void }

export default function CardsSection({ onOrder }: CardsSectionProps) {
  const { isMobile, isTablet } = useResponsive()

  return (
    <Section id="cards">
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <Heading size="lg" style={{ marginBottom: 16 }}>Выберите свою NEOкарту</Heading>
        <Sub style={{ maxWidth: 480, margin: '0 auto' }}>
          Два продукта под любые задачи — сравните и выберите то, что подходит именно вам.
        </Sub>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
        gap: 24,
        alignItems: 'stretch',
      }}>
        {cards.map((card, i) => {
          const isPremium = card.id === 'premium'
          const accent = isPremium ? t.purple : t.blue
          const borderColor = isPremium ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.07)'
          const glowColor = isPremium ? 'rgba(167,139,250,0.05)' : 'rgba(96,165,250,0.03)'

          return (
            <div key={card.id} className="product-card" style={{
              position: 'relative', overflow: 'hidden',
              padding: isMobile ? 24 : 36,
              borderRadius: t.r24,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: `0 8px 40px rgba(0,0,0,0.25), 0 0 80px ${isPremium ? 'rgba(167,139,250,0.04)' : 'rgba(96,165,250,0.03)'}`,
              display: 'flex', flexDirection: 'column',
              animation: `productFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s both`,
            }}>

              {/* Radial glow */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(ellipse at 50% 0%, ${isPremium ? 'rgba(167,139,250,0.10)' : 'rgba(96,165,250,0.07)'} 0%, transparent 65%)`,
              }} />

              {/* Card 3D */}
              <div style={{ position: 'relative', zIndex: 1, marginBottom: 32 }}>
                <Card3D card={card} />
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 className="shimmer" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
                  {card.title}
                </h3>

                <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, marginBottom: 24 }}>
                  {card.description}
                </p>

                {/* Features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {card.features.map((f, fi) => (
                    <li key={f} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      fontSize: 14, fontWeight: 500, color: t.textPrimary,
                      animation: `productFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12 + 0.15 + fi * 0.06}s both`,
                    }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${accent}18`,
                        transition: 'background 0.2s ease',
                      }}>
                        <Check size={11} strokeWidth={2.5} color={accent} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => onOrder(card.id)}
                  className="product-btn"
                  style={{
                    marginTop: 'auto',
                    width: '100%', height: 52,
                    borderRadius: t.r999, border: 'none', cursor: 'pointer',
                    fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
                    background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 55%, #60a5fa 100%)',
                    color: '#fff',
                  }}
                >
                  Оформить карту
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes productFadeUp {
          from { opacity: 0; transform: translateY(24px); }
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
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
          animation: btnBreathe 4s ease-in-out infinite;
        }
        .product-btn:hover {
          transform: translateY(-4px);
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.5),
            0 8px 20px rgba(129,140,248,0.45),
            0 20px 48px rgba(96,165,250,0.2);
          animation: none;
        }
        .product-btn:active {
          transform: translateY(-1px) scale(0.98);
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.4),
            0 4px 12px rgba(129,140,248,0.35);
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
