import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import './LegalModal.css'

const content = {
  terms: {
    title: 'Terms & Conditions',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        text: 'By accessing and using AdPilot Media\'s services or website (adpilotmedia.com), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.',
      },
      {
        heading: '2. Services',
        text: 'AdPilot Media provides digital marketing services including but not limited to: Meta Ads, Google Ads, SEO, Social Media Marketing, Creative Production, and Brand Strategy. All services are subject to a separate service agreement.',
      },
      {
        heading: '3. Client Responsibilities',
        text: 'Clients are responsible for providing accurate business information, timely approvals, and necessary access to ad accounts. AdPilot Media is not liable for delays caused by client inaction.',
      },
      {
        heading: '4. Payment Terms',
        text: 'All payments are due as per the agreed invoice schedule. Late payments may result in service suspension. Ad spend budgets are separate from agency fees and are managed on behalf of the client.',
      },
      {
        heading: '5. Confidentiality',
        text: 'Both parties agree to maintain confidentiality of proprietary information shared during the engagement. This includes campaign strategies, business data, and creative assets.',
      },
      {
        heading: '6. Intellectual Property',
        text: 'All creative assets produced by AdPilot Media remain the property of the client upon full payment. AdPilot Media retains the right to showcase work in its portfolio unless otherwise agreed.',
      },
      {
        heading: '7. Limitation of Liability',
        text: 'AdPilot Media is not liable for ad platform policy changes, account suspensions by third-party platforms, or results that vary due to market conditions beyond our control.',
      },
      {
        heading: '8. Termination',
        text: 'Either party may terminate services with 30 days written notice. Outstanding payments remain due upon termination.',
      },
      {
        heading: '9. Governing Law',
        text: 'These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Prayagraj, Uttar Pradesh.',
      },
      {
        heading: '10. Contact',
        text: 'For any queries regarding these terms, contact us at hello@adpilotmedia.com or +91 99350 65517.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Information We Collect',
        text: 'We collect information you provide directly: name, email, phone number, and business details when you fill our contact form or engage our services. We also collect usage data through cookies and analytics tools.',
      },
      {
        heading: '2. How We Use Your Information',
        text: 'Your information is used to: respond to enquiries, provide and improve our services, send relevant updates about our offerings, and comply with legal obligations. We do not sell your data to third parties.',
      },
      {
        heading: '3. Data Storage & Security',
        text: 'Your data is stored securely. We implement industry-standard security measures to protect against unauthorized access, alteration, or disclosure of your personal information.',
      },
      {
        heading: '4. Cookies',
        text: 'Our website uses cookies to enhance user experience and analyze traffic. You can disable cookies in your browser settings, though this may affect website functionality.',
      },
      {
        heading: '5. Third-Party Services',
        text: 'We use third-party tools like Google Analytics, Meta Pixel, and Formspree for analytics and form submissions. These services have their own privacy policies.',
      },
      {
        heading: '6. Your Rights',
        text: 'You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@adpilotmedia.com.',
      },
      {
        heading: '7. Updates',
        text: 'We may update this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.',
      },
    ],
  },
  refund: {
    title: 'Refund Policy',
    sections: [
      {
        heading: '1. Agency Fee Refunds',
        text: 'Agency management fees are non-refundable once work has commenced. If services have not started within 7 days of payment, a full refund will be issued upon request.',
      },
      {
        heading: '2. Ad Spend',
        text: 'Ad spend budgets transferred to platforms (Google, Meta, etc.) are non-refundable as they are governed by the respective platform\'s policies. Unused ad spend may be refunded as per platform terms.',
      },
      {
        heading: '3. Cancellation',
        text: 'Clients may cancel services with 30 days written notice. Fees for work completed during the notice period are non-refundable.',
      },
      {
        heading: '4. Disputes',
        text: 'For any billing disputes, contact us within 7 days of invoice at hello@adpilotmedia.com. We will review and resolve disputes within 14 business days.',
      },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    sections: [
      {
        heading: 'Results Disclaimer',
        text: 'Results mentioned on this website (ROAS, leads, revenue growth) are from actual client campaigns but are not guaranteed. Digital marketing results vary based on industry, budget, competition, and market conditions.',
      },
      {
        heading: 'Third-Party Platforms',
        text: 'AdPilot Media is an independent agency and is not officially affiliated with Meta, Google, or any other advertising platform unless explicitly stated. Platform policies are subject to change.',
      },
      {
        heading: 'Website Content',
        text: 'The content on this website is for informational purposes only. While we strive for accuracy, AdPilot Media makes no warranties about the completeness or reliability of this information.',
      },
    ],
  },
}

export default function LegalModal({ type, onClose }) {
  const data = content[type]
  if (!data) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-box"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{data.title}</h2>
            <button className="modal-close" onClick={onClose}><FiX size={22} /></button>
          </div>
          <div className="modal-body">
            <p className="modal-date">Last updated: January 2025 | AdPilot Media, Prayagraj, UP</p>
            {data.sections.map((s, i) => (
              <div key={i} className="modal-section">
                <h4>{s.heading}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
