import { useState } from 'react'
import type { CardType } from './data/cards'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import CardsSection from './components/CardsSection'
import Security from './components/Security'
import FAQ from './components/FAQ'
import Modal from './components/Modal'
import Footer from './components/Footer'
import Chat from './components/Chat'
import AuthModal from './components/AuthModal'
import Dashboard from './pages/Dashboard'
import './index.css'

function AppInner() {
  const { user } = useAuth()
  const [modal, setModal] = useState<{ open: boolean; cardType: CardType }>({ open: false, cardType: 'standard' })
  const [authOpen, setAuthOpen] = useState(false)
  const [view, setView] = useState<'home' | 'dashboard'>('home')

  const openModal = (type: CardType = 'standard') => setModal({ open: true, cardType: type })
  const closeModal = () => setModal(p => ({ ...p, open: false }))

  if (user && view === 'dashboard') return <Dashboard onGoHome={() => setView('home')} />

  // auto-switch to dashboard after login
  if (user && view === 'home') {
    setView('dashboard')
    return null
  }

  return (
    <>
      <Header onCta={() => openModal()} onLogin={() => setAuthOpen(true)} />
      <Hero onCta={() => openModal()} />
      <CardsSection onOrder={openModal} />
      <Security />
      <FAQ />
      <Footer />
      <Modal open={modal.open} cardType={modal.cardType} onClose={closeModal} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <Chat />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
