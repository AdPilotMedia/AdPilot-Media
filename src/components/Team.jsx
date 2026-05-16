import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiX, FiArrowRight } from 'react-icons/fi'
import './Team.css'

const team = [
  { name: 'Amit Maurya',        role: 'Founder & CEO',                             bio: '5+ Years of Experience in Performance Marketing',              color: '#ff6b00', img: '/Team/Amit Maurya.png',  imgPos: 'center 20%' },
  { name: 'Shai. K',           role: 'Co-Founder & Growth Consultant',             bio: 'Expert in scaling brands through data-driven growth strategies.', color: '#a855f7', img: '/Team/Shailesh.png',     imgPos: 'center top' },
  { name: 'Muskan Gupta',      role: 'Operations Head & Project Coordinator',      bio: 'Ensuring seamless project delivery and team coordination.',      color: '#ec4899', img: '/Team/Muskan.jpg',        imgPos: 'center 20%' },
  { name: 'Ramshankar',        role: 'SEO, Funnel & Landing Page Expert',          bio: 'Driving organic growth and high-converting funnels.',            color: '#059669', img: '/Team/Ramshankar.png',   imgPos: 'center top' },
  { name: 'Raghuvir Kushwaha', role: 'Video Production & Social Media Specialist', bio: 'Creating compelling video content that drives engagement.',      color: '#f59e0b', img: '/Team/Raghuvir.jpg',     imgPos: 'center 10%' },
  { name: 'Sonu Maurya',       role: 'Core Team & Video Strategist',               bio: 'Crafting video strategies that amplify brand presence.',         color: '#0ea5e9', img: '/Team/Sonu.jpg',          imgPos: 'center top' },
  { name: 'Ranjit Seth',       role: 'Senior Creative Web Designer',               bio: 'Designing stunning, conversion-focused web experiences.',        color: '#8b5cf6', img: '/Team/Ranjit.png',        imgPos: 'center top' },
  { name: 'Deepak Sahu',       role: 'Senior App Development Expert',              bio: 'Building robust and scalable mobile & web applications.',        color: '#10b981', img: '/Team/Deepak Sahu.png',   imgPos: 'center top' },
  { name: 'Sonu',              role: 'Senior SEO Strategist',                      bio: 'Ranking brands on top of Google with proven SEO tactics.',       color: '#ef4444', img: '/Team/Sonu Seo.png',      imgPos: 'center top' },
  { name: 'Divyansh',          role: 'Lead Creative Designer',                     bio: 'Leading creative direction with bold and impactful designs.',    color: '#1877f2', img: '/Team/Divyansh.jpg',      imgPos: 'center top' },
  { name: 'Abhishek Tripathi', role: 'E-Commerce Specialist',                      bio: 'Scaling e-commerce brands with targeted ad strategies.',         color: '#ff6b00', img: '/Team/Abhishek.png',      imgPos: 'center top' },
  { name: 'Tanisha',           role: 'Social Media Strategist',                    bio: 'Building engaged communities and viral social media campaigns.', color: '#e1306c', img: '/Team/Tanisha.png',       imgPos: 'center top' },
]

export default function Team() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selected, setSelected] = useState(null)
  return (
    <section className="team" id="team">
      <div className="section-bg-text">TEAM</div>
      <motion.div
        ref={ref}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">Our People</span>
        <h2 className="section-title">Meet The <span>Experts</span> Behind Your Growth</h2>
        <p className="section-sub">A passionate team of marketers, creatives & data nerds — all obsessed with your results.</p>
      </motion.div>

      <div className="team-scroll-wrap">
        <div className="team-scroll-track">
          {[team.slice(0, 6), team.slice(6)].map((row, rowIdx) => (
            <div className="team-row" key={rowIdx}>
              {row.map((m, i) => (
                <motion.div
                  key={i}
                  className="team-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: (rowIdx * 6 + i) * 0.07 }}
                  whileHover={{ y: -8, borderColor: `${m.color}40` }}
                  style={{ '--card-accent': m.color, border: `1px solid ${m.color}55`, boxShadow: `0 0 0 0px ${m.color}` }}
                >
                  <div className="tc-avatar" onClick={() => setSelected(m)}>
                    <img src={m.img} alt={m.name} style={{ objectPosition: m.imgPos }} loading="lazy" />
                    <div className="tc-avatar-zoom">🔍</div>
                  </div>
                  <h3>{m.name}</h3>
                  <div className="tc-role" style={{ color: m.color }}>{m.role}</div>
                  <p>{m.bio}</p>
                  <div className="tc-line" style={{ background: m.color }} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="team-scroll-hint">
        <FiArrowRight size={14} />
        <span>Scroll to see all team members</span>
        <FiArrowRight size={14} />
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="tc-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="tc-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="tc-modal-close" onClick={() => setSelected(null)}><FiX size={20} /></button>
              <img src={selected.img} alt={selected.name} style={selected.imgPos ? { objectPosition: selected.imgPos } : {}} />
              <div className="tc-modal-info">
                <h3 style={{ color: selected.color }}>{selected.name}</h3>
                <p>{selected.role}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
