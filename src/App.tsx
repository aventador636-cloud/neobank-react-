import { useState } from 'react'
import type { CardType } from './data/cards'
import Header from './components/Header'
import Hero from './components/Hero'
import CardsSection from './components/CardsSection'
import Security from './components/Security'
import FAQ from './components/FAQ'
import Modal from './components/Modal'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  const [modal, setModal] = useState<{ open: boolean; cardType: CardType }>({ open: false, cardType: 'standard' })

  const openModal = (type: CardType = 'standard') => setModal({ open: true, cardType: type })
  const closeModal = () => setModal(p => ({ ...p, open: false }))

  return (
    <>
      <Header onCta={() => openModal()} />
      <Hero onCta={() => openModal()} />
      <CardsSection onOrder={openModal} />
      <Security />
      <FAQ />
      <Footer />
      <Modal open={modal.open} cardType={modal.cardType} onClose={closeModal} />
    </>
  )
}
