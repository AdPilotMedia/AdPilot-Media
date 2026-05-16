import './ParticlesBg.css'

const isMobile = window.innerWidth <= 768
const COUNT = isMobile ? 18 : 35

const DOTS = Array.from({ length: COUNT }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 2}px`,
  duration: `${12 + Math.random() * 10}s`,
  delay: `${Math.random() * 8}s`,
  opacity: 0.1 + Math.random() * 0.18,
  color: ['#1a2aff', '#ff6b00', '#4d6aff', '#a78bfa'][Math.floor(Math.random() * 4)],
}))

export default function ParticlesBg() {
  return (
    <div className="particles-wrap">
      {DOTS.map(d => (
        <span
          key={d.id}
          className="particle-dot"
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            background: d.color,
            opacity: d.opacity,
            animationDuration: d.duration,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  )
}
