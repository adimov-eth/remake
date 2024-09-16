import React from 'react'
import { styled } from '@stitches/react'
import { formatNumber } from '@/shared/utils/formatters'
import QuarkIcon from '@shared/assets/quark.svg?react'
import StarIcon from '@shared/assets/star.svg?react'

const ValuesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

const BlockWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  width: 'max-content',
  height: '40px',
  padding: '8px',
  borderRadius: '16px',
  backgroundColor: '#1C1F30',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  color: 'white',
})

const Value = styled('div', {
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
  fontWeight: 600,
  paddingRight: '4px',
})

const Icon = styled('svg', {
  width: '24px',
  height: '24px',
})

interface ValueDisplayProps {
  quarks: number
  stars: number
  showQuarks: boolean
}

export const ValueDisplay: React.FC<ValueDisplayProps> = ({ quarks, stars, showQuarks }) => (
  <ValuesContainer>
    {showQuarks && (
      <BlockWrapper id="quarks">
        <Icon as={QuarkIcon} />
        <Value>{formatNumber(Math.round(quarks))}</Value>
      </BlockWrapper>
    )}
    <BlockWrapper id="stars">
      <Icon as={StarIcon} />
      <Value>{stars}</Value>
    </BlockWrapper>
  </ValuesContainer>
)