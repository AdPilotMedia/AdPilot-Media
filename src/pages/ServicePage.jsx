import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiCheck, FiArrowRight, FiDownload, FiX, FiUser, FiPhone, FiBriefcase, FiMail } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './ServicePage.css'

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwZhb4ciZZLXwp2daR6yJEZkF_am_J8uBGkfgcGjCazqmTbAMkAjua3XHRmvV29Z8QMyw/exec'

const SERVICE_DATA = {
  'meta-ads': {
    title: 'Meta Ads',
    subtitle: 'Facebook & Instagram Advertising',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2 0%, #0d5fd4 100%)',
    img: '/meta ads.png',
    desc: 'We create hyper-targeted Meta campaigns that put your brand in front of the right people at the right time. From awareness to conversions — we handle everything.',
    stats: [['8.4x', 'Avg ROAS'], ['50+', 'Brands Scaled'], ['₹5Cr+', 'Ad Spend']],
    packages: [
      {
        name: 'Starter',
        tag: 'Best for New Brands',
        features: ['1 Ad Account Setup', 'Facebook + Instagram Ads', '2 Ad Campaigns/Month', 'Basic Audience Targeting', 'Pixel Setup & Tracking', 'Bi-weekly Reports', 'WhatsApp Support'],
        brochure: '/brochures/meta-ads-starter.pdf',
      },
      {
        name: 'Growth',
        tag: 'Most Popular',
        popular: true,
        features: ['2 Ad Accounts', 'Facebook + Instagram + Reels', '5 Campaigns/Month', 'Lookalike & Retargeting', 'Creative A/B Testing', 'Weekly Reports + Call', 'Dedicated Manager', 'Lead Form Campaigns'],
        brochure: '/brochures/meta-ads-growth.pdf',
      },
      {
        name: 'Scale',
        tag: 'For High-Growth Brands',
        features: ['Unlimited Campaigns', 'Full Funnel Strategy', 'Custom Audiences + CRM Sync', 'Video Ad Production', 'Daily Optimization', 'Daily Reports + Weekly Call', 'Priority Support 24/7', 'Influencer Collaboration'],
        brochure: '/brochures/meta-ads-scale.pdf',
      },
    ],
  },
  'google-ads': {
    title: 'Google Ads',
    subtitle: 'Search, Display & YouTube Advertising',
    color: '#ea4335',
    gradient: 'linear-gradient(135deg, #ea4335 0%, #c5221f 100%)',
    img: '/google ads.png',
    desc: 'Show up when customers are actively searching. Our Google Ads experts craft campaigns that drive high-intent traffic and maximize your ROI with precision targeting.',
    stats: [['12x', 'Max ROAS'], ['100+', 'Campaigns'], ['₹3Cr+', 'Ad Spend']],
    packages: [
      {
        name: 'Starter',
        tag: 'Best for Local Businesses',
        features: ['Search Ads Setup', 'Up to 3 Ad Groups', 'Keyword Research (50 KWs)', 'Basic Conversion Tracking', 'Google Analytics Setup', 'Monthly Report', 'Email Support'],
        brochure: '/brochures/google-ads-starter.pdf',
      },
      {
        name: 'Growth',
        tag: 'Most Popular',
        popular: true,
        features: ['Search + Display Ads', 'Up to 8 Ad Groups', 'Keyword Research (200 KWs)', 'Remarketing Campaigns', 'Quality Score Optimization', 'Bi-weekly Reports + Call', 'Dedicated Manager', 'Shopping Ads (if applicable)'],
        brochure: '/brochures/google-ads-growth.pdf',
      },
      {
        name: 'Scale',
        tag: 'For E-commerce & Enterprises',
        features: ['Search + Display + YouTube', 'Unlimited Ad Groups', 'Full Keyword Strategy', 'Performance Max Campaigns', 'YouTube Video Ads', 'Daily Optimization', 'Weekly Strategy Call', 'Competitor Analysis'],
        brochure: '/brochures/google-ads-scale.pdf',
      },
    ],
  },
  'lead-generation': {
    title: 'Lead Generation',
    subtitle: 'Qualified Leads on Autopilot',
    color: '#ff6b00',
    gradient: 'linear-gradient(135deg, #ff6b00 0%, #e05a00 100%)',
    img: '/lead gen.png',
    desc: 'Stop chasing cold leads. We build automated lead generation funnels that bring qualified prospects directly to your inbox — ready to buy.',
    stats: [['2000+', 'Leads Generated'], ['₹18', 'Avg CPL'], ['500+', 'Leads/Month']],
    packages: [
      {
        name: 'Starter',
        tag: 'Best for Service Businesses',
        features: ['1 Lead Gen Campaign', 'Landing Page Design', 'Lead Form Setup', 'WhatsApp Integration', 'Basic CRM Setup', 'Monthly Report', 'Email Support'],
        brochure: '/brochures/leadgen-starter.pdf',
      },
      {
        name: 'Growth',
        tag: 'Most Popular',
        popular: true,
        features: ['3 Lead Gen Campaigns', 'Custom Landing Pages', 'Multi-platform (Meta + Google)', 'WhatsApp + Email Automation', 'CRM Integration', 'Lead Scoring Setup', 'Weekly Reports + Call', 'Dedicated Manager'],
        brochure: '/brochures/leadgen-growth.pdf',
      },
      {
        name: 'Scale',
        tag: 'For Real Estate & Education',
        features: ['Unlimited Campaigns', 'Full Funnel Design', 'Omnichannel Lead Capture', 'Advanced Automation Flows', 'Sales Team CRM Training', 'Daily Lead Reports', 'Priority Support', 'Monthly Strategy Session'],
        brochure: '/brochures/leadgen-scale.pdf',
      },
    ],
  },
  'web-development': {
    title: 'Web Development',
    subtitle: 'Websites That Convert',
    color: '#1a2aff',
    gradient: 'linear-gradient(135deg, #1a2aff 0%, #0d1499 100%)',
    img: '/web develop.png',
    desc: 'Beautiful, fast, and conversion-optimized websites built with modern tech. From landing pages to full e-commerce stores — we build digital experiences that sell.',
    stats: [['50+', 'Websites Built'], ['< 2s', 'Load Time'], ['100%', 'Mobile Ready']],
    packages: [
      {
        name: 'Landing Page',
        tag: 'Best for Campaigns',
        features: ['1 Page Website', 'Mobile Responsive Design', 'Contact / Lead Form', 'Basic SEO Setup', 'Google Analytics', 'Fast Hosting Setup', '3 Months Support'],
        brochure: '/brochures/web-landing.pdf',
      },
      {
        name: 'Business Website',
        tag: 'Most Popular',
        popular: true,
        features: ['Up to 8 Pages', 'Custom UI/UX Design', 'Mobile + Tablet Responsive', 'On-Page SEO', 'Blog / CMS Integration', 'WhatsApp Chat Button', 'Speed Optimization', '6 Months Support'],
        brochure: '/brochures/web-business.pdf',
      },
      {
        name: 'E-commerce / Custom',
        tag: 'For Online Stores',
        features: ['Unlimited Pages', 'E-commerce Integration', 'Payment Gateway Setup', 'Product Management Panel', 'Advanced SEO', 'Custom Animations', 'Performance Optimization', '1 Year Support'],
        brochure: '/brochures/web-ecommerce.pdf',
      },
    ],
  },
  'seo-gmb': {
    title: 'SEO + GMB',
    subtitle: 'Rank #1 on Google & Maps',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    img: '/seo.png',
    desc: 'Dominate local and organic search results. Our SEO + Google My Business optimization gets your business found by customers who are ready to buy right now.',
    stats: [['200+', 'Keywords Ranked'], ['Page 1', 'Google Results'], ['5x', 'Organic Traffic']],
    packages: [
      {
        name: 'Local SEO',
        tag: 'Best for Local Businesses',
        features: ['GMB Setup & Optimization', '10 Target Keywords', 'On-Page SEO (5 Pages)', 'NAP Citations', 'Google Reviews Strategy', 'Monthly Ranking Report', 'Email Support'],
        brochure: '/brochures/seo-local.pdf',
      },
      {
        name: 'Growth SEO',
        tag: 'Most Popular',
        popular: true,
        features: ['GMB + Local SEO', '30 Target Keywords', 'On-Page SEO (15 Pages)', 'Technical SEO Audit', 'Backlink Building (10/month)', 'Content Optimization', 'Bi-weekly Reports + Call', 'Competitor Analysis'],
        brochure: '/brochures/seo-growth.pdf',
      },
      {
        name: 'Authority SEO',
        tag: 'For Competitive Markets',
        features: ['Full SEO Strategy', '100+ Keywords', 'Unlimited Page Optimization', 'Advanced Technical SEO', 'Backlink Building (30/month)', 'Blog Content (4/month)', 'Weekly Reports + Call', 'Schema Markup + Core Web Vitals'],
        brochure: '/brochures/seo-authority.pdf',
      },
    ],
  },
  'app-development': {
    title: 'App Development',
    subtitle: 'iOS & Android Mobile Apps',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    img: '/web develop.png',
    desc: 'End-to-end mobile app development for iOS & Android — from UI/UX design to deployment. We build fast, scalable & user-friendly apps that solve real business problems.',
    stats: [['iOS & Android', 'Platform'], ['2+', 'Apps Built'], ['100%', 'Custom']],
    packages: [
      {
        name: 'Basic App',
        tag: 'Best for Startups',
        features: ['Up to 5 Screens', 'Android App', 'Basic UI/UX Design', 'Firebase Integration', 'Push Notifications', '3 Months Support', 'Play Store Upload'],
        brochure: '/brochures/app-basic.pdf',
      },
      {
        name: 'Business App',
        tag: 'Most Popular',
        popular: true,
        features: ['Up to 15 Screens', 'Android + iOS', 'Custom UI/UX Design', 'Backend API Integration', 'Payment Gateway', 'Admin Panel', '6 Months Support', 'Both Store Uploads'],
        brochure: '/brochures/app-business.pdf',
      },
      {
        name: 'Enterprise App',
        tag: 'For Large Businesses',
        features: ['Unlimited Screens', 'Android + iOS + Web', 'Advanced UI/UX', 'Custom Backend', 'Real-time Features', 'Analytics Dashboard', '1 Year Support', 'Dedicated Developer'],
        brochure: '/brochures/app-enterprise.pdf',
      },
    ],
  },
  'social-media': {
    title: 'Social Media Marketing',
    subtitle: 'Build a Brand People Love',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)',
    img: '/social media.png',
    desc: 'Consistent, creative, and engaging social media presence across Instagram, Facebook, LinkedIn & YouTube. We create content that builds community and drives sales.',
    stats: [['30+', 'Posts/Month'], ['10K+', 'Avg Reach/Post'], ['100+', 'Brands Managed']],
    packages: [
      {
        name: 'Basic',
        tag: 'Best for Startups',
        features: ['1 Platform (Instagram/FB)', '12 Posts/Month', 'Basic Graphic Design', 'Caption Writing', 'Hashtag Strategy', 'Monthly Report', 'Email Support'],
        brochure: '/brochures/social-basic.pdf',
      },
      {
        name: 'Pro',
        tag: 'Most Popular',
        popular: true,
        features: ['2 Platforms', '20 Posts/Month', '4 Reels/Month', 'Custom Brand Graphics', 'Story Content', 'Community Management', 'Monthly Analytics Call', 'Competitor Tracking'],
        brochure: '/brochures/social-pro.pdf',
      },
      {
        name: 'Premium',
        tag: 'For Serious Brands',
        features: ['4 Platforms', '30+ Posts/Month', '8 Reels + 1 YouTube Short', 'Full Brand Identity', 'Influencer Outreach', 'Paid Boost Management', 'Weekly Reports + Call', 'Content Calendar Planning'],
        brochure: '/brochures/social-premium.pdf',
      },
    ],
  },
}

function BrochureModal({ pkg, service, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const params = new URLSearchParams({
        formType: 'brochure',
        name: form.name,
        phone: form.phone,
        email: form.email,
        business: form.business,
        service: service.title,
        package: pkg.name,
      })
      await fetch(`${SHEET_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      })
    } catch {}
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <motion.div className="brochure-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="brochure-modal"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="brochure-close" onClick={onClose}><FiX size={18} /></button>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="brochure-modal-top" style={{ background: service.gradient }}>
                <div className="brochure-modal-icon">📄</div>
                <h3>Get Your Free Brochure</h3>
                <p>{service.title} — <strong>{pkg.name}</strong> Package</p>
              </div>
              <form className="brochure-form" onSubmit={handleSubmit}>
                <p className="brochure-form-note">Fill in your details and we'll send the brochure instantly.</p>
                <div className="brochure-field">
                  <FiUser size={15} />
                  <input required placeholder="Your Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="brochure-field">
                  <FiPhone size={15} />
                  <input required placeholder="Phone Number" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="brochure-field">
                  <FiMail size={15} />
                  <input placeholder="Email Address (optional)" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="brochure-field">
                  <FiBriefcase size={15} />
                  <input required placeholder="Business / Company Name" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} />
                </div>
                <button type="submit" className="brochure-submit" style={{ background: service.gradient }} disabled={loading}>
                  {loading ? <span className="brochure-spinner" /> : <><FiDownload size={16} /> Get Brochure</>}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="thanks" className="brochure-thankyou"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            >
              {/* Top gradient banner */}
              <div className="bty-banner" style={{ background: service.gradient }}>
                <div className="bty-confetti">
                  {['🎉','✨','🚀','⭐','💼'].map((e, i) => (
                    <motion.span key={i} className="bty-emoji"
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -40, opacity: 0 }}
                      transition={{ delay: i * 0.15, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                    >{e}</motion.span>
                  ))}
                </div>
                <div className="bty-check-wrap">
                  <motion.div className="bty-check"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                  >
                    ✓
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="bty-body">
                <motion.h2 className="bty-title"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                >
                  Thank You, {form.name.split(' ')[0]}! 🙌
                </motion.h2>
                <motion.p className="bty-sub"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                >
                  Your request for the <strong>{service.title} — {pkg.name}</strong> brochure has been received.
                </motion.p>

                <motion.div className="bty-info-cards"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                >
                  <div className="bty-info-card">
                    <span className="bty-info-icon">📞</span>
                    <div>
                      <div className="bty-info-label">We'll call you on</div>
                      <div className="bty-info-val">{form.phone}</div>
                    </div>
                  </div>
                  <div className="bty-info-card">
                    <span className="bty-info-icon">⏱️</span>
                    <div>
                      <div className="bty-info-label">Response time</div>
                      <div className="bty-info-val">Within 2 Hours</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="bty-promise"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                >
                  <span>🎯</span> Our team will contact you soon with the brochure & a <strong>free strategy session</strong>.
                </motion.div>

                <motion.div className="bty-actions"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
                >
                  <a
                    href={`https://wa.me/919935065517?text=Hi! I'm ${form.name} from ${form.business}. I requested the ${service.title} ${pkg.name} brochure.`}
                    target="_blank" rel="noreferrer"
                    className="bty-wa-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                  <button className="bty-close-btn" onClick={onClose}>Close</button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function PackageCard({ pkg, service, index }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.div
        className={`sp-pkg-card ${pkg.popular ? 'sp-pkg-popular' : ''}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        style={{ '--svc-color': service.color }}
      >
        {pkg.popular && (
          <div className="sp-pkg-popular-badge" style={{ background: service.gradient }}>
            ⭐ Most Popular
          </div>
        )}
        <div className="sp-pkg-top">
          <span className="sp-pkg-tag">{pkg.tag}</span>
          <h3 className="sp-pkg-name">{pkg.name}</h3>
        </div>

        <ul className="sp-pkg-features">
          {pkg.features.map((f, i) => (
            <li key={i}>
              <span className="sp-pkg-check" style={{ color: service.color, background: `${service.color}15` }}>
                <FiCheck size={11} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button
          className="sp-pkg-brochure"
          style={pkg.popular ? { background: service.gradient, color: '#fff', border: 'none' } : { borderColor: service.color, color: service.color }}
          onClick={() => setShowModal(true)}
        >
          <FiDownload size={15} /> Download Brochure
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && <BrochureModal pkg={pkg} service={service} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function ServicePage() {
  const { slug } = useParams()
  const s = SERVICE_DATA[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
    const navbar = document.querySelector('.navbar')
    if (!navbar) return
    const set = () => document.documentElement.style.setProperty('--header-height', `${navbar.getBoundingClientRect().height}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(navbar)
    return () => ro.disconnect()
  }, [slug])

  if (!s) return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2>Service not found</h2>
      <Link to="/">Go Home</Link>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="sp-wrap">

        {/* ── HERO ── */}
        <div className="sp-hero" style={{ '--svc-gradient': s.gradient, '--svc-color': s.color }}>
          <div className="sp-hero-orb sp-hero-orb1" />
          <div className="sp-hero-orb sp-hero-orb2" />
          <div className="sp-hero-grid" />

          <div className="sp-hero-inner">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="sp-back"><FiArrowLeft size={15} /> Back to Home</Link>
              <div className="sp-hero-badge">
                <img src={s.img} alt={s.title} className="sp-hero-badge-img" />
              </div>
              <h1 className="sp-hero-title">{s.title}</h1>
              <p className="sp-hero-sub">{s.subtitle}</p>
              <p className="sp-hero-desc">{s.desc}</p>
              <div className="sp-hero-actions">
                <a href="#packages" className="sp-hero-cta" style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.4)' }}>
                  View Packages <FiArrowRight size={15} />
                </a>
                <a href="/#contact" className="sp-hero-cta sp-hero-cta-solid">
                  Free Consultation <FiArrowRight size={15} />
                </a>
              </div>
            </motion.div>

            <motion.div className="sp-hero-stats" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              {s.stats.map(([num, label], i) => (
                <motion.div key={i} className="sp-stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <span className="sp-stat-num">{num}</span>
                  <span className="sp-stat-lbl">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── PACKAGES ── */}
        <div className="sp-packages-section" id="packages">
          <motion.div className="sp-packages-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="sp-packages-eyebrow" style={{ color: s.color, background: `${s.color}12`, border: `1px solid ${s.color}30` }}>
              Choose Your Plan
            </span>
            <h2>Our <span style={{ color: s.color }}>{s.title}</span> Packages</h2>
            <p>Transparent deliverables. No hidden charges. Download the brochure to see full details.</p>
          </motion.div>

          <div className="sp-packages-grid">
            {s.packages.map((pkg, i) => (
              <PackageCard key={i} pkg={pkg} service={s} index={i} />
            ))}
          </div>

          <motion.p className="sp-packages-note" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            💬 Need a custom plan? <a href="/#contact" style={{ color: s.color }}>Talk to us</a> — we'll build one just for you.
          </motion.p>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="sp-bottom-cta" style={{ background: s.gradient }}>
          <div className="sp-bottom-cta-orb" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3>Ready to Get Started with {s.title}?</h3>
            <p>Book a free 30-minute strategy call. No commitment, just clarity.</p>
            <a href="/#contact" className="sp-bottom-cta-btn">
              Book Free Call <FiArrowRight size={16} />
            </a>
          </motion.div>
        </div>

      </div>
      <Footer />
    </>
  )
}
