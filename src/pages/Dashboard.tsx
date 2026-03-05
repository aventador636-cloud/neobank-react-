import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
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
      }}>{icon}</div>
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
        borderRadius: t.r24, padding: '28px 24px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 20,
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
                {user?.name.split(' ')[1]} 👋
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
          <ProfileTab user={user} activeCard={activeCard} logout={logout} />
        )}
      </main>
    </div>
  )
}
