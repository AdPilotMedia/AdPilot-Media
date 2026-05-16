import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiPlay, FiX, FiCheck } from 'react-icons/fi'
import ParticlesBg from './ParticlesBg'
import './Hero.css'

const WORDS = ['marketers.', 'leaders.', 'winners.', 'champions.', 'legends.']

const SERVICES = [
  {
    id: 'meta', label: 'Meta Ads', color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2, #0d5fd4)',
    img: '/meta ads.png',
    tagline: 'Scale with Facebook & Instagram Ads',
    desc: 'Hyper-targeted Meta campaigns that put your brand in front of the right people at the right time. From awareness to conversions — we handle it all.',
    features: ['Facebook & Instagram Ads', 'Retargeting Campaigns', 'Lookalike Audiences', 'Creative A/B Testing', 'Pixel Setup & Tracking', 'Weekly Performance Reports'],
    price: '₹8,000', popular: true,
  },
  {
    id: 'google', label: 'Google Ads', color: '#ea4335',
    gradient: 'linear-gradient(135deg, #ea4335, #c5221f)',
    img: '/google ads.png',
    tagline: 'Dominate Google Search & Display',
    desc: 'Show up when customers are actively searching. Our Google Ads experts craft campaigns that drive high-intent traffic and maximize your ROI.',
    features: ['Search & Display Ads', 'Shopping Campaigns', 'YouTube Ads', 'Keyword Research', 'Quality Score Optimization', 'Conversion Tracking'],
    price: '₹8,000', popular: false,
  },
  {
    id: 'lead', label: 'Lead Generation', color: '#ff6b00',
    gradient: 'linear-gradient(135deg, #ff6b00, #e05a00)',
    img: '/lead gen.png',
    tagline: 'Fill Your Pipeline with Quality Leads',
    desc: 'Stop chasing cold leads. We build automated lead generation funnels that bring qualified prospects directly to your inbox — ready to buy.',
    features: ['Landing Page Design', 'Lead Magnet Creation', 'Email Automation', 'CRM Integration', 'Lead Scoring', 'WhatsApp Follow-up'],
    price: '₹10,000', popular: false,
  },
  {
    id: 'website', label: 'Website Dev', color: '#1a2aff',
    gradient: 'linear-gradient(135deg, #1a2aff, #0d1499)',
    img: '/web develop.png',
    tagline: 'Websites That Convert Visitors to Customers',
    desc: 'Beautiful, fast, and conversion-optimized websites built with modern tech. From landing pages to full e-commerce stores — we build digital experiences that sell.',
    features: ['Custom Design & Development', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading Speed', 'E-commerce Integration', '1 Year Free Support'],
    price: '₹15,000', popular: false,
  },
  {
    id: 'social', label: 'Social Media', color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
    img: '/social media.png',
    tagline: 'Build a Brand People Love & Follow',
    desc: 'Consistent, creative, and engaging social media presence across Instagram, Facebook, LinkedIn & YouTube. We create content that builds community and drives sales.',
    features: ['Content Calendar & Strategy', '30 Posts/Month', 'Reels & Video Content', 'Community Management', 'Influencer Outreach', 'Monthly Analytics Report'],
    price: '₹6,000', popular: false,
  },
  {
    id: 'seo', label: 'SEO + GMB', color: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #047857)',
    img: '/seo.png',
    tagline: 'Rank #1 on Google & Maps',
    desc: 'Dominate local and organic search results. Our SEO + Google My Business optimization gets your business found by customers who are ready to buy right now.',
    features: ['On-Page & Off-Page SEO', 'Google My Business Setup', 'Local SEO Optimization', 'Keyword Research & Tracking', 'Backlink Building', 'Monthly Ranking Reports'],
    price: '₹7,000', popular: false,
  },
]

const CLIENTS = [
  { name: 'Comptech',                color: '#1877f2', logo: '/Client/Comptech.png',                     url: 'https://sranktech.com/',             industry: 'IT & Tech' },
  { name: 'Digital Vedic',           color: '#f97316', logo: '/Client/Digital Vedic.jpg',                url: 'https://digitalvedic.com/',          industry: 'Education' },
  { name: 'Edurise',                 color: '#059669', logo: '/Client/Edurise.jpeg',                     url: null,                                 industry: 'Education' },
  { name: 'Icon',                    color: '#ec4899', logo: '/Client/Icon.png',                         url: null,                                 industry: 'Fashion' },
  { name: 'Icraft',                  color: '#6366f1', logo: '/Client/Icraft.png',                       url: null,                                 industry: 'E-Commerce' },
  { name: 'Infyhire',                color: '#ea4335', logo: '/Client/Infyhire.png',                     url: 'https://www.infyhire.com/',          industry: 'Startup' },
  { name: 'Just Service 24',         color: '#f59e0b', logo: '/Client/Just Service 24.png',              url: 'https://www.justservice24.com/',     industry: 'Home Services' },
  { name: 'MdsYatra',                color: '#0ea5e9', logo: '/Client/MdsYatra.png',                     url: 'https://mdsyatra.com',               industry: 'Travel' },
  { name: 'Neeraj Kalra Classes',    color: '#8b5cf6', logo: '/Client/Neeraj Kalra Classes.png',         url: null,                                 industry: 'Education' },
  { name: 'OnexVora',                color: '#10b981', logo: '/Client/OnexVora.png',                     url: 'https://onexvora.com',               industry: 'Real Estate' },
  { name: 'Prayagraj Wedify Events', color: '#ef4444', logo: '/Client/Prayagraj Wedify Events.png',      url: null,                                 industry: 'Events' },
  { name: 'SrankBazaar',             color: '#1a2aff', logo: '/Client/SrankBazaar.png',                  url: 'https://srankbazaar.com/',           industry: 'E-Commerce' },
  { name: 'Trade with Shai',         color: '#ff6b00', logo: '/Client/Trade with Shai.png',              url: 'https://www.tradewithshai.com/',     industry: 'Finance' },
]

function ServiceModal({ service, onClose }) {
  return (
    <AnimatePresence>
      <motion.div className="service-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className="service-modal"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose}><FiX size={20} /></button>
          <div className="sm-header" style={{ background: service.gradient }}>
            <div className="sm-icon-big">
              <img src={service.img} alt={service.label} style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 10 }} />
            </div>
            <div>
              <div className="sm-label">{service.label}</div>
              <div className="sm-tagline">{service.tagline}</div>
            </div>
            {service.popular && <div className="sm-popular">⭐ Most Popular</div>}
          </div>
          <div className="sm-body">
            <p className="sm-desc">{service.desc}</p>
            <div className="sm-features-title">What's Included:</div>
            <ul className="sm-features">
              {service.features.map((f, i) => (
                <li key={i}><FiCheck size={14} color={service.color} /><span>{f}</span></li>
              ))}
            </ul>
            <div className="sm-pricing">
              <div className="sm-price-wrap">
                <div className="sm-price-label">Starting From</div>
                <div className="sm-price" style={{ color: service.color }}>{service.price}<span>/month</span></div>
              </div>
              <a href="#contact" className="sm-cta" style={{ background: service.gradient }} onClick={onClose}>
                Get Started <FiArrowRight size={15} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function HeroOrbit() {
  const [paused, setPaused] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 960)
  const total = SERVICES.length
  const radius = isMobile ? 120 : 182

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 960)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.div
        className="hero-orbit-wrap"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Concentric rings like image */}
        <div className="ho-ring ho-ring1" />
        <div className="ho-ring ho-ring2" />
        <div className="ho-ring ho-ring3" />
        <div className="ho-ring ho-ring4" />

        {/* Rotating icons */}
        <div className={`ho-rotator${paused ? ' paused' : ''}`}>
          {SERVICES.map((s, i) => {
            const angle = (360 / total) * i - 90
            const rad = (angle * Math.PI) / 180
            const x = Math.cos(rad) * radius
            const y = Math.sin(rad) * radius
            return (
              <motion.div
                key={i}
                className="ho-item"
                style={{ left: `calc(50% + ${x}px - 32px)`, top: `calc(50% + ${y}px - 32px)` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                onClick={() => setActiveService(s)}
              >
                <motion.div
                  className="ho-icon"
                  style={{
                    background: '#fff',
                    boxShadow: `0 2px 0 rgba(255,255,255,0.9) inset, 0 -4px 0 ${s.color}55 inset, 0 8px 24px ${s.color}60, 0 18px 40px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.12)`,
                    border: 'none',
                  }}
                  whileHover={{ scale: 1.15, y: -8, boxShadow: `0 2px 0 rgba(255,255,255,0.9) inset, 0 -4px 0 ${s.color}88 inset, 0 16px 40px ${s.color}80, 0 28px 60px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.15)` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={s.img} alt={s.label} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </motion.div>
                <span className="ho-label">{s.label}</span>
              </motion.div>
            )
          })}
        </div>

        {/* Center logo — big, white circle */}
        <div className="ho-center">
          <motion.div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src="/Website Logo.jpeg" alt="AdPilot Media" className="ho-logo" />
          </motion.div>
          <div className="ho-center-ring" />
        </div>
      </motion.div>

      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
    </>
  )
}

function ClientCard({ c }) {
  return (
    <a
      className="clt-card"
      href={c.url || undefined}
      target={c.url ? '_blank' : undefined}
      rel={c.url ? 'noopener noreferrer' : undefined}
      onClick={!c.url ? e => e.preventDefault() : undefined}
      style={{ '--c': c.color, cursor: c.url ? 'pointer' : 'default', textDecoration: 'none' }}
    >
      <div className="clt-logo-wrap" style={{ borderColor: `${c.color}30` }}>
        <img src={c.logo} alt={c.name} className="clt-logo-img" loading="lazy" />
      </div>
      <div className="clt-info">
        <span className="clt-name">{c.name}</span>
        <span className="clt-industry" style={{ color: c.color }}>{c.industry}</span>
      </div>
      <svg className="clt-verified" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="9" fill={c.color} />
        <path d="M5 9l2.8 2.8L13 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = WORDS[index]
    let timeout
    if (!deleting && text === word) timeout = setTimeout(() => setDeleting(true), 1800)
    else if (deleting && text === '') { setDeleting(false); setIndex(i => (i + 1) % WORDS.length) }
    else timeout = setTimeout(() => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), deleting ? 60 : 100)
    return () => clearTimeout(timeout)
  }, [text, deleting, index])

  return (
    <section className="hero" id="home">
      <div className="hero-bg-clip">
        <ParticlesBg />
        <div className="hero-grid-overlay" />
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
        <div className="bg-watermark">ADPILOT</div>
      </div>

      <div className="hero-inner">
        <div className="hero-top-row">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="badge-dot" />
              Now Accepting New Clients &amp; Students
            </motion.div>

            <h1 className="hero-title">
              We grow brands.<br />
              <span className="typed-text-orange">
                We build <span className="typed-wrap">{text}<span className="cursor">|</span></span>
              </span>
            </h1>
            <div className="hero-underline" />

            <p className="hero-desc">
              <strong>AdPilot Media</strong> is Prayagraj's #1 performance marketing agency &amp; training hub.
              Specializing in <strong>Meta Ads, Google Ads, SEO &amp; Lead Generation</strong> —
              we take you exactly where you belong.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Get Free Audit <FiArrowRight size={16} />
              </a>
              <a href="#results" className="btn-outline">
                <FiPlay size={14} /> See Our Results
              </a>
            </div>

            {/* Premium stats cards */}
            <motion.div
              className="hero-stats-bar"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {[
                { num: '100+', label: 'Brands Scaled', color: '#1a2aff', bg: 'rgba(26,42,255,0.08)', border: 'rgba(26,42,255,0.15)' },
                { num: '₹1Cr+', label: 'Revenue Generated', color: '#ff6b00', bg: 'rgba(255,107,0,0.08)', border: 'rgba(255,107,0,0.2)' },
                { num: '5x', label: 'Avg ROAS', color: '#059669', bg: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.2)' },
                { num: '500+', label: 'Campaigns Run', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
              ].map(({ num, label, color, bg, border }, i) => (
                <motion.div
                  key={i}
                  className="hsb-item"
                  style={{ '--hc': color, '--hbg': bg, '--hborder': border }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                >
                  <span className="hsb-num" style={{ color }}>{num}</span>
                  <span className="hsb-label">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <HeroOrbit />
        </div>
      </div>

      <motion.div className="scroll-hint" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Scroll</span>
      </motion.div>

      {/* Clients Strip */}
      <motion.div
        className="clients-strip"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <div className="clients-header">
          <div className="clients-header-line" />
          <div className="clients-header-text">
            <span className="clients-header-tag">✦ Trusted By 100+ Brands</span>
            <span className="clients-header-title">Brands We've Scaled 🚀</span>
          </div>
          <div className="clients-header-line" />
        </div>

        <div className="clients-track-wrap">
          <div className="clients-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <ClientCard key={i} c={c} />
            ))}
          </div>
        </div>

        <div className="clients-track-wrap" style={{ marginTop: 14 }}>
          <div className="clients-track clients-track-reverse">
            {[...CLIENTS.slice().reverse(), ...CLIENTS.slice().reverse()].map((c, i) => (
              <ClientCard key={i} c={c} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
