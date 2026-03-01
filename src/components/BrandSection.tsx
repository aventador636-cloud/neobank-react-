import { t } from '../styles/tokens'
import { Container } from './Layout'
import BrandAnimation from './BrandAnimation'

export default function BrandSection() {
  return (
    <section style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 80 }}>

          {/* Left: animation */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BrandAnimation />
          </div>

          {/* Right: copy */}
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: t.textTertiary, marginBottom: 20,
            }}>О нас</p>

            <h2 style={{
              fontSize: 48, fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.035em', color: t.textPrimary, marginBottom: 24,
            }}>
              Финансы<br />нового<br />времени
            </h2>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: t.textSecondary, marginBottom: 20 }}>
              NeoBank — это не просто карта. Это полноценная финансовая платформа, которая растёт вместе с вами.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: t.textSecondary }}>
              Мы убрали всё лишнее и оставили главное: скорость, прозрачность и выгода в каждой операции.
            </p>

            <div style={{
              display: 'flex', gap: 40, marginTop: 48,
              paddingTop: 40, borderTop: `1px solid ${t.border}`,
            }}>
              {[
                { val: '2021',  label: 'Год основания' },
                { val: '4.9★',  label: 'Рейтинг в App Store' },
                { val: 'ЦБ РФ', label: 'Лицензия' },
              ].map(s => (
                <div key={s.val}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: t.textPrimary, letterSpacing: '-0.02em' }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: t.textTertiary, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
