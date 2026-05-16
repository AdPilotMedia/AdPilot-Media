import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import LegalModal from './LegalModal'
import './Footer.css'

const socials = [
  { icon: <FaFacebookF />, href: 'https://facebook.com/Adpilotmedia', label: 'Facebook' },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/adpilot.media', label: 'Instagram' },
  { icon: <FaLinkedinIn />, href: 'https://linkedin.com/company/adpilot-media', label: 'LinkedIn' },
  { icon: <FaYoutube />, href: 'https://www.youtube.com/@AdpilotMedia', label: 'YouTube' },
  { icon: <FaTwitter />, href: 'https://x.com/home', label: 'Twitter' },
  { icon: <FaWhatsapp />, href: 'https://wa.me/919935065517', label: 'WhatsApp' },
]

export default function Footer() {
  const [modal, setModal] = useState(null)

  return (
    <footer className="footer">
      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}

      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/Website Logo.jpeg" alt="AdPilot Media" className="footer-logo-img" />
          </div>
          <p className="footer-tagline">
            Growing Brands.<br />
            <span>Building Marketers.</span>
          </p>
          <div className="footer-socials">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label={s.label}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-col footer-col-links">
          <h4>Quick Links</h4>
          <a href="/#home">Home</a>
          <a href="/#services">Services</a>
          <a href="/#about">About Us</a>
          <Link to="/results">Results</Link>
          <a href="/#team">Our Team</a>
          <a href="/#reviews">Reviews</a>
          <a href="/#contact">Contact</a>
        </div>

        <div className="footer-col footer-col-services">
          <h4>Services</h4>
          <a href="/services/meta-ads">Meta Ads Management</a>
          <a href="/services/google-ads">Google Ads Management</a>
          <a href="/services/social-media">Social Media Marketing</a>
          <a href="/services/seo-gmb">SEO &amp; Google My Business</a>
          <a href="/services/lead-generation">Lead Generation</a>
          <a href="/services/web-development">Web Development</a>
        </div>

        <div className="footer-col footer-col-contact">
          <h4>Contact Us</h4>
          <a href="mailto:hello@adpilotmedia.com" className="footer-contact-item">
            <FiMail size={14} />
            <span>hello@adpilotmedia.com</span>
          </a>
          <a href="tel:+919935065517" className="footer-contact-item">
            <FiPhone size={14} />
            <span>+91 99350 65517</span>
          </a>
          <a href="https://maps.google.com/?q=Rajrooppur+Prayagraj" target="_blank" rel="noreferrer" className="footer-contact-item">
            <FiMapPin size={14} />
            <span>Rajrooppur, Near Subedarganj<br />Railway Station, Prayagraj,<br />UP - 211011</span>
          </a>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AdPilot Media. All rights reserved.</p>
        <div className="footer-legal">
          <button onClick={() => setModal('privacy')}>Privacy Policy</button>
          <button onClick={() => setModal('terms')}>Terms & Conditions</button>
          <button onClick={() => setModal('refund')}>Refund Policy</button>
          <button onClick={() => setModal('disclaimer')}>Disclaimer</button>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <motion.a
        href="https://wa.me/919935065517?text=Hi%20AdPilot%20Media!"
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={28} />
      </motion.a>
    </footer>
  )
}
