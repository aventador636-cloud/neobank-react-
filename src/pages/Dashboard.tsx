import { useState } from 'react'
import { t } from '../styles/tokens'
import { useAuth } from '../context/AuthContext'
import { cards } from '../data/cards'
import type { CardProduct } from '../data/cards'
import Card3D from '../components/Card3D'

interface Transaction {
  id: number
  name: string
  category: string
  amount: number
  date: string
  icon: string
}

const TRANSACTIONS: Transaction[] = [
  { id: 1, name: 'Лента',            category: 'Супермаркеты', amount: -2340,  date: '5 мар',  icon: '🛒' },
  { id: 2, name: 'Пополнение счёта', category: 'Входящий',     amount: +50000, date: '4 мар',  icon: '💰' },
  { id: 3, name: 'Netflix',          category: 'Подписки',      amount: -699,   date: '3 мар',  icon: '🎬' },
  { id: 4, name: 'Яндекс Еда',       category: 'Рестораны',     amount: -1850,  date: '3 мар',  icon: '🍕' },
  { id: 5, name: 'Кэшбэк',           category: 'Вознаграждение',amount: +450,   date: '2 мар',  icon: '💎' },
  { id: 6, name: 'М.Видео',          category: 'Покупки',       amount: -15990, date: '1 мар',  icon: '🛍️' },
  { id: 7, name: 'Такси',            category: 'Транспорт',     amount: -380,   date: '28 фев', icon: '🚕' },
  { id: 8, name: 'Аптека 36.6',      category: 'Здоровье',      amount: -1240,  date: '27 фев', icon: '💊' },
]

const QUICK_ACTIONS = [
  { label: 'Перевести',  icon: '↑' },
  { label: 'Оплатить',   icon: '⚡' },
  { label: 'Пополнить',  icon: '↓' },
  { label: 'История',    icon: '☰' },
]

function formatAmount(n: number) {
  const abs = Math.abs(n).toLocaleString('ru-RU')
  return (n > 0 ? '+' : '−') + ' ' + abs + ' ₽'
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 6)  return 'Доброй ночи'
  if (h < 12) return 'Доброе утро'
  if (h < 18) return 'Добрый день'
  return 'Добрый вечер'
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [activeCard, setActiveCard] = useState(0)
  const [tab, setTab] = useState<'overview' | 'profile'>('overview')

  const userCard: CardProduct = {
    ...cards[activeCard],
    holder: user?.name.toUpperCase() ?? 'КЛИЕНТ',
  }

  const balance = [45_230, 128_450, 2_400_000][activeCard]

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: t.fontFamily }}>

      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(8,9,10,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${t.border}`,
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="shimmer" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>NeoBank</span>

          <div style={{ display: 'flex', gap: 8 }}>
            {(['overview', 'profile'] as const).map(tp => (
              <button key={tp} onClick={() => setTab(tp)} style={{
                background: tab === tp ? t.surfaceHover : 'none',
                border: `1px solid ${tab === tp ? t.borderHover : 'transparent'}`,
                borderRadius: t.r999, padding: '6px 16px',
                color: tab === tp ? t.textPrimary : t.textSecondary,
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: t.ease,
              }}>
                {tp === 'overview' ? 'Обзор' : 'Профиль'}
              </button>
            ))}
            <button onClick={logout} style={{
              background: 'none', border: `1px solid ${t.border}`,
              borderRadius: t.r999, padding: '6px 16px',
              color: t.textSecondary, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: t.ease,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
              onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 80px' }}>

        {tab === 'overview' ? (
          <>
            {/* Greeting */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 14, color: t.textTertiary, marginBottom: 4 }}>{getGreeting()},</p>
              <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: t.textPrimary }}>
                {user?.name.split(' ')[0]} 👋
              </h1>
            </div>

            {/* Card + Balance */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40, alignItems: 'start' }}>

              {/* Card picker */}
              <div>
                <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                  {cards.map((c, i) => (
                    <button key={c.id} onClick={() => setActiveCard(i)} style={{
                      flex: 1, padding: '6px 4px', borderRadius: t.r8,
                      background: activeCard === i ? t.surfaceHover : 'none',
                      border: `1px solid ${activeCard === i ? t.borderHover : 'transparent'}`,
                      color: activeCard === i ? t.textPrimary : t.textTertiary,
                      fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: t.ease,
                      textAlign: 'center',
                    }}>
                      {c.id === 'standard' ? 'Standard' : c.id === 'premium' ? 'Premium' : 'Diners'}
                    </button>
                  ))}
                </div>
                <Card3D card={userCard} />
              </div>

              {/* Balance & actions */}
              <div style={{ paddingTop: 52 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: t.textTertiary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Текущий баланс
                </p>
                <div className="shimmer" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>
                  {balance.toLocaleString('ru-RU')} ₽
                </div>
                <p style={{ fontSize: 13, color: t.textTertiary, marginBottom: 32 }}>
                  {userCard.number}
                </p>

                {/* Quick actions */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {QUICK_ACTIONS.map(a => (
                    <button key={a.label} style={{
                      background: t.surfaceHover, border: `1px solid ${t.border}`,
                      borderRadius: t.r16, padding: '14px 8px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      cursor: 'pointer', transition: t.ease, color: t.textPrimary,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHover; e.currentTarget.style.background = '#1e2025' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.surfaceHover }}
                    >
                      <span style={{ fontSize: 18 }}>{a.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: t.textSecondary }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary }}>Последние операции</h2>
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: t.purple, fontSize: 13, fontWeight: 600,
                }}>
                  Все операции →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {TRANSACTIONS.map((tx, i) => (
                  <div key={tx.id} style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '14px 16px', borderRadius: t.r16,
                    background: t.surface,
                    borderTop: i === 0 ? 'none' : `1px solid ${t.border}`,
                    transition: t.ease, cursor: 'default',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = t.surfaceHover)}
                    onMouseLeave={e => (e.currentTarget.style.background = t.surface)}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%',
                      background: t.surfaceHover, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 18,
                      flexShrink: 0,
                    }}>
                      {tx.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary }}>{tx.name}</div>
                      <div style={{ fontSize: 12, color: t.textTertiary }}>{tx.category} · {tx.date}</div>
                    </div>

                    <div style={{
                      fontSize: 15, fontWeight: 700,
                      color: tx.amount > 0 ? t.green : t.textPrimary,
                      whiteSpace: 'nowrap',
                    }}>
                      {formatAmount(tx.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Profile tab */
          <div style={{ maxWidth: 480 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: t.textPrimary, marginBottom: 32 }}>Профиль</h1>

            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.r24, overflow: 'hidden' }}>
              {[
                { label: 'Имя', value: user?.name },
                { label: 'Телефон', value: user?.phone },
                { label: 'Статус', value: 'Верифицирован ✓' },
                { label: 'Тариф', value: cards[activeCard].title },
                { label: 'Дата регистрации', value: '1 января 2024' },
              ].map((row, i, arr) => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 24px',
                  borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
                }}>
                  <span style={{ fontSize: 13, color: t.textTertiary, fontWeight: 500 }}>{row.label}</span>
                  <span style={{ fontSize: 14, color: t.textPrimary, fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button onClick={logout} style={{
              marginTop: 24, width: '100%', height: 48,
              background: 'none', border: `1px solid rgba(248,113,113,0.3)`,
              borderRadius: t.r12, color: '#f87171',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: t.ease,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.08)'; e.currentTarget.style.borderColor = '#f87171' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)' }}
            >
              Выйти из аккаунта
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
