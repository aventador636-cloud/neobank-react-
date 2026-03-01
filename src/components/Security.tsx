import { ShieldCheck, ScanFace, Zap } from 'lucide-react'
import { t } from '../styles/tokens'
import { Section, Label, Heading } from './Layout'
import { useResponsive } from '../hooks/useResponsive'

const items = [
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} color={t.green} />,
    title: 'Защита 24/7',
    desc: 'Мониторинг каждой транзакции в реальном времени. Подозрительный платёж блокируется до завершения.',
    tag: 'Реальное время',
    tagColor: t.green,
    tagBg: 'rgba(74,222,128,0.1)',
    tagBorder: 'rgba(74,222,128,0.15)',
    span: 2,
  },
  {
    icon: <ScanFace size={28} strokeWidth={1.5} color={t.blue} />,
    title: 'Сертификация VISA / MC',
    desc: 'Поддержка 3D Secure и международных стандартов безопасности платёжных систем.',
    tag: '3D Secure',
    tagColor: t.blue,
    tagBg: 'rgba(96,165,250,0.1)',
    tagBorder: 'rgba(96,165,250,0.15)',
    span: 1,
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} color={t.purple} />,
    title: 'Мгновенная блокировка',
    desc: 'Один клик в приложении — карта заблокирована. Разблокировка — так же быстро.',
    tag: 'В приложении',
    tagColor: t.purple,
    tagBg: 'rgba(167,139,250,0.1)',
    tagBorder: 'rgba(167,139,250,0.15)',
    span: 1,
  },
]

export default function Security() {
  const { isMobile } = useResponsive()
  return (
    <Section>
      <Label>Безопасность</Label>
      <Heading size="xl" style={{ marginBottom: 48 }}>Ваши деньги<br />под защитой</Heading>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>

        {/* Large card */}
        <div style={{
          gridColumn: isMobile ? 'span 1' : 'span 2', padding: isMobile ? 32 : 48, borderRadius: t.r24,
          background: t.surface,
          display: 'flex', flexDirection: 'column', gap: 20, minHeight: 280,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: t.r16, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(74,222,128,0.08)',
          }}>
            {items[0].icon}
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="shimmer" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{items[0].title}</h3>
            <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.65 }}>{items[0].desc}</p>
          </div>
          <span style={{
            alignSelf: 'flex-start', padding: '5px 14px', borderRadius: t.r999,
            fontSize: 12, fontWeight: 600, color: items[0].tagColor,
            background: items[0].tagBg,
          }}>{items[0].tag}</span>
        </div>

        {/* Small cards */}
        {items.slice(1).map(item => (
          <div key={item.title} style={{
            padding: 40, borderRadius: t.r24,
            background: t.surface,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: t.r16, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: item.tagBg,
            }}>
              {item.icon}
            </div>
            <h3 className="shimmer" style={{ fontSize: 17, fontWeight: 700 }}>{item.title}</h3>
            <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
          </div>
        ))}

      </div>
    </Section>
  )
}
