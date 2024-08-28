import { ReactNode, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCopyToClipboard } from 'usehooks-ts'
import { Modal } from '@/components/Modal/Modal'
import { formatNumber } from '@/utils/formatters'
import QuarkIcon from '@/assets/quark.svg?react'
import StarIcon from '@/assets/star.svg?react'
import UserIcon from '@/assets/user.svg?react'
import {
  MissionProgressStatus,
  MissionRequirements,
  MissionStatus,
} from '@/services/api/missions/types'
import { useClickNotification, useShareRefferalLink } from '@/hooks'

import { styled } from '@/core/stitches.config';

interface MissionModalProps {
  open: boolean
  icon: ReactNode
  onClose: () => void
  title: string
  description: string
  onButtonClick: () => void
  status: MissionStatus.UNAVAILABLE | MissionProgressStatus
  reward_quarks: number
  reward_stars: number
  loading: boolean
  requirements: string
}

export const MissionModal = ({
  open,
  onClose,
  icon,
  title,
  description,
  onButtonClick,
  status,
  reward_quarks,
  reward_stars,
  loading,
  requirements,
}: MissionModalProps) => {
  const navigate = useNavigate()

  const { handleShare, buildShareUrl } = useShareRefferalLink()

  const { notifyUser } = useClickNotification('')
  const [, copy] = useCopyToClipboard()

  const refUrl = buildShareUrl() || ''

  const handleCopy = async (text: string) => {
    try {
      await copy(text)
      notifyUser()
      handleShare()
    } catch (error) {
      console.error('Failed to copy!', error)
    }
  }

  const getButtonText = useMemo(() => {
    switch (status) {
      case MissionProgressStatus.NOT_STARTED:
        return 'Start Mission'
      case MissionProgressStatus.IN_PROGRESS:
        return "Let's Go!"
      case MissionProgressStatus.COMPLETE:
        return 'Claim'
      default:
        return 'Claimed'
    }
  }, [status])

  const handleButtonClick = async () => {
    if (status === MissionProgressStatus.IN_PROGRESS) {
      try {
        const parsedRequirements: MissionRequirements = JSON.parse(requirements)

        for (const key of Object.keys(parsedRequirements)) {
          switch (key) {
            case 'referrals_count':
              await handleCopy(refUrl)
              break
            case 'quarks_count':
              navigate(`/`)
              break
            case 'level':
              navigate(`/`)
              break
            case 'clicks_count':
              navigate(`/`)
              break
            case 'quarks_spent_on_upgrades':
              navigate(`/accelerators`)
              break
            case 'join_before':
              navigate(`/profile`)
              break
            case 'daily_login':
              navigate(`/profile`)
              break
            default:
              console.log(`Unknown requirement: ${key}`)
          }
        }
      } catch (error) {
        console.error('Failed to parse requirements:', error)
      }
    } else {
      onButtonClick()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Icon>{icon || <UserIcon />}</Icon>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Reward>
          {Boolean(reward_quarks) && (
            <Currency>
              <QuarkIcon />
              <Value>{formatNumber(reward_quarks)}</Value>
            </Currency>
          )}
          {Boolean(reward_stars) && (
            <Currency>
              <StarIcon />
              <Value>{formatNumber(reward_stars)}</Value>
            </Currency>
          )}
        </Reward>
        <Button onClick={handleButtonClick} disabled={loading}>
          {loading ? 'Loading...' : getButtonText}
        </Button>
      </Content>
    </Modal>
  )
}


export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Icon = styled('div', {
  background: '#1C1F30',
  width: '112px',
  height: '112px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '16px',
  marginBottom: '40px',

  '& svg': {
    width: '70px',
    height: '70px',
  },
});

export const Title = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '28px',
  fontWeight: 600,
  textAlign: 'center',
  color: 'white',
  marginBottom: '30px',
});

export const Description = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '15px',
  lineHeight: '20px',
  textAlign: 'center',
  color: '#95A2C5',
  marginBottom: '40px',
});

export const Reward = styled('div', {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  marginBottom: '40px',
});

export const Currency = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  '& svg': {
    width: '40px',
    height: '40px',
  },
});

export const Value = styled('div', {
  fontFamily: 'var(--font-mono)',
  fontSize: '28px',
  color: 'white',
  fontWeight: 600,
});

export const Button = styled('button', {
  background: 'linear-gradient(88.72deg, #264DD0 0%, #5931AE 102.05%)',
  height: '54px',
  border: 'none',
  width: '100%',
  borderRadius: '14px',
  fontFamily: 'var(--font-pro-display)',
  fontSize: '14px',
  fontWeight: 600,
  color: 'white',

  '&:disabled': {
    opacity: 0.6,
  },
});