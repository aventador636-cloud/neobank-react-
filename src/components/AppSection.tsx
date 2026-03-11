import { useState, useEffect } from 'react'
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
      title: 'Моя карта',
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

// iPhone 16 Pro Max frame constants
const FRAME_W = 280
const FRAME_H = 588
const SCREEN_X = 8
const SCREEN_Y = 12
const SCREEN_W = 264
const SCREEN_H = 556
const CORNER_R = 55
const SCREEN_R = 47

function IPhoneFrame() {
  return (
    <svg
      width={FRAME_W}
      height={FRAME_H}
      viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
      fill="none"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
    >
      <defs>
        {/* Titanium edge gradient */}
        <linearGradient id="titaniumEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="30%" stopColor="#6b6b6b" />
          <stop offset="50%" stopColor="#3d3d3d" />
          <stop offset="70%" stopColor="#5e5e5e" />
          <stop offset="100%" stopColor="#404040" />
        </linearGradient>
        {/* Glass highlight */}
        <linearGradient id="glassHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
        </linearGradient>
        {/* Mask to cut out screen area */}
        <mask id="screenCutout">
          <rect width={FRAME_W} height={FRAME_H} fill="white" />
          <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_W} height={SCREEN_H} rx={SCREEN_R} fill="black" />
        </mask>
      </defs>

      {/* Frame with screen cutout mask */}
      <g mask="url(#screenCutout)">
        {/* Outer frame — titanium edge */}
        <rect x="0" y="0" width={FRAME_W} height={FRAME_H} rx={CORNER_R} fill="url(#titaniumEdge)" />
        {/* Inner frame body — black */}
        <rect x="3" y="3" width={FRAME_W - 6} height={FRAME_H - 6} rx={CORNER_R - 3} fill="#1a1a1a" />
      </g>

      {/* Glass edge highlight stroke */}
      <rect x="0.5" y="0.5" width={FRAME_W - 1} height={FRAME_H - 1} rx={CORNER_R} fill="none" stroke="url(#glassHighlight)" strokeWidth="1" />

      {/* Dynamic Island */}
      <rect x="94" y="20" width="92" height="28" rx="14" fill="#000" />

      {/* Side buttons — Power (right) */}
      <rect x={FRAME_W - 1} y="148" width="2.5" height="64" rx="1" fill="#4a4a4a" />

      {/* Volume Up (left) */}
      <rect x="-1.5" y="128" width="2.5" height="32" rx="1" fill="#4a4a4a" />

      {/* Volume Down (left) */}
      <rect x="-1.5" y="172" width="2.5" height="32" rx="1" fill="#4a4a4a" />

      {/* Action Button (left) */}
      <rect x="-1.5" y="96" width="2.5" height="20" rx="1" fill="#4a4a4a" />
    </svg>
  )
}

function StatusBar() {
  const [now, setNow] = useState(new Date())
  const [colonVisible, setColonVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
      setColonVisible(v => !v)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      height: 36, padding: '0 4px', marginBottom: 2,
      paddingTop: 24,
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', width: 40, fontVariantNumeric: 'tabular-nums' }}>
        {hours}<span style={{ opacity: colonVisible ? 1 : 0, transition: 'opacity 0.15s ease' }}>:</span>{minutes}
      </span>
      {/* Gap for Dynamic Island overlay */}
      <div style={{ width: 92 }} />
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', width: 40, justifyContent: 'flex-end' }}>
        <svg width="14" height="10" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="8" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.8)" />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5" fill="rgba(255,255,255,0.8)" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="rgba(255,255,255,0.8)" />
          <rect x="13" y="0" width="3" height="11" rx="0.5" fill="rgba(255,255,255,0.25)" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <div style={{ width: 20, height: 10, borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.3)', padding: 1.5 }}>
            <div style={{ width: '75%', height: '100%', borderRadius: 1, background: '#4ade80' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function CardVisual() {
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="phone-card-float" style={{
        borderRadius: 16, padding: '16px 14px',
        position: 'relative', overflow: 'hidden',
        background: '#0e0b16', aspectRatio: '1.586',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(167,139,250,0.06)',
        animation: 'phoneCardIn 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 80% 0%, rgba(167,139,250,0.10) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', right: -8, bottom: -14, fontSize: 90, fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }}>N</div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 28, height: 20, borderRadius: 4, background: 'linear-gradient(135deg, #8a7340, #e8cc7a, #c4a84f)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5, opacity: 0.3 }}>
            {[9, 6, 3].map(w => <div key={w} style={{ height: 1, width: w, borderRadius: 1, background: '#fff', alignSelf: 'flex-end' }} />)}
          </div>
        </div>
        <div style={{ position: 'relative', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)' }}>5536 •••• •••• 5678</div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 7, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Card holder</div>
            <div style={{ fontSize: 10, fontWeight: 700, background: 'linear-gradient(90deg, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NeoBank Premium</div>
          </div>
          <svg width="28" height="17" viewBox="0 0 32 20" fill="none">
            <circle cx="12" cy="10" r="8" fill="#EB001B" /><circle cx="20" cy="10" r="8" fill="#F79E1B" />
            <path d="M16 3.5a8 8 0 010 13 8 8 0 010-13z" fill="#FF5F00" />
          </svg>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        {[{ l: 'Заморозить', i: '❄️' }, { l: 'PIN', i: '🔢' }, { l: 'Лимиты', i: '📊' }, { l: 'Инфо', i: '📋' }].map((a, i) => (
          <div key={a.l} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '10px 2px', borderRadius: 12,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)',
            animation: `appItemSlide 0.3s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.05}s both`,
          }}>
            <span style={{ fontSize: 16 }}>{a.i}</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>{a.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ListItems({ items, activeTab }: { items: readonly ScreenItem[]; activeTab: string }) {
  return (
    <div key={activeTab} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item: ScreenItem, i: number) => (
        <div key={item.name} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 10px', borderRadius: 14,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.05)',
          animation: `appItemSlide 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s both`,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: `${item.color}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
          }}>{item.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{item.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{item.sub}</div>
          </div>
          {item.toggle ? (
            <div style={{
              width: 36, height: 22, borderRadius: 11, flexShrink: 0,
              background: item.color === '#4ade80' ? 'linear-gradient(135deg, #34d399, #4ade80)' : 'rgba(255,255,255,0.1)',
              position: 'relative',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 2,
                left: item.color === '#4ade80' ? 16 : 2,
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }} />
            </div>
          ) : (
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, flexShrink: 0 }}>{item.amount}</div>
          )}
        </div>
      ))}
    </div>
  )
}

function BottomNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (id: string) => void }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 0 4px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {[
        { id: 'payments', label: 'Платежи', active: activeTab === 'payments' },
        { id: 'transfers', label: 'Переводы', active: activeTab === 'transfers' },
        { id: 'card', label: 'Карта', active: activeTab === 'card' },
        { id: 'more', label: 'Ещё', active: false },
      ].map(nav => (
        <div
          key={nav.label}
          onClick={() => { if (nav.id !== 'more') onTabChange(nav.id) }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: nav.id !== 'more' ? 'pointer' : 'default' }}
        >
          <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {nav.id === 'payments' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2.5" stroke={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} strokeWidth="1.5" fill="none" />
                <line x1="2" y1="8.5" x2="18" y2="8.5" stroke={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} strokeWidth="1.5" />
              </svg>
            ) : nav.id === 'transfers' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 12l6-7 6 7" stroke={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="10" y1="5" x2="10" y2="16" stroke={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : nav.id === 'card' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="5" width="14" height="10" rx="2" stroke={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} strokeWidth="1.5" fill="none" />
                <rect x="5" y="7.5" width="4" height="3" rx="0.8" fill={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="4.5" r="1.5" fill={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} />
                <circle cx="10" cy="10" r="1.5" fill={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} />
                <circle cx="10" cy="15.5" r="1.5" fill={nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)'} />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 9, fontWeight: 600, color: nav.active ? '#a78bfa' : 'rgba(255,255,255,0.25)' }}>{nav.label}</span>
        </div>
      ))}
    </div>
  )
}

function PhoneMockup({ screen, activeTab, onTabChange }: { screen: typeof tabs[number]['screen']; activeTab: string; onTabChange: (id: string) => void }) {
  const { isMobile } = useResponsive()

  return (
    <div style={{
      position: 'relative',
      width: FRAME_W,
      height: FRAME_H,
      transform: isMobile ? 'scale(0.85)' : undefined,
      transformOrigin: 'top center',
    }}>
      {/* Screen content (z-index: 1) */}
      <div style={{
        position: 'absolute',
        top: SCREEN_Y,
        left: SCREEN_X,
        width: SCREEN_W,
        height: SCREEN_H,
        borderRadius: SCREEN_R,
        overflow: 'hidden',
        background: '#0c0d0f',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}>
        {/* Status bar with Dynamic Island gap */}
        <div style={{ flexShrink: 0, padding: '0 12px' }}>
          <StatusBar />
        </div>

        {/* Title */}
        <div style={{ flexShrink: 0, padding: '0 16px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.03em' }}>
            {screen.title}
          </div>
        </div>

        {/* Content area — flex:1 absorbs variable height, no jumping */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          padding: '0 12px',
        }}>
          {activeTab === 'card' ? (
            <CardVisual />
          ) : (
            <ListItems items={screen.items} activeTab={activeTab} />
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ flexShrink: 0, padding: '0 12px' }}>
          <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Home indicator */}
        <div style={{ flexShrink: 0, padding: '5px 0 8px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 120, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
        </div>
      </div>

      {/* SVG frame overlay (z-index: 2) */}
      <IPhoneFrame />
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
            <PhoneMockup screen={tab.screen} activeTab={tab.id} onTabChange={(id) => {
              const idx = tabs.findIndex(tb => tb.id === id)
              if (idx !== -1) setActive(idx)
            }} />
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
        @keyframes phoneCardIn {
          from { opacity: 0; transform: perspective(600px) rotateY(-25deg) scale(0.9); }
          to   { opacity: 1; transform: perspective(600px) rotateY(0deg) scale(1); }
        }
        .phone-card-float {
          animation: phoneCardFloat 4s ease-in-out infinite, phoneCardIn 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes phoneCardFloat {
          0%, 100% { transform: translateY(0px) rotateX(1deg); }
          50%      { transform: translateY(-6px) rotateX(-1deg); }
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
