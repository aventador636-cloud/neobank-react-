import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { t } from '../styles/tokens'
import { useAuth } from '../context/AuthContext'
import { cards } from '../data/cards'
import type { CardProduct } from '../data/cards'
import Card3D from '../components/Card3D'
import { useResponsive } from '../hooks/useResponsive'

interface Transaction {
  id: number
  name: string
  category: string
  amount: number
  date: string
  month: string
  icon: string
}

const TRANSACTIONS: Transaction[] = [
  { id:  1, name: 'Лента',            category: 'Супермаркеты',  amount: -2340,   date: '5 мар',  month: 'Март 2026',    icon: '🛒' },
  { id:  2, name: 'Пополнение счёта', category: 'Входящий',      amount: +50000,  date: '4 мар',  month: 'Март 2026',    icon: '💰' },
  { id:  3, name: 'Netflix',          category: 'Подписки',      amount: -699,    date: '3 мар',  month: 'Март 2026',    icon: '🎬' },
  { id:  4, name: 'Яндекс Еда',       category: 'Рестораны',     amount: -1850,   date: '3 мар',  month: 'Март 2026',    icon: '🍕' },
  { id:  5, name: 'Кэшбэк',           category: 'Вознаграждение',amount: +450,    date: '2 мар',  month: 'Март 2026',    icon: '💎' },
  { id:  6, name: 'М.Видео',          category: 'Покупки',       amount: -15990,  date: '1 мар',  month: 'Март 2026',    icon: '🛍️' },
  { id:  7, name: 'Spotify',          category: 'Подписки',      amount: -899,    date: '1 мар',  month: 'Март 2026',    icon: '🎵' },
  { id:  8, name: 'Такси',            category: 'Транспорт',     amount: -380,    date: '28 фев', month: 'Февраль 2026', icon: '🚕' },
  { id:  9, name: 'Аптека 36.6',      category: 'Здоровье',      amount: -1240,   date: '27 фев', month: 'Февраль 2026', icon: '💊' },
  { id: 10, name: 'Зарплата',         category: 'Входящий',      amount: +120000, date: '25 фев', month: 'Февраль 2026', icon: '💰' },
  { id: 11, name: 'Ашан',             category: 'Супермаркеты',  amount: -4560,   date: '24 фев', month: 'Февраль 2026', icon: '🛒' },
  { id: 12, name: 'Steam',            category: 'Подписки',      amount: -2990,   date: '22 фев', month: 'Февраль 2026', icon: '🎮' },
  { id: 13, name: 'Кофемания',        category: 'Рестораны',     amount: -890,    date: '20 фев', month: 'Февраль 2026', icon: '☕' },
  { id: 14, name: 'Кэшбэк',          category: 'Вознаграждение',amount: +1200,   date: '18 фев', month: 'Февраль 2026', icon: '💎' },
  { id: 15, name: 'Авиабилеты',       category: 'Путешествия',   amount: -34500,  date: '15 фев', month: 'Февраль 2026', icon: '✈️' },
  { id: 16, name: 'ChatGPT Plus',     category: 'Подписки',      amount: -1840,   date: '10 фев', month: 'Февраль 2026', icon: '🤖' },
  { id: 17, name: 'Wildberries',      category: 'Покупки',       amount: -3200,   date: '5 фев',  month: 'Февраль 2026', icon: '🛍️' },
  { id: 18, name: 'Пополнение счёта', category: 'Входящий',      amount: +50000,  date: '31 янв', month: 'Январь 2026',  icon: '💰' },
  { id: 19, name: 'Яндекс Маркет',   category: 'Покупки',       amount: -5600,   date: '28 янв', month: 'Январь 2026',  icon: '🛍️' },
  { id: 20, name: 'Ресторан Белуга',  category: 'Рестораны',     amount: -8900,   date: '25 янв', month: 'Январь 2026',  icon: '🍽️' },
  { id: 21, name: 'Убер',             category: 'Транспорт',     amount: -560,    date: '20 янв', month: 'Январь 2026',  icon: '🚕' },
  { id: 22, name: 'Кэшбэк',          category: 'Вознаграждение',amount: +890,    date: '15 янв', month: 'Январь 2026',  icon: '💎' },
  { id: 23, name: 'Apple Music',      category: 'Подписки',      amount: -999,    date: '10 янв', month: 'Январь 2026',  icon: '🎵' },
  { id: 24, name: 'Лента',            category: 'Супермаркеты',  amount: -1890,   date: '5 янв',  month: 'Январь 2026',  icon: '🛒' },
]

const ALL_CATEGORIES = ['Все', 'Входящий', 'Покупки', 'Супермаркеты', 'Рестораны', 'Подписки', 'Транспорт', 'Здоровье', 'Путешествия', 'Вознаграждение']

function HistoryModal({ onClose, transactions }: { onClose: () => void; transactions: Transaction[] }) {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('Все')

  const filtered = transactions.filter(tx => {
    const matchCat    = filter === 'Все' || tx.category === filter
    const matchSearch = tx.name.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const grouped = filtered.reduce<Record<string, Transaction[]>>((acc, tx) => {
    if (!acc[tx.month]) acc[tx.month] = []
    acc[tx.month].push(tx)
    return acc
  }, {})

  const totalIncome  = filtered.filter(tx => tx.amount > 0).reduce((s, tx) => s + tx.amount, 0)
  const totalExpense = filtered.filter(tx => tx.amount < 0).reduce((s, tx) => s + Math.abs(tx.amount), 0)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      <div style={{
        width: '100%', maxWidth: 680, height: '90vh',
        background: t.surface, borderRadius: `${t.r24} ${t.r24} 0 0`,
        border: `1px solid ${t.border}`, borderBottom: 'none',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
        animation: 'drawerUp 0.3s ease',
      }}>

        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border }} />
        </div>

        {/* Header */}
        <div style={{ padding: '16px 24px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.textPrimary }}>История операций</div>
            <button onClick={onClose} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: t.textTertiary, fontSize: 22, lineHeight: 1, transition: t.ease,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
              onMouseLeave={e => (e.currentTarget.style.color = t.textTertiary)}
            >×</button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: t.r16, padding: '12px 16px' }}>
              <div style={{ fontSize: 11, color: t.green, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Поступления</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.green }}>+{totalIncome.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: t.r16, padding: '12px 16px' }}>
              <div style={{ fontSize: 11, color: '#f87171', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Расходы</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#f87171' }}>−{totalExpense.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>

          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Поиск по операциям..."
            style={{
              width: '100%', boxSizing: 'border-box',
              background: t.bg, border: `1px solid ${t.border}`,
              borderRadius: t.r12, padding: '10px 14px',
              color: t.textPrimary, fontSize: 14, fontFamily: t.fontFamily,
              outline: 'none', transition: t.ease, marginBottom: 12,
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)')}
            onBlur={e => (e.currentTarget.style.borderColor = t.border)}
          />

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
            {ALL_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                flexShrink: 0, padding: '5px 12px', borderRadius: t.r999, border: 'none',
                background: filter === cat ? 'linear-gradient(90deg, #a78bfa, #60a5fa)' : t.surfaceHover,
                color: filter === cat ? '#fff' : t.textSecondary,
                fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: t.ease,
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px', scrollbarWidth: 'thin', scrollbarColor: `${t.border} transparent` }}>
          {Object.keys(grouped).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: t.textTertiary, fontSize: 14 }}>
              Операции не найдены
            </div>
          ) : (
            Object.entries(grouped).map(([month, txs]) => (
              <div key={month} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.textTertiary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {month}
                </div>
                <div style={{ background: t.bg, borderRadius: t.r16, overflow: 'hidden', border: `1px solid ${t.border}` }}>
                  {txs.map((tx, i) => (
                    <div key={tx.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '13px 16px',
                      borderTop: i > 0 ? `1px solid ${t.border}` : 'none',
                      transition: t.ease, cursor: 'default',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = t.surfaceHover)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                        background: t.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
                      }}>{tx.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.name}</div>
                        <div style={{ fontSize: 12, color: t.textTertiary }}>{tx.category} · {tx.date}</div>
                      </div>
                      <div style={{
                        fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap',
                        color: tx.amount > 0 ? t.green : t.textPrimary,
                      }}>
                        {formatAmount(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes drawerUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}

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

// ── Service icons ─────────────────────────────────────────────────────────────

function SteamIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1b2838"/>
      <path d="M16 7a9 9 0 0 1 8.94 10.22L21.5 15.8A5.5 5.5 0 1 0 10.56 19l-4.1-1.7A9 9 0 0 1 16 7z" fill="#c6d4df"/>
      <circle cx="16" cy="16" r="3.5" fill="#1b2838" stroke="#c6d4df" strokeWidth="1.2"/>
      <path d="M6.5 17.3l4.2 1.74a3.5 3.5 0 0 0 6.52 1.2l4.5 1.87A9 9 0 0 1 6.5 17.3z" fill="#4c6b8a"/>
    </svg>
  )
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1DB954"/>
      <path d="M22.5 21.5c-.3 0-.5-.1-.7-.2-3.3-2-7.4-2.4-12.3-1.3-.5.1-1-.2-1.1-.7-.1-.5.2-1 .7-1.1 5.3-1.2 9.9-.7 13.6 1.5.4.2.6.8.3 1.2-.1.4-.3.6-.5.6zm1.5-3.5c-.3 0-.6-.1-.8-.3-3.8-2.3-9.5-3-13.9-1.6-.6.2-1.2-.2-1.3-.7-.2-.6.2-1.2.7-1.3 5-1.5 11.3-.8 15.6 1.8.5.3.7 1 .4 1.5-.2.4-.4.6-.7.6zm.2-3.6c-.3 0-.6-.1-.8-.2-4.3-2.5-11.4-2.8-15.5-1.5-.7.2-1.4-.2-1.6-.9-.2-.7.2-1.4.9-1.6 4.7-1.4 12.5-1.1 17.4 1.8.6.4.8 1.1.5 1.7-.3.5-.6.7-.9.7z" fill="white"/>
    </svg>
  )
}

function NetflixIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#141414"/>
      <path d="M9 7h3.5l4 10.5V7H20v18l-3.5-.1-4-10.4V25H9V7z" fill="#E50914"/>
    </svg>
  )
}

function ChatGPTIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#10a37f"/>
      <path d="M24.5 14.3a5.8 5.8 0 0 0-.5-4.7 6 6 0 0 0-6.4-2.9 5.8 5.8 0 0 0-4.4-2 6 6 0 0 0-5.7 4.1 5.8 5.8 0 0 0-3.8 2.8 6 6 0 0 0 .7 7 5.8 5.8 0 0 0 .5 4.7 6 6 0 0 0 6.4 2.9 5.8 5.8 0 0 0 4.4 2 6 6 0 0 0 5.7-4.2 5.8 5.8 0 0 0 3.8-2.8 6 6 0 0 0-.7-6.9zm-9 12.6a4.4 4.4 0 0 1-2.8-1l.1-.1 4.7-2.7a.8.8 0 0 0 .4-.6v-6.6l2 1.1v5.4a4.4 4.4 0 0 1-4.4 4.5zm-9.5-4a4.4 4.4 0 0 1-.5-3l.1.1 4.7-2.7a.8.8 0 0 0 .4-.7V10l2 1.1v5.4l-4.8 2.8a4.4 4.4 0 0 1-1.9.6zm-1.2-10.4a4.4 4.4 0 0 1 2.3-1.9v5.5a.8.8 0 0 0 .4.7l4.7 2.7-2 1.2-4.7-2.7a4.4 4.4 0 0 1-.7-5.5zm16.4 3.8-4.7-2.7 2-1.1 4.7 2.7a4.4 4.4 0 0 1-.7 7.9V17a.8.8 0 0 0-.4-.7h.1zm2-3.1-.1-.1-4.7-2.7a.8.8 0 0 0-.8 0l-4.7 2.7v-2.2l4.7-2.7a4.4 4.4 0 0 1 5.6 5zm-10.3 3.4-2-1.1V9.9a4.4 4.4 0 0 1 7.2-3.4l-.1.1-4.7 2.7a.8.8 0 0 0-.4.7v6.4zm1.1-2.3 2.1-1.2 2.1 1.2v2.4l-2.1 1.2-2.1-1.2v-2.4z" fill="white"/>
    </svg>
  )
}

function ClaudeIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#D97757"/>
      <path d="M20.2 9H18l-4.5 14h2.3l1.1-3.6h4.6l1.1 3.6H25L20.2 9zm-2.7 8.4 1.7-5.5 1.7 5.5h-3.4zM11.8 9H9.5L6 23h2.3l.9-3h3.9l.9 3h2.3L12.5 9h-.7zm-2.6 9 1.5-5 1.5 5H9.2z" fill="white"/>
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#FF0000"/>
      <path d="M25.8 11.2a2.8 2.8 0 0 0-2-2C22.1 9 16 9 16 9s-6.1 0-7.8.2a2.8 2.8 0 0 0-2 2C6 12.9 6 16 6 16s0 3.1.2 4.8a2.8 2.8 0 0 0 2 2C9.9 23 16 23 16 23s6.1 0 7.8-.2a2.8 2.8 0 0 0 2-2C26 19.1 26 16 26 16s0-3.1-.2-4.8z" fill="#FF0000"/>
      <path d="M13.5 19.5v-7l6.5 3.5-6.5 3.5z" fill="white"/>
    </svg>
  )
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#am-grad)"/>
      <defs>
        <linearGradient id="am-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fc3c44"/>
          <stop offset="1" stopColor="#ff2d55"/>
        </linearGradient>
      </defs>
      <path d="M21 8.5v10.2a3 3 0 1 1-2-2.8V11L13 12.3v8.4a3 3 0 1 1-2-2.8V10.8L21 8.5z" fill="white"/>
    </svg>
  )
}

function AdobeIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#FF0000"/>
      <path d="M18.5 8h5.5v16l-5.5-16zM13.5 8H8v16l5.5-16zM16 14.5l3.5 9.5h-2.8l-1-3h-3.4l3.7-6.5z" fill="white"/>
    </svg>
  )
}

function MidjourneyIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#000"/>
      <path d="M5 22c2-4 4.5-7 7-8.5L16 8l4 5.5c2.5 1.5 5 4.5 7 8.5H5z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <ellipse cx="16" cy="22" rx="5" ry="2.5" stroke="white" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#5865F2"/>
      <path d="M22.5 10a16 16 0 0 0-4-1.2l-.2.4c-1.4-.3-2.8-.3-4.2 0l-.2-.4A16 16 0 0 0 9.5 10 16.5 16.5 0 0 0 7 22a16 16 0 0 0 4.9 2.5l1-1.3a10.5 10.5 0 0 1-1.6-.8l.4-.3a11.4 11.4 0 0 0 9.7 0l.4.3a10.5 10.5 0 0 1-1.6.8l1 1.3A16 16 0 0 0 25.1 22 16.5 16.5 0 0 0 22.5 10zm-8.7 9.3a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8zm6.4 0a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8z" fill="white"/>
    </svg>
  )
}

function GithubCopilotIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#24292e"/>
      <circle cx="16" cy="14" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
      <circle cx="13" cy="13" r="1.5" fill="white"/>
      <circle cx="19" cy="13" r="1.5" fill="white"/>
      <path d="M12 17.5c1 1.5 3 1.5 4 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M10 20c1.5 3 8.5 3 12 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="8" fill="#1e1e1e"/>
      <rect x="11" y="7" width="5" height="5" rx="2.5" fill="#F24E1E"/>
      <rect x="16" y="7" width="5" height="5" rx="2.5" fill="#FF7262"/>
      <rect x="11" y="12" width="5" height="5" rx="2.5" fill="#A259FF"/>
      <rect x="11" y="17" width="5" height="5" rx="2.5" fill="#0ACF83"/>
      <circle cx="18.5" cy="14.5" r="2.5" fill="#1ABCFE"/>
    </svg>
  )
}

interface Service { name: string; price: string; priceRub: number; icon: React.ReactNode; tag?: string; serviceIcon: string }
interface ServiceGroup { category: string; items: Service[] }

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    category: '🤖 ИИ-сервисы',
    items: [
      { name: 'ChatGPT Plus',   price: '$20 / мес',    priceRub: 1840,  icon: <ChatGPTIcon />,      serviceIcon: '🤖', tag: 'Популярно' },
      { name: 'Claude Pro',     price: '$20 / мес',    priceRub: 1840,  icon: <ClaudeIcon />,       serviceIcon: '🤖', tag: 'Новинка'   },
      { name: 'Midjourney',     price: '$10 / мес',    priceRub: 920,   icon: <MidjourneyIcon />,   serviceIcon: '🎨'                  },
      { name: 'GitHub Copilot', price: '$10 / мес',    priceRub: 920,   icon: <GithubCopilotIcon />,serviceIcon: '💻'                  },
    ],
  },
  {
    category: '🎬 Видео',
    items: [
      { name: 'Netflix',         price: '$15.49 / мес', priceRub: 1425, icon: <NetflixIcon />,  serviceIcon: '🎬', tag: 'Хит' },
      { name: 'YouTube Premium', price: '$13.99 / мес', priceRub: 1287, icon: <YoutubeIcon />,  serviceIcon: '▶️'             },
    ],
  },
  {
    category: '🎵 Музыка',
    items: [
      { name: 'Spotify Premium', price: '$9.99 / мес',  priceRub: 919,  icon: <SpotifyIcon />,     serviceIcon: '🎵' },
      { name: 'Apple Music',     price: '$10.99 / мес', priceRub: 1011, icon: <AppleMusicIcon />,  serviceIcon: '🎵' },
    ],
  },
  {
    category: '🎮 Игры и творчество',
    items: [
      { name: 'Steam',                price: 'по счёту',     priceRub: 2990,  icon: <SteamIcon />,   serviceIcon: '🎮' },
      { name: 'Discord Nitro',        price: '$9.99 / мес',  priceRub: 919,   icon: <DiscordIcon />, serviceIcon: '💬' },
      { name: 'Adobe Creative Cloud', price: '$54.99 / мес', priceRub: 5059,  icon: <AdobeIcon />,   serviceIcon: '🎨' },
      { name: 'Figma Professional',   price: '$15 / мес',    priceRub: 1380,  icon: <FigmaIcon />,   serviceIcon: '🎨' },
    ],
  },
]

function todayLabel(): { date: string; month: string } {
  const now    = new Date()
  const d      = now.getDate()
  const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
  const mFull  = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
  return { date: `${d} ${months[now.getMonth()]}`, month: `${mFull[now.getMonth()]} ${now.getFullYear()}` }
}

function PayModal({ onClose, onPaid }: { onClose: () => void; onPaid: (tx: Transaction) => void }) {
  const [selected, setSelected] = useState<Service | null>(null)
  const [paid, setPaid] = useState(false)
  const { isMobile } = useResponsive()

  const handlePay = () => {
    if (!selected) return
    const { date, month } = todayLabel()
    onPaid({
      id:       Date.now(),
      name:     selected.name,
      category: 'Подписки',
      amount:   -selected.priceRub,
      date,
      month,
      icon:     selected.serviceIcon,
    })
    setPaid(true)
    setTimeout(onClose, 1800)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      <div style={{
        width: isMobile ? '94vw' : 480, maxHeight: '85vh',
        background: t.surface, border: `1px solid ${t.border}`,
        borderRadius: t.r24, display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        animation: 'modalSlide 0.25s ease',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          padding: '22px 24px 18px', borderBottom: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary }}>Оплата сервисов</div>
            <div style={{ fontSize: 13, color: t.textTertiary, marginTop: 2 }}>Зарубежные подписки через NeoBank</div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: t.textTertiary, fontSize: 22, lineHeight: 1, padding: 4, transition: t.ease,
          }}
            onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
            onMouseLeave={e => (e.currentTarget.style.color = t.textTertiary)}
          >×</button>
        </div>

        {/* Service list */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 24px', scrollbarWidth: 'thin', scrollbarColor: `${t.border} transparent` }}>
          {SERVICE_GROUPS.map(group => (
            <div key={group.category} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textTertiary, marginBottom: 8 }}>
                {group.category}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {group.items.map(item => {
                  const isSelected = selected?.name === item.name
                  return (
                    <button key={item.name} onClick={() => setSelected(isSelected ? null : item)} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 14px', borderRadius: t.r16, cursor: 'pointer',
                      background: isSelected ? 'rgba(167,139,250,0.1)' : t.surfaceHover,
                      border: `1px solid ${isSelected ? 'rgba(167,139,250,0.4)' : 'transparent'}`,
                      transition: t.ease, textAlign: 'left',
                    }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = t.border }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'transparent' }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: t.r12, flexShrink: 0,
                        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, display: 'flex', alignItems: 'center', gap: 8 }}>
                          {item.name}
                          {item.tag && (
                            <span style={{
                              fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: t.r999,
                              background: 'rgba(167,139,250,0.15)', color: t.purple, letterSpacing: '0.04em',
                            }}>{item.tag}</span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 1 }}>{item.price}</div>
                      </div>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${isSelected ? t.purple : t.border}`,
                        background: isSelected ? t.purple : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: t.ease,
                      }}>
                        {isSelected && <span style={{ color: '#fff', fontSize: 11, lineHeight: 1 }}>✓</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px', borderTop: `1px solid ${t.border}`,
          flexShrink: 0,
        }}>
          <button onClick={handlePay} disabled={!selected || paid} style={{
            width: '100%', height: 50, borderRadius: t.r16, border: 'none',
            background: paid
              ? 'rgba(74,222,128,0.15)'
              : selected
              ? 'linear-gradient(90deg, #a78bfa, #60a5fa)'
              : t.surfaceHover,
            color: paid ? t.green : t.textPrimary,
            fontSize: 15, fontWeight: 700, cursor: selected && !paid ? 'pointer' : 'default',
            transition: t.ease, opacity: selected ? 1 : 0.5,
          }}>
            {paid ? '✓ Оплачено' : selected ? `Оплатить ${selected.name} · ${selected.priceRub.toLocaleString('ru-RU')} ₽` : 'Выберите сервис'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} style={{
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
      background: on ? 'linear-gradient(90deg, #a78bfa, #60a5fa)' : t.surfaceHover,
      position: 'relative', transition: 'background 0.25s ease', flexShrink: 0,
      boxShadow: on ? '0 0 12px rgba(167,139,250,0.35)' : 'none',
    }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        transition: 'left 0.25s ease', display: 'block',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </button>
  )
}

function SettingRow({ icon, label, sub, right }: { icon: string; label: string; sub?: string; right: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 20px',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: t.r12, flexShrink: 0,
        background: t.surfaceHover, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 17,
      }}>
        <span className="setting-icon" style={{ display: 'inline-block' }}>{icon}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: t.textTertiary, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textTertiary, marginBottom: 10, paddingLeft: 4 }}>
        {title}
      </p>
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.r20, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: t.border, margin: '0 20px' }} />
}

function ProfileTab({ user, activeCard, logout }: { user: { name: string; phone: string } | null; activeCard: number; logout: () => void }) {
  const [security, setSecurity] = useState({ biometric: true, twofa: false, loginAlerts: true })
  const [notifs, setNotifs]     = useState({ push: true, sms: false, email: true })
  const [copied, setCopied]     = useState(false)
  const { isMobile } = useResponsive()

  const refCode = 'NEO-ALEX-2024'
  const initials = user?.name.split(' ').map(w => w[0]).join('') ?? 'НА'
  const tierColors = ['#60a5fa', '#a855f7', '#d4a853']
  const tierColor  = tierColors[activeCard]
  const tierName   = ['Standard', 'Premium', 'Diners Club'][activeCard]

  const copy = useCallback(() => {
    navigator.clipboard.writeText(refCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const toggle = (group: 'security' | 'notifs', key: string) => {
    if (group === 'security') setSecurity(p => ({ ...p, [key]: !p[key as keyof typeof p] }))
    else setNotifs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))
  }

  const dailyUsed  = 23_400
  const dailyLimit = 100_000
  const monthUsed  = 78_500
  const monthLimit = 500_000

  return (
    <div style={{ maxWidth: 560 }}>

      {/* Hero */}
      <div style={{
        background: t.surface, border: `1px solid ${t.border}`,
        borderRadius: t.r24, padding: isMobile ? '20px 16px' : '28px 24px', marginBottom: 20,
        display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 16,
        flexWrap: isMobile ? 'wrap' : 'nowrap',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${tierColor}33, ${tierColor}66)`,
          border: `2px solid ${tierColor}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 800, color: tierColor,
        }}>{initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: t.textPrimary, marginBottom: 4 }}>{user?.name}</div>
          <div style={{ fontSize: 14, color: t.textSecondary, marginBottom: 10 }}>{user?.phone}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: t.r999,
              background: `${tierColor}22`, color: tierColor, letterSpacing: '0.05em',
            }}>{tierName}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: t.r999,
              background: 'rgba(74,222,128,0.12)', color: t.green, letterSpacing: '0.05em',
            }}>✓ Верифицирован</span>
          </div>
        </div>
        <button style={{
          background: t.surfaceHover, border: `1px solid ${t.border}`,
          borderRadius: t.r12, padding: '8px 14px', color: t.textSecondary,
          fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: t.ease, whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
          onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}
        >
          Изменить ✎
        </button>
      </div>

      {/* Cashback stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Кэшбэк за март', value: '1 234 ₽', color: t.purple },
          { label: 'Всего накоплено', value: '8 760 ₽', color: t.green },
          { label: 'Операций',        value: '47',       color: t.blue  },
        ].map(s => (
          <div key={s.label} style={{
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: t.r16, padding: '16px 14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: t.textTertiary, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Security */}
      <SectionCard title="Безопасность">
        <SettingRow icon="👆" label="Биометрия" sub="Touch ID / Face ID" right={<Toggle on={security.biometric} onToggle={() => toggle('security', 'biometric')} />} />
        <Divider />
        <SettingRow icon="🔐" label="Двухфакторная аутентификация" sub={security.twofa ? 'Включена' : 'Выключена'} right={<Toggle on={security.twofa} onToggle={() => toggle('security', 'twofa')} />} />
        <Divider />
        <SettingRow icon="🔔" label="Уведомления о входе" sub="На номер телефона" right={<Toggle on={security.loginAlerts} onToggle={() => toggle('security', 'loginAlerts')} />} />
        <Divider />
        <SettingRow icon="📱" label="Активная сессия" sub="iPhone 14 · Москва · Сейчас" right={<span style={{ fontSize: 12, color: t.green, fontWeight: 600 }}>●&nbsp;Онлайн</span>} />
      </SectionCard>

      {/* Limits */}
      <SectionCard title="Лимиты">
        {[
          { label: 'Дневной лимит', used: dailyUsed, limit: dailyLimit },
          { label: 'Месячный лимит', used: monthUsed, limit: monthLimit },
        ].map(lim => (
          <div key={lim.label} style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary }}>{lim.label}</span>
              <span style={{ fontSize: 13, color: t.textTertiary }}>
                {lim.used.toLocaleString('ru-RU')} / {lim.limit.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: t.surfaceHover, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${(lim.used / lim.limit) * 100}%`,
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="Уведомления">
        <SettingRow icon="📲" label="Push-уведомления" sub="Операции, переводы, акции" right={<Toggle on={notifs.push} onToggle={() => toggle('notifs', 'push')} />} />
        <Divider />
        <SettingRow icon="💬" label="SMS-уведомления" sub="Подтверждение операций" right={<Toggle on={notifs.sms} onToggle={() => toggle('notifs', 'sms')} />} />
        <Divider />
        <SettingRow icon="📧" label="Email-рассылка" sub="Выписки и предложения" right={<Toggle on={notifs.email} onToggle={() => toggle('notifs', 'email')} />} />
      </SectionCard>

      {/* Referral */}
      <SectionCard title="Реферальная программа">
        <div style={{ padding: '20px 20px 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, marginBottom: 4 }}>
            Пригласи друга — получи 500 ₽
          </div>
          <div style={{ fontSize: 13, color: t.textSecondary, marginBottom: 16 }}>
            Поделись кодом. Друг откроет счёт — вы оба получите бонус.
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              flex: 1, background: t.bg, border: `1px solid ${t.border}`,
              borderRadius: t.r12, padding: '12px 16px',
              fontFamily: 'monospace', fontSize: 16, fontWeight: 700,
              color: t.purple, letterSpacing: '0.08em',
            }}>{refCode}</div>
            <button onClick={copy} style={{
              height: 46, padding: '0 18px', borderRadius: t.r12, border: 'none',
              background: copied ? 'rgba(74,222,128,0.15)' : t.surfaceHover,
              color: copied ? t.green : t.textPrimary,
              fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: t.ease,
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {copied ? '✓ Скопировано' : 'Копировать'}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Support */}
      <SectionCard title="Поддержка и документы">
        {[
          { icon: '📞', label: 'Горячая линия', sub: '8 800 100-00-00 · Бесплатно', arrow: true },
          { icon: '💬', label: 'Написать в чат', sub: 'Среднее время ответа — 2 мин', arrow: true },
          { icon: '📄', label: 'Договор на обслуживание', sub: 'PDF · 1.2 MB', arrow: true },
          { icon: '📋', label: 'Тарифы и условия', sub: 'Актуальная версия', arrow: true },
        ].map((item, i, arr) => (
          <div key={item.label}>
            <SettingRow
              icon={item.icon}
              label={item.label}
              sub={item.sub}
              right={<span style={{ color: t.textTertiary, fontSize: 16 }}>›</span>}
            />
            {i < arr.length - 1 && <Divider />}
          </div>
        ))}
      </SectionCard>

      {/* Logout */}
      <button onClick={logout} style={{
        width: '100%', height: 50,
        background: 'none', border: `1px solid rgba(248,113,113,0.25)`,
        borderRadius: t.r16, color: '#f87171',
        fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: t.ease, marginBottom: 8,
      }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.07)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.25)' }}
      >
        Выйти из аккаунта
      </button>
    </div>
  )
}

export default function Dashboard({ onGoHome }: { onGoHome: () => void }) {
  const { user, logout } = useAuth()
  const { isMobile } = useResponsive()
  const [activeCard, setActiveCard]   = useState(0)
  const [tab, setTab]                 = useState<'overview' | 'profile'>('overview')
  const [payOpen, setPayOpen]         = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS)

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions(prev => [tx, ...prev])
  }, [])

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
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span onClick={onGoHome} className="shimmer" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', cursor: 'pointer' }}>NeoBank</span>

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

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '24px 16px 80px' : '40px 24px 80px' }}>

        {tab === 'overview' ? (
          <>
            {/* Greeting */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 14, color: t.textTertiary, marginBottom: 4 }}>{getGreeting()},</p>
              <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: t.textPrimary }}>
                {user?.name.split(' ').reverse().join(' ')} <span className="wave-hand">👋</span>
              </h1>
            </div>

            {/* Card + Balance */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 32, marginBottom: 40, alignItems: 'start' }}>

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
              <div style={{ paddingTop: isMobile ? 0 : 52 }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
                  {QUICK_ACTIONS.map(a => (
                    <button key={a.label} onClick={a.label === 'Оплатить' ? () => setPayOpen(true) : a.label === 'История' ? () => setHistoryOpen(true) : undefined} style={{
                      background: t.surfaceHover, border: `1px solid ${t.border}`,
                      borderRadius: t.r16, padding: '14px 8px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      cursor: 'pointer', transition: t.ease, color: t.textPrimary,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHover; e.currentTarget.style.background = '#1e2025' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.surfaceHover }}
                    >
                      <span className="action-icon" style={{ fontSize: 18, display: 'inline-block' }}>{a.icon}</span>
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
                <button onClick={() => setHistoryOpen(true)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: t.purple, fontSize: 13, fontWeight: 600,
                }}>
                  Все операции →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {transactions.slice(0, 8).map((tx, i) => (
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
                    <div className="tx-icon-wrap" style={{
                      width: 42, height: 42, borderRadius: '50%',
                      background: t.surfaceHover, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 18,
                      flexShrink: 0,
                    }}>
                      <span className="tx-icon" style={{ display: 'inline-block' }}>{tx.icon}</span>
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
          <ProfileTab user={user} activeCard={activeCard} logout={logout} />
        )}
      </main>
      {payOpen && <PayModal onClose={() => setPayOpen(false)} onPaid={addTransaction} />}
      {historyOpen && <HistoryModal onClose={() => setHistoryOpen(false)} transactions={transactions} />}

      <style>{`
        @keyframes wave {
          0%        { transform: rotate(0deg);   }
          10%       { transform: rotate(18deg);  }
          20%       { transform: rotate(-10deg); }
          30%       { transform: rotate(18deg);  }
          40%       { transform: rotate(-6deg);  }
          50%,100%  { transform: rotate(0deg);   }
        }
        .wave-hand {
          display: inline-block;
          transform-origin: 70% 80%;
          animation: wave 2.4s ease-in-out infinite;
          animation-delay: 0.6s;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0);    }
          40%      { transform: translateY(-6px); }
          70%      { transform: translateY(-2px); }
        }
        .action-icon { transition: transform 0.15s ease; }
        button:hover .action-icon { animation: iconBounce 0.5s ease; }

        @keyframes iconWiggle {
          0%, 100% { transform: rotate(0deg);   }
          20%      { transform: rotate(-12deg); }
          50%      { transform: rotate(12deg);  }
          75%      { transform: rotate(-6deg);  }
        }
        .tx-icon { transition: transform 0.15s ease; }
        .tx-icon-wrap:hover .tx-icon { animation: iconWiggle 0.5s ease; }

        @keyframes iconPop {
          0%   { transform: scale(1);    }
          50%  { transform: scale(1.35); }
          100% { transform: scale(1);    }
        }
        .setting-icon { transition: transform 0.2s ease; }
        div:hover > .setting-icon { animation: iconPop 0.4s ease; }
      `}</style>
    </div>
  )
}
