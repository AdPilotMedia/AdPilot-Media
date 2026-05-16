import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './Contact.css'

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwZhb4ciZZLXwp2daR6yJEZkF_am_J8uBGkfgcGjCazqmTbAMkAjua3XHRmvV29Z8QMyw/exec'

const services = [
  'Meta Ads (Facebook & Instagram)',
  'Google Ads (Search & YouTube)',
  'Lead Generation',
  'SEO + Google My Business',
  'Social Media Marketing',
  'Website Design & Development',
  'Mobile App Development',
]

const infoItems = [
  { icon: <FiMail />, label: 'Email', val: 'hello@adpilotmedia.com', href: 'mailto:hello@adpilotmedia.com' },
  { icon: <FiPhone />, label: 'Phone', val: '+91 99350 65517', href: 'tel:+919935065517' },
  { icon: <FiMapPin />, label: 'Address', val: 'Rajrooppur, Near Subedarganj Railway Station, Prayagraj, UP - 211011', href: 'https://maps.google.com/?q=Rajrooppur+Prayagraj' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const waLink = `https://wa.me/919935065517?text=Hi%20AdPilot%20Media!%20I'm%20interested%20in%20your%20services.`

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const params = new URLSearchParams({
        formType: 'contact',
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      })
      await fetch(`${SHEET_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-bg-text">CONTACT</div>

      <motion.div
        ref={ref}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">Let's Grow Your <span>Brand Together</span></h2>
        <p className="section-sub">Fill the form below or reach us directly. We respond within 2 hours.</p>
      </motion.div>

      <div className="contact-wrapper">
        {/* Left Info */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="info-items">
            {infoItems.map((item, i) => (
              <a href={item.href} target={i === 2 ? '_blank' : '_self'} rel="noreferrer" className="info-item glass-card" key={i}>
                <div className="info-icon">{item.icon}</div>
                <div>
                  <div className="info-label">{item.label}</div>
                  <div className="info-val">{item.val}</div>
                </div>
              </a>
            ))}
          </div>

          <a href={waLink} target="_blank" rel="noreferrer" className="wa-btn">
            <FaWhatsapp size={22} />
            Chat on WhatsApp
          </a>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.1!2d81.8467!3d25.4358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRajrooppur%2C+Prayagraj%2C+UP+211011!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AdPilot Media Location"
            />
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="contact-form-wrap glass-card"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {status === 'success' ? (
            <div className="success-msg">
              <div className="success-anim">
                <div className="success-ring" />
                <div className="success-check">✓</div>
              </div>
              <h3>Thank You, {form.name.split(' ')[0]}! 🙌</h3>
              <p>Your message has been received. Our team will reach out to you on <strong>{form.phone}</strong> within <strong>2 hours</strong>.</p>
              <div className="success-steps">
                <div className="ss-step"><span>1</span> We review your requirements</div>
                <div className="ss-step"><span>2</span> Our expert calls you</div>
                <div className="ss-step"><span>3</span> Free strategy session</div>
              </div>
              <a href="https://wa.me/919935065517" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: 20, justifyContent: 'center', textDecoration: 'none' }}>
                💬 Chat on WhatsApp
              </a>

            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="form-title">Request Free Consultation</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input id="name" type="text" placeholder="Rahul Sharma" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input id="email" type="email" placeholder="rahul@company.com" required
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input id="phone" type="tel" placeholder="+91 99350 65517" required
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Needed</label>
                  <select id="service" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select Service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={4} placeholder="Tell us about your business and goals..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>

              {status === 'error' && (
                <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: 8 }}>
                  Something went wrong. Please try again or WhatsApp us.
                </p>
              )}

              <button type="submit" className="btn-primary" disabled={status === 'loading'}
                style={{ width: '100%', justifyContent: 'center' }}>
                <FiSend />
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              <p className="form-note">
                📧 Data saves directly to our team's dashboard
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
