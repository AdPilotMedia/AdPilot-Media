import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowRight } from 'react-icons/fi'
import './CTABanner.css'

export default function CTABanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <section className="cta-banner">
      <div className="cta-orb cta-orb1" />
      <div className="cta-orb cta-orb2" />
      <motion.div
        ref={ref}
        className="cta-inner"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="cta-text">
          <h2>Ready to <span>10x</span> Your Ad Results?</h2>
          <p>Get a free audit of your current campaigns. No commitment, just clarity.</p>
        </div>
        <div className="cta-actions">
          <a href="#contact" className="btn-primary">
            Get Free Audit <FiArrowRight size={16} />
          </a>
          <a href="https://wa.me/919935065517?text=Hi%20AdPilot%20Media!" target="_blank" rel="noreferrer" className="btn-outline">
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  )
}
