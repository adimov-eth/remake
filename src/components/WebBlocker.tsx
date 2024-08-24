import React from 'react'
import AppQR from '@/assets/qr/app.svg'
import './WebBlocker.css'



const WebBlocker: React.FC = () => {
  const text = 'Please play on your mobile telegram App'
  const tgUsername = 'TONStarsDAObot'
  const tgLinkPostfix = '/app'
  const tgLink = `https://t.me/${tgUsername}${tgLinkPostfix}`
  const QRCode = AppQR

  return (
    <div className="web-blocker">
      <div className="web-blocker-text">{text}</div>
      <a href={tgLink} className="qr-code-link">
        <div className="qr-code">
          <img src={QRCode} alt="QR Code" />
        </div>
      </a>
      <a href={tgLink} className="web-blocker-text">
        @{tgUsername}
      </a>
    </div>
  )
}

export default WebBlocker