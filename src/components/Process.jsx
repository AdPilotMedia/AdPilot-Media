import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Process.css'

const steps = [
  { num: '01', icon: '🔍', title: 'Discovery & Audit', desc: 'We deep-dive into your business, audience, competitors and current ad performance to find growth opportunities.' },
  { num: '02', icon: '🧠', title: 'Strategy & Planning', desc: 'We build a custom data-backed marketing strategy with clear KPIs, budget allocation and campaign roadmap.' },
  { num: '03', icon: '🎨', title: 'Creative & Launch', desc: 'Our creative team produces scroll-stopping ads. We launch campaigns with precision targeting and A/B testing.' },
  { num: '04', icon: '📈', title: 'Optimize & Scale', desc: 'We monitor daily, optimize weekly and scale what works — maximizing your ROAS and minimizing wasted spend.' },
]

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="process">
      <div className="process-orb process-orb-a" />
      <div className="process-orb process-orb-b" />
      <div className="section-bg-text">PROCESS</div>
      <motion.div
        ref={ref}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">How We Work</span>
        <h2 className="section-title">Our <span>4-Step</span> Growth Process</h2>
        <p className="section-sub">A proven framework that has delivered results for 100+ brands across India.</p>
      </motion.div>

      <div className="process-grid">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="process-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.12 }}
          >
            <div className="pc-step-line">
              <span className="pc-num">STEP {s.num}</span>
              <div className="pc-line" />
            </div>
            <div className="pc-icon-wrap">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            {i < steps.length - 1 && <div className="pc-arrow">→</div>}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
