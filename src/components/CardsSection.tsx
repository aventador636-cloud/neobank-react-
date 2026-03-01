import { useState } from 'react'
import { Check } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Label, Heading, Sub, Btn } from './Layout'
import Card3D from './Card3D'
import { cards } from '../data/cards'
import type { CardType } from '../data/cards'
import { useResponsive } from '../hooks/useResponsive'

interface CardsSectionProps { onOrder: (type: CardType) => void }

export default function CardsSection({ onOrder }: CardsSectionProps) {
  const [active, setActive] = useState<CardType>('standard')
  const card = cards.find(c => c.id === active)!
  const accent = active === 'premium' ? t.purple : t.blue
  const { isMobile, isTablet } = useResponsive()

  return (
    <Section id="cards">
      <Label style={{ fontSize: 14 }}>Продукты</Label>

      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: isTablet ? 48 : 80, alignItems: 'start' }}>

        {/* Left */}
        <div>
          <Heading size="lg" style={{ marginBottom: 24 }}>Выберите<br />свою NEOкарту</Heading>
          <Sub style={{ marginBottom: 40 }}>
            Два продукта под любые задачи. Переключайтесь между картами, чтобы сравнить.
          </Sub>

          {/* Tab switcher */}
          <div style={{
            display: 'inline-flex', padding: 4, borderRadius: t.r16, marginBottom: 40,
            background: t.surface, border: `1px solid ${t.border}`,
          }}>
            {cards.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)} style={{
                padding: '10px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, transition: t.ease,
                background: active === c.id
                  ? 'linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)'
                  : 'transparent',
                color: '#fff',
              }}>
                {c.id === 'standard' ? 'Стандартная' : 'Премиум'}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div key={active} style={{ animation: 'fadeUp 0.3s ease both' }}>
            {card.badge && (
              <div style={{
                display: 'inline-block', padding: '4px 12px', borderRadius: t.r999,
                fontSize: 12, fontWeight: 700, marginBottom: 20,
                background: 'rgba(167,139,250,0.1)',
                border: '1px solid rgba(167,139,250,0.2)',
                color: t.purple,
              }}>
                {card.badge}
              </div>
            )}

            <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, marginBottom: 28, maxWidth: 360 }}>
              {card.description}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {card.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 500, color: t.textPrimary }}>
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

            <Btn onClick={() => onOrder(card.id)}>Оформить карту</Btn>
          </div>
        </div>

        {/* Right */}
        <div style={{ position: isTablet ? 'static' : 'sticky', top: 100, maxWidth: isMobile ? 360 : '100%', margin: '0 auto', width: '100%' }}>
          <Card3D key={active} card={card} />
        </div>

      </div>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </Section>
  )
}
