import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import './About.css'

const points = [
  'Performance-first approach — every rupee measured',
  'AI-powered targeting that finds your ideal customers',
  'Transparent, weekly ROI reports (no hidden metrics)',
  'Dedicated account manager assigned to you',
  '5+ years building successful campaigns',
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="about" id="about" aria-label="About AdPilot Media" itemScope itemType="https://schema.org/AboutPage">
      <div className="section-bg-text">ABOUT</div>
      <div className="about-inner">
        <motion.div
          ref={ref}
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Who We Are</span>
          <h2 className="section-title">A Team Obsessed With <span>Your Growth</span></h2>
          <p className="about-desc" itemProp="description">
            AdPilot Media is a <strong>performance-first marketing agency based in Prayagraj, India</strong>.
            We don't just make ads look pretty. We make ads that sell. Every campaign is built on data.
            Every decision is backed by numbers. Every result is measurable.
          </p>
          <p className="about-desc">
            We work with startups and big companies across e-commerce, SaaS, real estate, and education.
            We've delivered millions in revenue for our clients through smart, data-backed advertising.
          </p>

          <ul className="about-points">
            {points.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <FiCheckCircle size={16} color="var(--orange)" style={{ flexShrink: 0 }} />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary" style={{ marginTop: 36, display: 'inline-flex' }}>
            Work With Us <FiArrowRight size={15} />
          </a>
        </motion.div>

        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      </div>
    </section>
  )
}
