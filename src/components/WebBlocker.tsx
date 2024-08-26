import React from 'react'
import { styled } from '@stitches/react'
import AppQR from '@/assets/qr/app.svg'

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
})

const Text = styled('div', {
  margin: '20px 0',
  fontSize: '18px',
  color: '#333',
})

const QRCodeLink = styled('a', {
  textDecoration: 'none',
})

const QRCode = styled('div', {
  width: '200px',
  height: '200px',
})

const WebBlocker: React.FC = () => {
  const text = 'Please play on your mobile telegram App'
  const tgUsername = 'TONStarsDAObot'
  const tgLinkPostfix = '/app'
  const tgLink = `https://t.me/${tgUsername}${tgLinkPostfix}`

  return (
    <Container>
      <Text>{text}</Text>
      <QRCodeLink href={tgLink}>
        <QRCode>
          <img src={AppQR} alt="QR Code" />
        </QRCode>
      </QRCodeLink>
      <Text as="a" href={tgLink}>
        @{tgUsername}
      </Text>
    </Container>
  )
}

export default WebBlocker