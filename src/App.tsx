import { useState } from 'react'
import type { CardType } from './data/cards'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import Header from './components/Header'
import Hero from './components/Hero'
import CardsSection from './components/CardsSection'
import Safety from './components/Safety'
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
  const [forceHomeView, setForceHomeView] = useState(false)

  const openModal = (type: CardType = 'standard') => setModal({ open: true, cardType: type })
  const closeModal = () => setModal(p => ({ ...p, open: false }))

  if (user && !forceHomeView) return <Dashboard onGoHome={() => setForceHomeView(true)} />

  return (
    <>
      <Header onCta={() => openModal()} onLogin={() => setAuthOpen(true)} />
      <Hero onCta={() => openModal()} />
      <CardsSection onOrder={openModal} />
      <Safety />
      <Footer />
      <Modal open={modal.open} cardType={modal.cardType} onClose={closeModal} />
      {authOpen && <AuthModal onClose={() => { setAuthOpen(false); setForceHomeView(false) }} />}
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
