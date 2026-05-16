import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { SiMeta, SiGoogleads, SiGoogle } from 'react-icons/si'
import { MdLeaderboard, MdPhoneIphone } from 'react-icons/md'
import { FaCode, FaInstagram } from 'react-icons/fa'
import './Navbar.css'

const serviceLinks = [
  { label: 'Meta Ads',        slug: 'meta-ads',        color: '#1877f2', bg: 'rgba(24,119,242,0.15)', Icon: SiMeta,        tag: 'Facebook & Instagram' },
  { label: 'Google Ads',      slug: 'google-ads',      color: '#ea4335', bg: 'rgba(234,67,53,0.15)',  Icon: SiGoogleads,   tag: 'Search & YouTube' },
  { label: 'Lead Generation', slug: 'lead-generation', color: '#ff6b00', bg: 'rgba(255,107,0,0.15)', Icon: MdLeaderboard, tag: '₹18 Avg CPL' },
  { label: 'Web Development', slug: 'web-development', color: '#1a2aff', bg: 'rgba(26,42,255,0.15)', Icon: FaCode,        tag: 'Convert & Scale' },
  { label: 'App Development', slug: 'app-development', color: '#0ea5e9', bg: 'rgba(14,165,233,0.15)', Icon: MdPhoneIphone, tag: 'iOS & Android' },
  { label: 'SEO + GMB',       slug: 'seo-gmb',         color: '#059669', bg: 'rgba(5,150,105,0.15)', Icon: SiGoogle,      tag: 'Rank #1 on Google' },
  { label: 'Social Media',    slug: 'social-media',    color: '#e1306c', bg: 'rgba(225,48,108,0.15)', Icon: FaInstagram,   tag: 'Grow & Engage' },
]

const links = [
  { label: 'About',   href: '/#about' },
  { label: 'Results', href: '/#results' },
  { label: 'Team',    href: '/#team' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main Navigation">
      <Link to="/" className="nav-logo" aria-label="AdPilot Media - Home">
        <img src="/Website Logo.jpeg" alt="AdPilot Media" width="48" height="48" />
      </Link>

      {/* Desktop links */}
      <ul className="nav-links">
        <li><a href="/#home" className="nav-link">Home</a></li>
        <li
          className="nav-item-dropdown"
          ref={dropdownRef}
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          <a href="/#services" className="nav-link nav-link-services">
            Services <FiChevronDown size={13} className={`chevron ${dropdown ? 'open' : ''}`} />
          </a>
          <AnimatePresence>
            {dropdown && (
              <motion.div className="nav-dropdown"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}
              >
                {serviceLinks.map(s => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="nav-dropdown-item" onClick={() => setDropdown(false)}>
                    <span className="ndi-icon" style={{ background: s.bg, color: s.color }}><s.Icon size={15} /></span>
                    <span className="ndi-text"><span className="ndi-label">{s.label}</span></span>
                    <FiArrowRight size={12} className="ndi-arrow" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
        {links.map(l => (
          <li key={l.label}><a href={l.href} className="nav-link">{l.label}</a></li>
        ))}
      </ul>

      <a href="/#contact" className="nav-cta btn-primary">Free Audit <FiArrowRight size={15} /></a>

      <button className="hamburger" onClick={() => setOpen(true)} aria-label="Menu">
        <FiMenu size={22} />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="mobile-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} onClick={() => setOpen(false)}
            />
            <motion.div className="mobile-menu"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Drawer header */}
              <div className="mm-header">
                <Link to="/" onClick={() => setOpen(false)}>
                  <img src="/Website Logo.jpeg" alt="AdPilot" className="mm-logo" />
                </Link>
                <button className="mm-close" onClick={() => setOpen(false)}><FiX size={18} /></button>
              </div>

              {/* Nav items */}
              <div className="mm-body">
                <a href="/#home" className="mm-link" onClick={() => setOpen(false)}>Home</a>

                {/* Services accordion */}
                <button className={`mm-link mm-svc-toggle ${mobileServices ? 'active' : ''}`} onClick={() => setMobileServices(v => !v)}>
                  <span>Services</span>
                  <FiChevronDown size={15} className={`chevron ${mobileServices ? 'open' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileServices && (
                    <motion.div className="mm-svc-list"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                    >
                      {serviceLinks.map(s => (
                        <Link key={s.slug} to={`/services/${s.slug}`} className="mm-svc-item"
                          onClick={() => { setOpen(false); setMobileServices(false) }}
                          style={{ '--sc': s.color }}
                        >
                          <span className="mm-svc-icon" style={{ background: s.bg, color: s.color }}>
                            <s.Icon size={13} />
                          </span>
                          <span className="mm-svc-text">
                            <span className="mm-svc-label">{s.label}</span>
                            <span className="mm-svc-tag" style={{ color: s.color }}>{s.tag}</span>
                          </span>
                          <FiArrowRight size={12} className="mm-svc-arrow" style={{ color: s.color }} />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {links.map(l => (
                  <a key={l.label} href={l.href} className="mm-link" onClick={() => setOpen(false)}>{l.label}</a>
                ))}

                {/* WhatsApp button right after last nav link */}
                <div className="mm-wa-wrap">
                  <a href="https://wa.me/919935065517" target="_blank" rel="noreferrer" className="mm-wa-btn">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="mm-footer">
                <a href="/#contact" className="btn-primary mm-cta" onClick={() => setOpen(false)}>
                  Get Free Audit <FiArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
