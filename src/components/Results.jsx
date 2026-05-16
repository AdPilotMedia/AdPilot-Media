import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowRight, FiTrendingUp, FiX, FiZoomIn, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { ALL_RESULTS } from '../pages/ResultsPage'
import './Results.css'

const PLATFORM_SECTIONS = [
  {
    id: 'meta',
    label: 'Meta Ads',
    icon: '📘',
    color: '#1877f2',
    desc: 'Facebook & Instagram campaigns delivering real ROAS for D2C, real estate & local brands',
    stats: [['8.4x', 'Avg ROAS'], ['₹40L+', 'Ad Spend'], ['60%↓', 'CPL Drop']],
    images: [
      { src: '/RESULT/40 Laks Ad Spend.png',   label: '₹40L Ad Spend',     project: 'Result 1' },
      { src: '/RESULT/Website Sales  3.png',   label: 'Website Sales',      project: 'Result 2' },
      { src: '/RESULT/Brand Awareness.png',    label: 'Brand Awareness',    project: 'Result 3' },
    ]
  },
  {
    id: 'google',
    label: 'Google Ads',
    icon: '🔍',
    color: '#ea4335',
    desc: 'Search, Display & YouTube campaigns with measurable ROI and lowest CPC',
    stats: [['12x', 'Max ROAS'], ['35%↓', 'Avg CPC'], ['4 Campaigns']],
    images: [
      { src: '/RESULT/Google ads 3.png',       label: 'Google Ads Result',  project: 'Result 1' },
      { src: '/RESULT/YouTube Result.png',     label: 'YouTube Result',     project: 'Result 2' },
      { src: '/RESULT/YouTube Result 2.jpg',   label: 'YouTube Result',     project: 'Result 3' },
      { src: '/RESULT/YouTube Result 3.jpg',   label: 'YouTube Result',     project: 'Result 4' },
    ]
  },
  {
    id: 'leadgen',
    label: 'Lead Generation',
    icon: '🎯',
    color: '#ff6b00',
    desc: 'High-intent leads at lowest CPL — WhatsApp, forms, website & instant forms',
    stats: [['500+', 'Leads/Month'], ['₹18', 'Avg CPL'], ['9 Campaigns']],
    images: [
      { src: '/RESULT/Leads 1.png',            label: 'Lead Generation',    project: 'Result 1' },
      { src: '/RESULT/Leads 2.png',            label: 'Lead Generation',    project: 'Result 2' },
      { src: '/RESULT/Leads 3.png',            label: 'Lead Generation',    project: 'Result 3' },
      { src: '/RESULT/Leads Form.png',         label: 'Lead Form',          project: 'Result 4' },
      { src: '/RESULT/Leads Form 2.png',       label: 'Lead Form',          project: 'Result 5' },
      { src: '/RESULT/Website Leads 1.png',    label: 'Website Leads',      project: 'Result 6' },
      { src: '/RESULT/Website Leads 2.png',    label: 'Website Leads',      project: 'Result 7' },
      { src: '/RESULT/Whatsapp Leads 1.png',   label: 'WhatsApp Leads',     project: 'Result 8' },
      { src: '/RESULT/Whatsapp Leads 2.png',   label: 'WhatsApp Leads',     project: 'Result 9' },
    ]
  },
  {
    id: 'social',
    label: 'Social Media',
    icon: '📱',
    color: '#e1306c',
    desc: 'Organic growth, viral reels & engagement across Instagram & LinkedIn',
    stats: [['10K+', 'Followers Added'], ['3x', 'Engagement'], ['4 Profiles']],
    images: [
      { src: '/RESULT/Instagram 3.jpg',        label: 'Instagram Growth',   project: 'Result 1' },
      { src: '/RESULT/Instagram Result 1.jpg', label: 'Instagram Result',   project: 'Result 2' },
      { src: '/RESULT/Instagram Result 2.jpg', label: 'Instagram Result',   project: 'Result 3' },
      { src: '/RESULT/LinkedIn 1.jpg',         label: 'LinkedIn Growth',    project: 'Result 4' },
    ]
  },
  {
    id: 'seo',
    label: 'SEO',
    icon: '📈',
    color: '#059669',
    desc: 'Page 1 rankings with sustainable organic traffic & zero paid spend',
    stats: [['#1', 'Rankings'], ['5x', 'Organic Traffic'], ['3 Clients']],
    images: [
      { src: '/RESULT/SEO 1.jpg',              label: 'SEO Rankings',       project: 'Result 1' },
      { src: '/RESULT/SEO 2.jpg',              label: 'SEO Rankings',       project: 'Result 2' },
      { src: '/RESULT/SEO 3.jpg',              label: 'SEO Rankings',       project: 'Result 3' },
    ]
  },
  {
    id: 'app',
    label: 'Mobile App Development',
    icon: '📲',
    color: '#0ea5e9',
    desc: 'End-to-end mobile app development for iOS & Android — from UI/UX design to deployment. We build fast, scalable & user-friendly apps that solve real business problems.',
    stats: [['iOS & Android', 'Platform'], ['2', 'Projects Built'], ['100%', 'Custom']],
    images: [
      { src: '/RESULT/App Development Project 1.png', label: 'App Project', project: 'Project 1' },
      { src: '/RESULT/App Development Project 2.png', label: 'App Project', project: 'Project 2' },
      { src: '/RESULT/App Development Project 3.jpeg', label: 'App Project', project: 'Project 3' },
    ]
  },
  {
    id: 'webdesign',
    label: 'Website Design',
    icon: '🌐',
    color: '#8b5cf6',
    desc: 'Custom websites & landing pages designed for conversions — built for real businesses across India',
    stats: [['10+', 'Projects'], ['100%', 'Custom'], ['Fast', 'Delivery']],
    images: [
      { src: '/RESULT/Website Design Project 1.png',  label: 'Website Design', project: 'Project 1' },
      { src: '/RESULT/Website Design Project 2.png',  label: 'Website Design', project: 'Project 2' },
      { src: '/RESULT/Website Design Project 3.png',  label: 'Website Design', project: 'Project 3' },
      { src: '/RESULT/Website Design Project 4.png',  label: 'Website Design', project: 'Project 4' },
      { src: '/RESULT/Website Design Project 5.png',  label: 'Website Design', project: 'Project 5' },
      { src: '/RESULT/Website Design Project 6.png',  label: 'Website Design', project: 'Project 6' },
      { src: '/RESULT/Website Design Project 7.png',  label: 'Website Design', project: 'Project 7' },
      { src: '/RESULT/Website Design Project 8.png',  label: 'Website Design', project: 'Project 8' },
      { src: '/RESULT/Website Design Project 9.png',  label: 'Website Design', project: 'Project 9' },
      { src: '/RESULT/Website Design Project 10.png', label: 'Website Design', project: 'Project 10' },
    ]
  },
]

function PlatformSection({ platform, onOpen }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <motion.div className="ps-block" ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.22,0.68,0,1.1] }}
      style={{ '--pc': platform.color }}
    >
      <div className="ps-glow" style={{ background: `radial-gradient(circle, ${platform.color}30, transparent 70%)` }} />
      <div className="ps-glow ps-glow2" style={{ background: `radial-gradient(circle, ${platform.color}12, transparent 70%)` }} />

      <div className="ps-header">
        <div className="ps-icon" style={{ background: `${platform.color}25`, boxShadow: `0 0 28px ${platform.color}40`, border: `1px solid ${platform.color}35` }}>
          <span>{platform.icon}</span>
        </div>
        <div className="ps-header-text">
          <h4 className="ps-title">{platform.label}</h4>
          <p className="ps-desc">{platform.desc}</p>
        </div>
        <div className="ps-stats-chips">
          {platform.stats.map((s, i) => (
            <div key={i} className="ps-chip" style={{ borderColor: `${platform.color}50`, color: platform.color, background: `${platform.color}12` }}>
              <span className="ps-chip-val">{s[0]}</span>
              <span className="ps-chip-lbl">{s[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ps-grid">
        {platform.images.map((img, i) => (
          <motion.div key={i} className="ps-card"
            initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.07, duration: 0.45 }}
            onClick={() => onOpen(platform, i)}
          >
            <img src={img.src} alt={img.label} className="ps-card-img" loading="lazy" />
            <div className="ps-card-overlay">
              <div className="ps-zoom-btn" style={{ background: `${platform.color}cc`, border: `1px solid ${platform.color}` }}>
                <FiZoomIn size={18} color="#fff" />
              </div>
            </div>
            <div className="ps-card-footer">
              <span className="ps-card-num" style={{ background: platform.color, color: '#fff' }}>{img.project}</span>
              <span className="ps-card-label">{img.label}</span>
            </div>
            <div className="ps-card-top-bar" style={{ background: platform.color }} />
          </motion.div>
        ))}

        <motion.div className="ps-card ps-more-card"
          initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: platform.images.length * 0.07 }}
          style={{ background: `linear-gradient(135deg, ${platform.color}18, ${platform.color}06)`, borderColor: `${platform.color}35` }}
        >
          <div className="ps-more-inner">
            <div className="ps-more-dots">
              {[0,1,2].map(d => <span key={d} style={{ background: platform.color }} />)}
            </div>
            <p className="ps-more-text" style={{ color: platform.color }}>+More</p>
            <p className="ps-more-sub">{platform.label} Results</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Lightbox({ lightbox, onClose, onPrev, onNext }) {
  if (!lightbox) return null
  const portal = document.getElementById('lightbox-portal')
  if (!portal) return null
  const { platform, index } = lightbox
  const img = platform.images[index]

  return createPortal(
    <div className="proof-lightbox" onClick={onClose}>
      <button className="proof-lb-close" onClick={e => { e.stopPropagation(); onClose() }}>
        <FiX size={18} /><span>Close</span>
      </button>
      <div className="proof-lb-inner" onClick={e => e.stopPropagation()}>
        <button className="proof-lb-nav" onClick={e => { e.stopPropagation(); onPrev() }}>
          <FiChevronLeft size={22} />
        </button>
        <div className="proof-lb-img-wrap">
          <div className="proof-lb-frame" style={{ borderTopColor: platform.color }}>
            <img src={img.src} alt={img.label} className="proof-lb-img" />
          </div>
        </div>
        <button className="proof-lb-nav" onClick={e => { e.stopPropagation(); onNext() }}>
          <FiChevronRight size={22} />
        </button>
      </div>
      <div className="proof-lb-label" onClick={e => e.stopPropagation()}>
        <span style={{ background: platform.color }}>{platform.icon} {platform.label}</span>
        {img.project} · {img.label}
        <span className="proof-lb-counter">{index + 1} / {platform.images.length}</span>
      </div>
    </div>,
    portal
  )
}

function ProofGallery() {
  const [lightbox, setLightbox] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const openLightbox = useCallback((platform, index) => setLightbox({ platform, index }), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() =>
    setLightbox(lb => ({ ...lb, index: (lb.index - 1 + lb.platform.images.length) % lb.platform.images.length }))
  , [])

  const next = useCallback(() =>
    setLightbox(lb => ({ ...lb, index: (lb.index + 1) % lb.platform.images.length }))
  , [])

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, prev, next, closeLightbox])

  return (
    <>
      <motion.div className="proof-section" ref={ref}
        initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
      >
        <div className="proof-header">
          <span className="proof-eyebrow">📸 Real Screenshots · No Fake Numbers</span>
          <h3 className="proof-title">Actual Campaign <span>Proof</span></h3>
          <p className="proof-sub">Live screenshots directly from client ad accounts & dashboards — 100% unedited</p>
          <div className="proof-trust-row">
            {['Meta Ads Manager', 'Google Ads', 'Analytics', 'Instagram Insights', 'SEO Tools'].map(t => (
              <span key={t} className="proof-trust-chip">{t}</span>
            ))}
          </div>
        </div>
        <div className="ps-sections">
          {PLATFORM_SECTIONS.map(p => (
            <PlatformSection key={p.id} platform={p} onOpen={openLightbox} />
          ))}
        </div>
      </motion.div>
      <Lightbox lightbox={lightbox} onClose={closeLightbox} onPrev={prev} onNext={next} />
    </>
  )
}

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

function CaseCard({ r }) {
  return (
    <div className="rc-card">
      {/* Image or color banner */}
      <div className="rc-banner" style={{ background: `linear-gradient(135deg, ${r.categoryColor}22, ${r.categoryColor}08)` }}>
        {r.img
          ? <img src={r.img} alt={r.brand} className="rc-banner-img" />
          : <div className="rc-banner-icon" style={{ color: r.categoryColor }}>{r.categoryLabel[0]}</div>
        }
        <span className="rc-cat" style={{ background: r.categoryColor }}>{r.categoryLabel}</span>
        {r.featured && <span className="rc-featured-badge">⭐</span>}
      </div>

      <div className="rc-body">
        <div className="rc-main-row">
          <div>
            <div className="rc-brand">{r.brand}</div>
            <div className="rc-industry">{r.industry} · {r.location}</div>
          </div>
          <div className="rc-big-metric">
            <span style={{ color: r.categoryColor }}>{r.metric}</span>
            <small>{r.metricLabel}</small>
          </div>
        </div>

        <div className="rc-sub-row">
          {r.subMetrics.map(([val, lbl], j) => (
            <div key={j} className="rc-sub-item" style={{ '--c': r.categoryColor }}>
              <span className="rc-sub-val">{val}</span>
              <span className="rc-sub-lbl">{lbl}</span>
            </div>
          ))}
        </div>

        <div className="rc-tags">
          {r.tags.map((t, j) => <span key={j} className="rc-tag" style={{ background: `${r.categoryColor}12`, color: r.categoryColor }}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [active, setActive] = useState('all')
  const scrollRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const filtered = active === 'all' ? ALL_RESULTS : ALL_RESULTS.filter(r => r.category === active)

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
  }
  const onMouseUp = () => { isDragging.current = false; scrollRef.current.style.cursor = 'grab' }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
  }

  return (
    <section className="results" id="results">
      <div className="section-bg-text">RESULTS</div>
      <div className="results-orb results-orb-a" />
      <div className="results-orb results-orb-b" />

      <motion.div ref={ref} className="section-header"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
      >
        <motion.span className="section-tag" initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}>
          <FiTrendingUp size={13} style={{ marginRight: 6 }} /> Proven Results
        </motion.span>
        <h2 className="section-title">Numbers That <span>Speak</span> For Themselves</h2>
        <p className="section-sub">Real campaigns. Real clients. Real results from across India.</p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div className="results-stats-bar" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
        {[['100+', 'Brands Scaled'], ['₹1Cr+', 'Revenue Generated'], ['5x', 'Avg ROAS'], ['500+', 'Campaigns Run'], ['4.8★', 'Client Rating']].map(([n, l]) => (
          <div key={l} className="rsb-item"><span className="rsb-num">{n}</span><span className="rsb-lbl">{l}</span></div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      {/* <div className="results-filter-wrap">
        {CATEGORIES.map(c => (
          <button key={c.id}
            className={`results-filter-btn ${active === c.id ? 'active' : ''}`}
            style={active === c.id ? { background: c.color, borderColor: c.color, color: '#fff', boxShadow: `0 4px 16px ${c.color}40` } : {}}
            onClick={() => setActive(c.id)}
          >{c.label}</button>
        ))}
      </div> */}

      {/* Scrollable Row */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <div
            className="rc-manual-scroll"
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {filtered.map((r, i) => <CaseCard key={r.id} r={r} i={i} />)}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Real Proof Gallery */}
      <ProofGallery />

      {/* View All CTA */}
      <motion.div className="results-view-all" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
        <div className="rva-text">
          <h3>Explore All 13+ Case Studies</h3>
          <p>See results across Meta Ads, Google Ads, SEO, Lead Gen, Social Media & Web Dev</p>
        </div>
        <Link to="/results" className="btn-primary rva-btn">View All Results <FiArrowRight size={16} /></Link>
      </motion.div>
    </section>
  )
}
