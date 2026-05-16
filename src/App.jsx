import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Process from './components/Process'
import About from './components/About'
import CTABanner from './components/CTABanner'
import Results from './components/Results'
import Team from './components/Team'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ServicePage from './pages/ServicePage'
import ResultsPage from './pages/ResultsPage'
import './App.css'

function HomePage() {
  const [loading, setLoading] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (loading || !headerRef.current) return
    const measure = () => {
      const h = headerRef.current.getBoundingClientRect().height
      setHeaderHeight(h)
      document.documentElement.style.setProperty('--header-height', `${h}px`)
      const isMobile = window.innerWidth <= 768
      document.documentElement.style.setProperty('--hero-min-height', isMobile ? 'auto' : `calc(100vh - ${h}px)`)
    }
    measure()
    window.addEventListener('resize', measure)
    const observer = new ResizeObserver(measure)
    observer.observe(headerRef.current)
    return () => { window.removeEventListener('resize', measure); observer.disconnect() }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
      {!loading && (
        <>
          <div ref={headerRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
            <Navbar />
            <Marquee />
          </div>
          <div style={{ marginTop: headerHeight || 0 }}>
            <Hero />
            <Services />
            <Process />
            <About />
            <CTABanner />
            <Results />
            <Team />
            <Reviews />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
