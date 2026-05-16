import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './ServiceOrbit.css'

const services = [
  { icon: '🎯', label: 'Meta Ads', color: '#1877f2' },
  { icon: '🔍', label: 'Google Ads', color: '#ea4335' },
  { icon: '📈', label: 'Lead Generation', color: '#ff6b00' },
  { icon: '🌐', label: 'Website Dev', color: '#1a2aff' },
  { icon: null, img: '/App develop.jpg', label: 'App Development', color: '#7c3aed' },
  { icon: '📊', label: 'Analytics', color: '#059669' },
]

function OrbitItem({ service, index, total, radius, paused }) {
  const angle = (360 / total) * index
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius

  return (
    <motion.div
      className="orbit-item"
      style={{
        left: `calc(50% + ${x}px - 36px)`,
        top: `calc(50% + ${y}px - 36px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.4 }}
    >
      <div
        className="orbit-icon"
        style={{
          background: `${service.color}15`,
          border: `2px solid ${service.color}40`,
          boxShadow: `0 4px 20px ${service.color}25`,
        }}
      >
        {service.img ? (
          <img src={service.img} alt={service.label} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }} />
        ) : (
          <span>{service.icon}</span>
        )}
      </div>
      <div className="orbit-label" style={{ color: service.color }}>
        {service.label}
      </div>
    </motion.div>
  )
}

export default function ServiceOrbit() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [paused, setPaused] = useState(false)
  const [radius, setRadius] = useState(200)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 480) setRadius(130)
      else if (window.innerWidth < 768) setRadius(160)
      else setRadius(200)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section className="service-orbit-section" ref={ref}>
      {/* Left text */}
      <motion.div
        className="orbit-text"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-tag">Our Core Services</span>
        <h2 className="section-title">
          Everything You Need<br />To <span>Dominate</span> Online
        </h2>
        <p className="orbit-desc">
          From paid ads to full-stack development — AdPilot Media is your
          one-stop growth partner. We handle everything so you can focus
          on running your business.
        </p>
        <ul className="orbit-list">
          {services.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <span className="ol-dot" style={{ background: s.color }} />
              <span className="ol-icon">{s.icon}</span>
              <span>{s.label}</span>
            </motion.li>
          ))}
        </ul>
        <a href="#contact" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
          Get Started Today →
        </a>
      </motion.div>

      {/* Orbit visual */}
      <motion.div
        className="orbit-wrap"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Orbit rings */}
        <div className="orbit-ring ring1" />
        <div className="orbit-ring ring2" />
        <div className="orbit-ring ring3" />

        {/* Rotating container */}
        <div className={`orbit-rotator ${paused ? 'paused' : ''}`}>
          {services.map((s, i) => (
            <OrbitItem
              key={i}
              service={s}
              index={i}
              total={services.length}
              radius={radius}
              paused={paused}
            />
          ))}
        </div>

        {/* Center circle */}
        <motion.div
          className="orbit-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/Website Logo.jpeg" alt="AdPilot Media" className="orbit-logo" />
          <div className="orbit-center-text">360°</div>
          <div className="orbit-center-sub">Growth</div>
        </motion.div>

        {/* Pulse rings */}
        <div className="pulse-ring pr1" />
        <div className="pulse-ring pr2" />
      </motion.div>
    </section>
  )
}
