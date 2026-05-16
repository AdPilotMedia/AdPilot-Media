import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowRight, FiTrendingUp, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Services.css'

const services = [
  {
    icon: '/meta ads.png',
    title: 'Meta Ads',
    subtitle: 'Facebook & Instagram',
    desc: 'Hyper-targeted campaigns that put your brand in front of the right people. From awareness to conversions — we handle it all.',
    tag: 'Performance',
    color: '#1877f2',
    colorDark: '#0a4fd4',
    colorRgb: '24,119,242',
    slug: 'meta-ads',
    stats: [['3x', 'ROAS'], ['50+', 'Brands'], ['₹1Cr+', 'Spend']],
    points: ['Facebook & Instagram Ads', 'Retargeting Campaigns', 'Lookalike Audiences'],
    badge: '🔥 Most Popular',
  },
  {
    icon: '/google ads.png',
    title: 'Google Ads',
    subtitle: 'Search, Display & YouTube',
    desc: 'Show up when customers are actively searching. High-intent traffic that converts with maximum ROI.',
    tag: 'Performance',
    color: '#ea4335',
    colorDark: '#b31412',
    colorRgb: '234,67,53',
    slug: 'google-ads',
    stats: [['5x', 'ROAS'], ['100+', 'Campaigns'], ['₹50L+', 'Revenue']],
    points: ['Search & Display Ads', 'Shopping Campaigns', 'YouTube Ads'],
    badge: null,
  },
  {
    icon: '/lead gen.png',
    title: 'Lead Generation',
    subtitle: 'Qualified Leads on Autopilot',
    desc: 'Automated funnels that bring qualified prospects directly to your inbox — ready to buy.',
    tag: 'Growth',
    color: '#f97316',
    colorDark: '#c2410c',
    colorRgb: '249,115,22',
    slug: 'lead-generation',
    stats: [['₹180', 'Per Lead'], ['2000+', 'Leads'], ['60d', 'Results']],
    points: ['Landing Page Design', 'Email Automation', 'CRM Integration'],
    badge: '⚡ Fast Results',
  },
  {
    icon: '/web develop.png',
    title: 'Web Development',
    subtitle: 'Websites That Convert',
    desc: 'Beautiful, fast, conversion-optimized websites. From landing pages to full e-commerce stores.',
    tag: 'Development',
    color: '#6366f1',
    colorDark: '#4338ca',
    colorRgb: '99,102,241',
    slug: 'web-development',
    stats: [['50+', 'Websites'], ['<2s', 'Load Time'], ['100%', 'Mobile']],
    points: ['Custom Design', 'SEO Optimized', 'E-commerce Ready'],
    badge: null,
  },
  {
    icon: '/seo.png',
    title: 'SEO + GMB',
    subtitle: 'Rank #1 on Google & Maps',
    desc: 'Dominate local and organic search. Get found by customers who are ready to buy right now.',
    tag: 'Organic',
    color: '#059669',
    colorDark: '#065f46',
    colorRgb: '5,150,105',
    slug: 'seo-gmb',
    stats: [['200+', 'Keywords'], ['Page 1', 'Google'], ['6mo', 'Avg Rank']],
    points: ['On-Page & Off-Page SEO', 'Google My Business', 'Backlink Building'],
    badge: '📈 Long Term',
  },
  {
    icon: '/social media.png',
    title: 'Social Media',
    subtitle: 'Build a Brand People Love',
    desc: 'Instagram, Facebook, LinkedIn & YouTube — content that builds community and drives real sales.',
    tag: 'Branding',
    color: '#ec4899',
    colorDark: '#be185d',
    colorRgb: '236,72,153',
    slug: 'social-media',
    stats: [['30+', 'Posts/Mo'], ['10K+', 'Reach'], ['100+', 'Brands']],
    points: ['Content Strategy', 'Reels & Videos', 'Community Management'],
    badge: null,
  },
  {
    icon: '/App develop.jpg',
    title: 'App Development',
    subtitle: 'iOS & Android Apps',
    desc: 'Custom mobile apps built for performance and scale. From concept to launch — we build apps that users love.',
    tag: 'Development',
    color: '#0ea5e9',
    colorDark: '#0369a1',
    colorRgb: '14,165,233',
    slug: 'app-development',
    stats: [['20+', 'Apps Built'], ['4.8★', 'Avg Rating'], ['10K+', 'Downloads']],
    points: ['iOS & Android', 'Payment Integration', 'Real-time Features'],
    badge: '🚀 New',
  },
]

function Counter({ value, inView }) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView) return
    const num = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (isNaN(num)) { setDisplay(value); return }
    const prefix = value.match(/^[^\d]*/)?.[0] || ''
    const suffix = value.match(/[^\d.]+$/)?.[0] || ''
    let startTime = null
    const duration = 1400
    const animate = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      const current = num < 10 ? (ease * num).toFixed(1) : Math.floor(ease * num)
      setDisplay(prefix + current + suffix)
      if (p < 1) requestAnimationFrame(animate)
      else setDisplay(value)
    }
    requestAnimationFrame(animate)
  }, [inView, value])
  return <>{display}</>
}

function ServiceCard({ s, i }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    setMousePos({ x, y })
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(16px)`
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setMousePos({ x: 50, y: 50 })
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  return (
    <motion.div
      ref={ref}
      className="sc-wrap"
      initial={{ opacity: 0, y: 60, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="sc-blob" style={{
        background: `radial-gradient(circle, rgba(${s.colorRgb},0.45) 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0.45,
      }} />

      <div
        ref={cardRef}
        className="sc-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ '--color': s.color, '--rgb': s.colorRgb, transition: 'transform 0.1s ease, border-color 0.3s' }}
      >
        {/* Neon border on hover */}
        <div className="sc-border-glow" style={{
          background: `conic-gradient(from 180deg at 50% 50%, rgba(${s.colorRgb},0) 0deg, rgba(${s.colorRgb},0.9) 180deg, rgba(${s.colorRgb},0) 360deg)`,
          opacity: hovered ? 1 : 0,
        }} />

        {/* Mouse spotlight */}
        <div className="sc-spotlight" style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(${s.colorRgb},0.13) 0%, transparent 60%)`,
        }} />

        {/* Header */}
        <div className="sc-head" style={{ background: `linear-gradient(135deg, ${s.color} 0%, ${s.colorDark} 100%)` }}>
          <div className="sc-circle sc-c1" style={{ background: `rgba(255,255,255,0.09)` }} />
          <div className="sc-circle sc-c2" style={{ background: `rgba(255,255,255,0.06)` }} />
          <div className="sc-circle sc-c3" style={{ background: `rgba(255,255,255,0.06)` }} />
          {s.badge && <div className="sc-badge">{s.badge}</div>}
          <motion.div
            className="sc-img-wrap"
            animate={hovered ? { y: -16, rotate: 14, scale: 1.12 } : { y: [0, -8, 0], rotate: 8, scale: 1 }}
            transition={hovered ? { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } : { duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="sc-img-glow" style={{ background: `radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)` }} />
            <img src={s.icon} alt={s.title} />
          </motion.div>
          <div className="sc-head-text">
            <span className="sc-chip">{s.tag}</span>
            <h3>{s.title}</h3>
            <p className="sc-subtitle">{s.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="sc-body">
          <p className="sc-desc">{s.desc}</p>

          <div className="sc-stats">
            {s.stats.map(([num, lbl], j) => (
              <div key={j} className="sc-stat" style={{ '--rgb': s.colorRgb, '--color': s.color }}>
                <div className="sc-stat-num"><Counter value={num} inView={inView} /></div>
                <div className="sc-stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>

          <ul className="sc-points">
            {s.points.map((p, j) => (
              <motion.li key={j}
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.07 + j * 0.07 }}
              >
                <span className="sc-check" style={{ background: `rgba(${s.colorRgb},0.18)`, color: s.color }}>
                  <FiCheck size={11} strokeWidth={3} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>

          <Link to={`/services/${s.slug}`} className="sc-cta">
            <span>Explore Service</span>
            <motion.span
              className="sc-cta-arrow"
              style={{ background: `rgba(${s.colorRgb},0.15)`, color: s.color }}
              animate={hovered ? { x: 5, scale: 1.1 } : { x: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowRight size={16} />
            </motion.span>
          </Link>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className="sc-bar"
          style={{ background: `linear-gradient(90deg, ${s.color}, ${s.colorDark})` }}
          animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0.25, opacity: 0.35 }}
          transition={{ duration: 0.35 }}
        />
      </div>
    </motion.div>
  )
}

/* ===== MOBILE SNAP SLIDER ===== */
function MobileSlider() {
  const trackRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [inViewRef, inViewVisible] = useInView({ threshold: 0.3 })
  const [inViewCounterRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const autoScrollRef = useRef(null)
  const activeIdxRef = useRef(0)

  const onScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const slides = track.querySelectorAll('.sc-slide')
    const center = track.scrollLeft + track.clientWidth / 2
    let closest = 0, minDist = Infinity
    slides.forEach((slide, i) => {
      const dist = Math.abs((slide.offsetLeft + slide.offsetWidth / 2) - center)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    activeIdxRef.current = closest
    setActiveIdx(closest)
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === closest))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => track.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const scrollTo = (i) => {
    const slide = trackRef.current?.querySelectorAll('.sc-slide')[i]
    slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  // Auto-scroll: only when section is visible and not paused by user touch
  useEffect(() => {
    if (!inViewVisible || isPaused) {
      clearInterval(autoScrollRef.current)
      return
    }
    autoScrollRef.current = setInterval(() => {
      const next = (activeIdxRef.current + 1) % services.length
      scrollTo(next)
    }, 2800)
    return () => clearInterval(autoScrollRef.current)
  }, [inViewVisible, isPaused])

  const handleTouchStart = () => setIsPaused(true)
  const handleTouchEnd = () => setTimeout(() => setIsPaused(false), 4000)

  return (
    <div className="services-slider" ref={inViewRef}>
      <div
        className="services-slider-track"
        ref={(el) => { trackRef.current = el; inViewCounterRef(el) }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((s, i) => (
          <div key={i} className={`sc-slide ${i === activeIdx ? 'is-active' : ''}`}>
            <div className="sc-blob" style={{
              background: `radial-gradient(circle, rgba(${s.colorRgb},0.55) 0%, transparent 70%)`,
              opacity: i === activeIdx ? 1 : 0.3,
            }} />
            <div className="sc-card" style={{ '--color': s.color, '--rgb': s.colorRgb }}>
              <div className="sc-border-glow" style={{
                background: `conic-gradient(from 180deg at 50% 50%, rgba(${s.colorRgb},0) 0deg, rgba(${s.colorRgb},0.9) 180deg, rgba(${s.colorRgb},0) 360deg)`,
                opacity: i === activeIdx ? 1 : 0,
              }} />

              <div className="sc-head" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.colorDark})` }}>
                <div className="sc-circle sc-c1" style={{ background: `rgba(255,255,255,0.09)` }} />
                <div className="sc-circle sc-c2" style={{ background: `rgba(255,255,255,0.06)` }} />
                {s.badge && <div className="sc-badge">{s.badge}</div>}
                <motion.div
                  className="sc-img-wrap"
                  animate={{ y: [0, -7, 0], rotate: 8 }}
                  transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="sc-img-glow" style={{ background: `radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)` }} />
                  <img src={s.icon} alt={s.title} />
                </motion.div>
                <div className="sc-head-text">
                  <span className="sc-chip">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p className="sc-subtitle">{s.subtitle}</p>
                </div>
              </div>

              <div className="sc-body">
                <p className="sc-desc">{s.desc}</p>
                <div className="sc-stats">
                  {s.stats.map(([num, lbl], j) => (
                    <div key={j} className="sc-stat" style={{ '--rgb': s.colorRgb, '--color': s.color }}>
                      <div className="sc-stat-num"><Counter value={num} inView={inViewVisible} /></div>
                      <div className="sc-stat-lbl">{lbl}</div>
                    </div>
                  ))}
                </div>
                <ul className="sc-points">
                  {s.points.map((p, j) => (
                    <li key={j}>
                      <span className="sc-check" style={{ background: `rgba(${s.colorRgb},0.18)`, color: s.color }}>
                        <FiCheck size={11} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${s.slug}`} className="sc-cta">
                  <span>Explore Service</span>
                  <span className="sc-cta-arrow" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.colorDark})` }}>
                    <FiArrowRight size={16} />
                  </span>
                </Link>
              </div>

              <div className="sc-bar" style={{
                background: `linear-gradient(90deg, ${s.color}, ${s.colorDark})`,
                opacity: i === activeIdx ? 1 : 0.3,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="slider-dots">
        {services.map((s, i) => (
          <button
            key={i}
            className={`slider-dot ${i === activeIdx ? 'active' : ''}`}
            onClick={() => scrollTo(i)}
            style={i === activeIdx ? { background: s.color, boxShadow: `0 0 12px ${s.color}` } : {}}
          />
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(services.length / perPage)
  const visible = services.slice(page * perPage, page * perPage + perPage)

  return (
    <section className="services" id="services">
      <div className="section-bg-text">SERVICES</div>
      <div className="svc-bg-orb svc-orb-a" />
      <div className="svc-bg-orb svc-orb-b" />
      <div className="svc-bg-orb svc-orb-c" />

      <motion.div
        ref={ref}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          <FiTrendingUp size={13} style={{ marginRight: 6 }} />
          What We Do
        </motion.span>
        <h2 className="section-title">Services That <span>Scale</span> Your Business</h2>
        <p className="section-sub">End-to-end digital marketing solutions tailored for growth-hungry brands.</p>
      </motion.div>

      {/* Desktop grid — 3 at a time with nav */}
      <div className="services-desktop">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="services-grid"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {visible.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="svc-pagination">
          <button
            className="svc-nav-btn"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <FiChevronLeft size={20} />
          </button>

          <div className="svc-page-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`svc-page-dot ${i === page ? 'active' : ''}`}
                onClick={() => setPage(i)}
              />
            ))}
          </div>

          <button
            className="svc-nav-btn"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Mobile slider */}
      <MobileSlider />
    </section>
  )
}
