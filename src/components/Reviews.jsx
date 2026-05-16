import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Reviews.css'

const images = [
  '/Review/Review 1.png',
  '/Review/Review 2.png',
  '/Review/Review 3.png',
  '/Review/Review 4.png',
  '/Review/Review 5.png',
  '/Review/Review 6.png',
  '/Review/Review 7.jpeg',
  '/Review/Review 8.jpeg',
  '/Review/Review 9.jpeg',
  '/Review/Review 10.jpeg',
]

export default function Reviews() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [lightbox, setLightbox] = useState(null)
  const sliderRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.offsetWidth)
      setActiveIdx(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i) => {
    const el = sliderRef.current
    if (!el) return
    el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' })
  }

  return (
    <section className="reviews" id="reviews">
      <div className="section-bg-text">REVIEWS</div>

      <motion.div
        ref={ref}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">Client Reviews</span>
        <h2 className="section-title">What Our <span>Clients</span> Say</h2>
        <p className="section-sub">Real results. Real clients. Real reviews from across India.</p>
      </motion.div>

      <div className="rev-gallery">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="rev-img-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setLightbox(src)}
          >
            <img src={src} alt={`Review ${i + 1}`} />
            <div className="rev-img-shine" />
          </motion.div>
        ))}
      </div>

      {/* Mobile slider */}
      <div className="rev-mobile-slider" ref={sliderRef}>
        {images.map((src, i) => (
          <div key={i} className="rev-mobile-slide" onClick={() => setLightbox(src)}>
            <img src={src} alt={`Review ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="rev-mobile-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`rev-mobile-dot ${i === activeIdx ? 'active' : ''}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="rev-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Review"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
