import React from 'react'
import { styled } from '@stitches/react'
import { Link } from "@/components/Link"
// import { openOnboarding } from '@/store/onboarding'
import InfoIcon from '@/assets/info.svg?react'
import SettingsIcon from "@/assets/settings.svg?react"

const ButtonsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

const ButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '16px',
  backgroundColor: '#1C1F30',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  cursor: 'pointer',
})

const Icon = styled('svg', {
  width: '24px',
  height: '24px',
  '& path': {
    fill: '#fff',
  },
})

export const SettingsButtons: React.FC = () => (
  <ButtonsContainer>
    <ButtonWrapper > 
        {/* onClick={openOnboarding}> */}
      <Icon as={InfoIcon} />
    </ButtonWrapper>
    <Link to="/settings">
      <ButtonWrapper>
        <Icon as={SettingsIcon} />
      </ButtonWrapper>
    </Link>
  </ButtonsContainer>
)