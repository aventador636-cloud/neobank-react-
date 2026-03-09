import { useState, useRef, useEffect } from 'react'
import { t } from '../styles/tokens'
import { useResponsive } from '../hooks/useResponsive'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are a helpful assistant for NeoBank — a modern digital bank.
You help users choose between three card products:
- Standard card (VISA): everyday use, cashback on purchases, free service
- Premium card (Mastercard): travel benefits, lounge access, 3% cashback, priority support
- Diners Club: exclusive card for high-net-worth clients, concierge service, unlimited cashback

Answer questions about cards, banking features, security, and account management.
Be concise, friendly, and professional. Respond in the same language the user writes in.`

async function sendToGroq(messages: Message[]): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 512,
    }),
  })
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? 'Sorry, something went wrong.'
}

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m NeoBank assistant. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { isMobile, isSmallMobile } = useResponsive()

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const reply = await sendToGroq([...messages, userMsg])
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: isMobile ? 84 : 90, right: isMobile ? 12 : 24, left: isMobile ? 12 : 'auto', zIndex: 1000,
          width: isMobile ? 'auto' : 360, height: isMobile ? 'min(70vh, 560px)' : 520,
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: t.r24,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          animation: 'chatAppear 0.25s ease',
        }}>

          {/* Header */}
          <div style={{
            padding: isSmallMobile ? '12px 14px' : '16px 20px',
            borderBottom: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: t.surfaceHover,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>N</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary }}>NeoBank AI</div>
                <div style={{ fontSize: 11, color: t.green, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.green, display: 'inline-block' }} />
                  Online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: t.textTertiary, fontSize: 20, lineHeight: 1, padding: 4,
              transition: t.ease,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
              onMouseLeave={e => (e.currentTarget.style.color = t.textTertiary)}
            >×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
            display: 'flex', flexDirection: 'column', gap: 10,
            scrollbarWidth: 'thin',
            scrollbarColor: `${t.border} transparent`,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: isMobile ? '88%' : '80%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg, #a78bfa, #60a5fa)'
                    : t.surfaceHover,
                  color: t.textPrimary,
                  fontSize: 14,
                  lineHeight: 1.55,
                  border: m.role === 'assistant' ? `1px solid ${t.border}` : 'none',
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  background: t.surfaceHover,
                  border: `1px solid ${t.border}`,
                  display: 'flex', gap: 4, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: t.textTertiary,
                      display: 'inline-block',
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: isSmallMobile ? '10px 12px' : '12px 16px',
            borderTop: `1px solid ${t.border}`,
            display: 'flex', gap: 8, alignItems: 'flex-end',
            background: t.surfaceHover,
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask anything..."
              rows={1}
              style={{
                flex: 1, background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: t.r12, padding: '10px 14px',
                color: t.textPrimary, fontSize: 14, fontFamily: t.fontFamily,
                resize: 'none', outline: 'none', lineHeight: 1.5,
                transition: t.ease,
                maxHeight: 100, overflowY: 'auto',
                scrollbarWidth: 'none',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)')}
              onBlur={e => (e.currentTarget.style.borderColor = t.border)}
            />
            <button onClick={send} disabled={!input.trim() || loading} style={{
              width: 38, height: 38, borderRadius: '50%',
              border: `1px solid ${t.border}`,
              background: input.trim() && !loading
                ? 'linear-gradient(135deg, #a78bfa, #60a5fa)'
                : t.surface,
              cursor: input.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: t.ease, flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button onClick={() => setOpen(o => !o)} style={{
        position: 'fixed', bottom: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 1000,
        width: isMobile ? 52 : 56, height: isMobile ? 52 : 56, borderRadius: '50%', border: 'none',
        background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
        cursor: 'pointer', boxShadow: '0 8px 32px rgba(167,139,250,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(167,139,250,0.55)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(167,139,250,0.4)'
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <style>{`
        @keyframes chatAppear {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
