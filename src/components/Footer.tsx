import { t } from '../styles/tokens'
import { Container } from './Layout'

const cols = [
  { title: 'Продукты',  links: ['Стандартная карта', 'Премиум карта', 'Кредиты', 'Вклады'] },
  { title: 'Компания',  links: ['О нас', 'Карьера', 'Пресс-центр', 'Лицензии'] },
  { title: 'Поддержка', links: ['Помощь', 'Чат', 'Тарифы', 'Безопасность'] },
]

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const XIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)

const socials = [
  { icon: <TelegramIcon />,  href: '#', label: 'Telegram' },
  { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
  { icon: <FacebookIcon />,  href: '#', label: 'Facebook' },
  { icon: <YoutubeIcon />,   href: '#', label: 'YouTube' },
  { icon: <LinkedinIcon />,  href: '#', label: 'LinkedIn' },
  { icon: <XIcon />,         href: '#', label: 'X' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${t.border}` }}>
      <Container>
        <div style={{ padding: '64px 0 32px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, auto)', gap: 64, marginBottom: 64 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.textPrimary, marginBottom: 12, letterSpacing: '-0.02em' }}>
                NeoBank
              </div>
              <p style={{ fontSize: 14, color: t.textTertiary, lineHeight: 1.65, maxWidth: 220, marginBottom: 24 }}>
                Современный банк для тех, кто ценит удобство и выгоду каждый день.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} style={{
                    width: 36, height: 36, borderRadius: t.r12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: t.surface, border: `1px solid ${t.border}`,
                    color: t.textTertiary, transition: t.ease,
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = t.borderHover }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = t.textTertiary; (e.currentTarget as HTMLElement).style.borderColor = t.border }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {cols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textTertiary, marginBottom: 20 }}>
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" style={{ fontSize: 14, color: t.textSecondary, transition: t.ease }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: `1px solid ${t.border}` }}>
            <p style={{ fontSize: 13, color: t.textTertiary }}>© 2026 NeoBank. Лицензия ЦБ РФ №1234.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Конфиденциальность', 'Соглашение', 'Реквизиты'].map(l => (
                <a key={l} href="#" style={{ fontSize: 13, color: t.textTertiary, padding: '4px 8px', transition: t.ease }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.textSecondary)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.textTertiary)}>
                  {l}
                </a>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </footer>
  )
}
