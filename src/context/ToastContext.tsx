import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { t } from '../styles/tokens'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  sub?: string
  type: ToastType
  exiting?: boolean
}

interface ToastCtx {
  showToast: (message: string, sub?: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastCtx>({ showToast: () => {} })

const TYPE_STYLES: Record<ToastType, { icon: string; color: string; bg: string; border: string }> = {
  success: { icon: '✓', color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)'  },
  error:   { icon: '✕', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
  info:    { icon: 'ℹ', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, sub?: string, type: ToastType = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, sub, type }])

    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 300)
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed', bottom: 88, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8,
        alignItems: 'center', pointerEvents: 'none',
        width: 'min(360px, 92vw)',
      }}>
        {toasts.map(toast => {
          const s = TYPE_STYLES[toast.type]
          return (
            <div key={toast.id} style={{
              width: '100%', padding: '12px 16px',
              background: 'rgba(22,24,28,0.92)',
              backdropFilter: 'blur(16px)',
              borderRadius: t.r16,
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', gap: 12,
              pointerEvents: 'auto',
              animation: toast.exiting ? 'toastOut 0.3s ease forwards' : 'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: `${s.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: s.color,
              }}>{s.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary, marginBottom: toast.sub ? 2 : 0 }}>
                  {toast.message}
                </div>
                {toast.sub && (
                  <div style={{ fontSize: 12, color: t.textTertiary }}>{toast.sub}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(8px) scale(0.95); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
