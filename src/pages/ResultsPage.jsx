import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiFilter } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './ResultsPage.css'

export const ALL_RESULTS = []



const CATEGORIES = [
  { id: 'all',             label: 'All',          color: '#1a2aff' },
  { id: 'meta-ads',        label: 'Meta Ads',     color: '#1877f2' },
  { id: 'google-ads',      label: 'Google Ads',   color: '#ea4335' },
  { id: 'seo-gmb',         label: 'SEO',          color: '#059669' },
  { id: 'social-media',    label: 'Social Media', color: '#e1306c' },
  { id: 'lead-generation', label: 'Lead Gen',     color: '#ff6b00' },
  { id: 'web-development', label: 'Web',          color: '#6366f1' },
  { id: 'app-development', label: 'App Dev',      color: '#0ea5e9' },
]

function CaseCard({ r, i }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      className="rp-card-wrap"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
    >
      <div className={`rp-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
        {/* FRONT */}
        <div className="rp-front">
          <div className="rp-cat-badge" style={{ background: `${r.categoryColor}18`, color: r.categoryColor, borderColor: `${r.categoryColor}30` }}>
            {r.categoryLabel}
          </div>
          <div className="rp-top">
            <div>
              <div className="rp-brand">{r.brand}</div>
              <div className="rp-industry">{r.industry} · {r.location}</div>
            </div>
            <div className="rp-metric-wrap">
              <div className="rp-metric" style={{ color: r.categoryColor }}>{r.metric}</div>
              <div className="rp-metric-label">{r.metricLabel}</div>
            </div>
          </div>
          <p className="rp-desc">{r.desc}</p>
          <div className="rp-sub-metrics">
            {r.subMetrics.map(([val, lbl], j) => (
              <div key={j} className="rp-sub" style={{ '--c': r.categoryColor }}>
                <span className="rp-sub-val">{val}</span>
                <span className="rp-sub-lbl">{lbl}</span>
              </div>
            ))}
          </div>
          <div className="rp-tags">
            {r.tags.map((t, j) => <span key={j} className="rp-tag">{t}</span>)}
          </div>
          <div className="rp-flip-hint">Tap to see testimonial →</div>
        </div>

        {/* BACK — testimonial */}
        <div className="rp-back" style={{ background: `linear-gradient(135deg, ${r.categoryColor}15, ${r.categoryColor}05)`, borderColor: `${r.categoryColor}30` }}>
          <FaQuoteLeft size={28} color={r.categoryColor} style={{ opacity: 0.4, marginBottom: 16 }} />
          <p className="rp-testimonial">"{r.testimonial}"</p>
          <div className="rp-author">
            <div className="rp-avatar" style={{ background: `linear-gradient(135deg, ${r.categoryColor}, ${r.categoryColor}99)` }}>
              {r.client[0]}
            </div>
            <div>
              <div className="rp-client-name">{r.client}</div>
              <div className="rp-client-role">{r.clientRole}</div>
            </div>
            <div className="rp-stars">{'★'.repeat(5)}</div>
          </div>
          <div className="rp-flip-hint">← Tap to see results</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ResultsPage() {
  const [active, setActive] = useState('all')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    if (!navbar) return
    const set = () => document.documentElement.style.setProperty('--header-height', `${navbar.getBoundingClientRect().height}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(navbar)
    return () => ro.disconnect()
  }, [])

  const filtered = active === 'all' ? ALL_RESULTS : ALL_RESULTS.filter(r => r.category === active)

  const stats = [
    { num: '100+', label: 'Brands Scaled' },
    { num: '₹1Cr+', label: 'Revenue Generated' },
    { num: '5x', label: 'Avg ROAS' },
    { num: '500+', label: 'Campaigns Run' },
  ]

  return (
    <>
      <Navbar />
      <div className="rp-wrap">
        {/* Hero */}
        <div className="rp-hero">
          <div className="rp-hero-orb rp-orb1" />
          <div className="rp-hero-orb rp-orb2" />
          <div className="rp-hero-grid" />
          <Link to="/" className="rp-back"><FiArrowLeft size={15} /> Back to Home</Link>
          <motion.div className="rp-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="rp-hero-tag">✦ Proven Results</span>
            <h1>Real Brands. <span>Real Results.</span><br />Real Growth.</h1>
            <p>Every number below is from an actual client campaign. No fluff, no fake metrics — just data-backed results that speak for themselves.</p>
          </motion.div>
          <motion.div className="rp-hero-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {stats.map((s, i) => (
              <div key={i} className="rp-hero-stat">
                <span className="rp-hero-stat-num">{s.num}</span>
                <span className="rp-hero-stat-lbl">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="rp-filters-wrap">
          <div className="rp-filters">
            <FiFilter size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`rp-filter-btn ${active === c.id ? 'active' : ''}`}
                style={active === c.id ? { background: c.color, borderColor: c.color, color: '#fff', boxShadow: `0 4px 16px ${c.color}40` } : {}}
                onClick={() => setActive(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="rp-grid-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="rp-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((r, i) => <CaseCard key={r.id} r={r} i={i} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="rp-cta-section">
          <motion.div className="rp-cta-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rp-cta-orb" />
            <h2>Ready to Be Our Next <span>Success Story?</span></h2>
            <p>Get a free audit of your current campaigns and see exactly how we can scale your brand.</p>
            <div className="rp-cta-actions">
              <Link to="/#contact" className="btn-primary">Get Free Audit <FiArrowRight size={15} /></Link>
              <a href="https://wa.me/919935065517" target="_blank" rel="noreferrer" className="btn-outline">WhatsApp Us</a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
