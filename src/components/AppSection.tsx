import { useState } from 'react'
import { t } from '../styles/tokens'
import { Section, Heading } from './Layout'
import { useResponsive } from '../hooks/useResponsive'

const tabs = [
  {
    id: 'payments',
    label: 'Платежи',
    icon: '💳',
    desc: 'Оплата ЖКХ, мобильной связи, интернета и штрафов ГИБДД — по шаблону или с автоплатежом. Настройте один раз — и забудьте о просрочках.',
    screen: {
      title: 'Платежи',
      items: [
        { icon: '🏠', name: 'ЖКХ · МосОблЕИРЦ', sub: 'Автоплатёж · каждое 15-е', amount: '-9 870 ₽', color: '#f87171' },
        { icon: '📱', name: 'Tele2 · +7 915 ***', sub: 'Баланс ниже 100 ₽ → пополнить', amount: '-300 ₽', color: '#f87171' },
        { icon: '🌐', name: 'Ростелеком Интернет', sub: 'Лицевой счёт 7830••••12', amount: '-890 ₽', color: '#f87171' },
        { icon: '🚗', name: 'Штраф ГИБДД', sub: 'УИН 188••• · скидка 50%', amount: '-750 ₽', color: '#fb923c' },
      ],
    },
  },
  {
    id: 'transfers',
    label: 'Переводы',
    icon: '↗️',
    desc: 'Переводы через СБП без комиссии, по номеру карты или между своими счетами — деньги придут за секунды в любой банк России.',
    screen: {
      title: 'Переводы',
      items: [
        { icon: '⚡', name: 'СБП · Алексей М.', sub: 'Сбербанк · мгновенно · 0 ₽', amount: '-15 000 ₽', color: '#60a5fa' },
        { icon: '💳', name: 'По номеру карты', sub: '2200 •••• 4587 · Т-Банк', amount: '-3 200 ₽', color: '#60a5fa' },
        { icon: '🔄', name: 'Между счетами', sub: 'Накопительный → Дебетовая', amount: '+50 000 ₽', color: '#4ade80' },
        { icon: '📲', name: 'Запрос денег', sub: 'Мария И. · ожидает оплаты', amount: '2 500 ₽', color: '#a78bfa' },
      ],
    },
  },
  {
    id: 'card',
    label: 'Карта',
    icon: '⚙️',
    desc: 'Заморозка за секунду, лимиты на покупки и снятие, смена PIN-кода, подключение Apple Pay — вся настройка прямо в приложении.',
    screen: {
      title: 'Настройки карты',
      items: [
        { icon: '❄️', name: 'Временная блокировка', sub: 'Разморозить в любой момент', amount: '', color: '#a78bfa', toggle: true },
        { icon: '🛡️', name: 'Лимит на покупки', sub: '100 000 ₽ / сутки', amount: '', color: '#4ade80', toggle: true },
        { icon: '🏧', name: 'Снятие наличных', sub: '50 000 ₽ / сутки без комиссии', amount: '', color: '#4ade80', toggle: true },
        { icon: '🔔', name: 'Уведомления по операциям', sub: 'Push + SMS для сумм > 1 000 ₽', amount: '', color: '#4ade80', toggle: true },
      ],
    },
  },
] as const

interface ScreenItem {
  icon: string
  name: string
  sub: string
  amount: string
  color: string
  toggle?: boolean
}

function PhoneMockup({ screen, activeTab }: { screen: typeof tabs[number]['screen']; activeTab: string }) {
  return (
    <div style={{ position: 'relative', width: 280, margin: '0 auto' }}>
      {/* ── Titanium frame ── */}
      <div style={{
        position: 'relative',
        borderRadius: 48,
        padding: 3,
        background: 'linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 60%, #48484a 100%)',
        boxShadow: `
          0 50px 100px rgba(0,0,0,0.6),
          0 0 0 1px rgba(255,255,255,0.06),
          inset 0 1px 0 rgba(255,255,255,0.08),
          0 0 80px rgba(129,140,248,0.05)
        `,
      }}>
        {/* Side button — Power (right) */}
        <div style={{
          position: 'absolute', right: -2.5, top: 110, width: 3, height: 48,
          borderRadius: '0 3px 3px 0',
          background: 'linear-gradient(180deg, #48484a, #2c2c2e, #48484a)',
        }} />
        {/* Side buttons — Volume (left) */}
        <div style={{
          position: 'absolute', left: -2.5, top: 100, width: 3, height: 28,
          borderRadius: '3px 0 0 3px',
          background: 'linear-gradient(180deg, #48484a, #2c2c2e, #48484a)',
        }} />
        <div style={{
          position: 'absolute', left: -2.5, top: 138, width: 3, height: 28,
          borderRadius: '3px 0 0 3px',
          background: 'linear-gradient(180deg, #48484a, #2c2c2e, #48484a)',
        }} />

        {/* ── Screen ── */}
        <div style={{
          borderRadius: 45,
          overflow: 'hidden',
          background: '#000000',
          position: 'relative',
        }}>

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            zIndex: 10,
            width: 120, height: 34,
            borderRadius: 20,
            background: '#000000',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {/* Front camera */}
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #1a1a2e 0%, #0a0a0f 60%)',
              boxShadow: 'inset 0 0 2px rgba(100,100,255,0.15), 0 0 3px rgba(0,0,0,0.5)',
            }} />
          </div>

          {/* Screen content area */}
          <div style={{ padding: '14px 14px 10px', minHeight: 520, background: '#0c0d0f' }}>

            {/* Status bar — around Dynamic Island */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              height: 44, marginBottom: 8, padding: '0 4px',
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', width: 50 }}>9:41</span>
              <div style={{ width: 120 }} /> {/* Dynamic Island space */}
              <div style={{ display: 'flex', gap: 5, alignItems: 'center', width: 50, justifyContent: 'flex-end' }}>
                {/* Signal bars */}
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="8" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.9)" />
                  <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5" fill="rgba(255,255,255,0.9)" />
                  <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="rgba(255,255,255,0.9)" />
                  <rect x="13" y="0" width="3" height="11" rx="0.5" fill="rgba(255,255,255,0.35)" />
                </svg>
                {/* WiFi */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M7 9.5a1 1 0 100-2 1 1 0 000 2z" fill="rgba(255,255,255,0.9)" />
                  <path d="M4 6.5a4.2 4.2 0 016 0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M1.5 4a7.5 7.5 0 0111 0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
                {/* Battery */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <div style={{
                    width: 22, height: 11, borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.35)',
                    padding: 1.5, position: 'relative',
                  }}>
                    <div style={{
                      width: '75%', height: '100%', borderRadius: 1.5,
                      background: '#4ade80',
                    }} />
                  </div>
                  <div style={{
                    width: 1.5, height: 4, borderRadius: '0 1px 1px 0',
                    background: 'rgba(255,255,255,0.35)',
                  }} />
                </div>
              </div>
            </div>

            {/* Title */}
            <div style={{
              fontSize: 28, fontWeight: 800, color: '#fff',
              marginBottom: 20, letterSpacing: '-0.03em', padding: '0 4px',
            }}>
              {screen.title}
            </div>

            {/* Items */}
            <div key={activeTab} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {screen.items.map((item: ScreenItem, i: number) => (
                <div key={item.name} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 12px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  animation: `appItemSlide 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s both`,
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: `${item.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{item.sub}</div>
                  </div>
                  {item.toggle ? (
                    <div style={{
                      width: 42, height: 26, borderRadius: 13,
                      background: item.color === '#4ade80'
                        ? 'linear-gradient(135deg, #34d399, #4ade80)'
                        : 'rgba(255,255,255,0.1)',
                      position: 'relative', flexShrink: 0,
                      transition: 'background 0.3s ease',
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: '#fff',
                        position: 'absolute', top: 2,
                        left: item.color === '#4ade80' ? 18 : 2,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                        transition: 'left 0.2s ease',
                      }} />
                    </div>
                  ) : (
                    <div style={{ fontSize: 14, fontWeight: 700, color: item.color, flexShrink: 0 }}>
                      {item.amount}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom navigation bar */}
            <div style={{
              display: 'flex', justifyContent: 'space-around', alignItems: 'center',
              marginTop: 24, padding: '12px 0 4px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              {[
                { icon: '🏠', label: 'Главная', active: false },
                { icon: '💳', label: 'Карта', active: activeTab === 'card' },
                { icon: '↗️', label: 'Перевод', active: activeTab === 'transfers' },
                { icon: '⚙️', label: 'Ещё', active: false },
              ].map(nav => (
                <div key={nav.label} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                }}>
                  <span style={{ fontSize: 18, opacity: nav.active ? 1 : 0.4 }}>{nav.icon}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.02em',
                    color: nav.active ? '#a78bfa' : 'rgba(255,255,255,0.3)',
                  }}>{nav.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div style={{
            padding: '6px 0 8px', background: '#0c0d0f',
            display: 'flex', justifyContent: 'center',
          }}>
            <div style={{
              width: 130, height: 5, borderRadius: 3,
              background: 'rgba(255,255,255,0.2)',
            }} />
          </div>
        </div>
      </div>

      {/* Reflection on surface */}
      <div style={{
        position: 'absolute', bottom: -40, left: '10%', right: '10%', height: 40,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)',
        filter: 'blur(8px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default function AppSection() {
  const { isMobile } = useResponsive()
  const [active, setActive] = useState(0)
  const tab = tabs[active]

  return (
    <Section id="app">
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56 }}>
        <Heading size="lg">Всё в одном приложении</Heading>
        <p style={{ fontSize: 16, color: t.textSecondary, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
          Полный контроль над финансами — в кармане
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 32 : 64,
        alignItems: 'center',
      }}>
        {/* Left: tabs + description */}
        <div style={{ order: isMobile ? 2 : 1 }}>
          {/* Tab buttons with progress */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            marginBottom: 32,
          }}>
            {tabs.map((tb, i) => {
              const isActive = active === i
              return (
                <button key={tb.id} onClick={() => setActive(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 18px', borderRadius: t.r16,
                  border: `1px solid ${isActive ? 'rgba(167,139,250,0.20)' : t.border}`,
                  background: isActive ? 'rgba(167,139,250,0.06)' : 'transparent',
                  color: isActive ? t.textPrimary : t.textTertiary,
                  fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  WebkitTapHighlightColor: 'transparent',
                  position: 'relative', overflow: 'hidden',
                  textAlign: 'left',
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = 'transparent' } }}
                >
                  <span className={isActive ? `app-icon-${tb.id}` : ''} style={{
                    width: 36, height: 36, borderRadius: t.r12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                    background: isActive ? 'rgba(167,139,250,0.12)' : 'rgba(255,255,255,0.04)',
                    transition: 'background 0.3s ease',
                  }}>{tb.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{tb.label}</div>
                    <div style={{
                      fontSize: 12, fontWeight: 400,
                      color: isActive ? t.textSecondary : t.textTertiary,
                      transition: 'color 0.3s ease',
                    }}>
                      {tb.id === 'payments' ? 'ЖКХ, связь, штрафы, подписки' :
                       tb.id === 'transfers' ? 'СБП, по карте, между счетами' :
                       'Лимиты, блокировка, PIN, NFC'}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Description */}
          <div key={tab.id} style={{ animation: 'appFadeIn 0.3s ease' }}>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.7, color: t.textSecondary, marginBottom: 28 }}>
              {tab.desc}
            </p>

            {/* Feature highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Push и SMS по каждой операции', 'Face ID и отпечаток пальца', 'Оплата через Apple Pay и Google Pay'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: t.textPrimary }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: phone mockup */}
        <div style={{ order: isMobile ? 1 : 2, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            {/* Glow behind phone */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 250, height: 350, pointerEvents: 'none',
              background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }} />
            <PhoneMockup screen={tab.screen} activeTab={tab.id} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes appItemSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes appFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.18); }
        }
        @keyframes iconSlide {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(3px) translateY(-2px); }
          75%      { transform: translateX(-1px); }
        }
        @keyframes iconSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .app-icon-payments { animation: iconPulse 2s ease-in-out infinite; }
        .app-icon-transfers { animation: iconSlide 2s ease-in-out infinite; }
        .app-icon-card { animation: iconSpin 4s linear infinite; }
      `}</style>
    </Section>
  )
}
