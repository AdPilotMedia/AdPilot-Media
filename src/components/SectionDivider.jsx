import './SectionDivider.css'

export default function SectionDivider({ flip = false, style = {} }) {
  return (
    <div className={`sec-divider ${flip ? 'flip' : ''}`} style={style}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="currentColor" />
      </svg>
      <div className="sec-divider-line">
        <span className="sdl-dot" />
        <span className="sdl-dash" />
        <span className="sdl-star">✦</span>
        <span className="sdl-dash" />
        <span className="sdl-dot" />
      </div>
    </div>
  )
}
