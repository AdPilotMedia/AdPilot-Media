import { FiZap, FiTrendingUp, FiTarget, FiStar, FiActivity, FiLayers, FiShoppingBag, FiBarChart2 } from 'react-icons/fi'
import './Marquee.css'

const items = [
  { icon: FiZap,         text: '500+ Campaigns' },
  { icon: FiTrendingUp,  text: '₹1Cr+ Revenue Generated' },
  { icon: FiTarget,      text: '5x Avg ROAS' },
  { icon: FiStar,        text: '100+ Brands Scaled' },
  { icon: FiActivity,    text: '5+ Years Experience' },
  { icon: FiLayers,      text: 'D2C Specialists' },
  { icon: FiShoppingBag, text: 'E-Commerce Experts' },
  { icon: FiBarChart2,   text: 'Data-Driven Results' },
]

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...items, ...items].map((item, i) => (
            <span className="marquee-item" key={i}>
              <item.icon size={13} />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
