import { useState } from 'react'
import { t } from '../styles/tokens'
import { Section, Label, Heading } from './Layout'
import { faqItems } from '../data/cards'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 80 }}>

        <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <Label>FAQ</Label>
          <Heading size="lg" style={{ marginBottom: 16 }}>Частые<br />вопросы</Heading>
          <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.65 }}>
            Не нашли ответ? Напишите нам — поможем разобраться.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${t.border}` }}>
          {faqItems.map((item, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '24px 0', gap: 24,
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span className="shimmer" style={{ fontSize: 15, fontWeight: 600 }}>{item.question}</span>
                <span style={{
                  fontSize: 22, fontWeight: 300, color: t.textTertiary, flexShrink: 0,
                  transition: 'transform 0.25s ease',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  display: 'block',
                }}>+</span>
              </button>

              <div style={{
                overflow: 'hidden', transition: 'max-height 0.3s ease',
                maxHeight: open === i ? 200 : 0,
              }}>
                <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.7, paddingBottom: 24 }}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Section>
  )
}
