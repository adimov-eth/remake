import { FC, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { initDataRaw } from '@/stores/telegram'
import { Avatar } from '@/components/Header/Avatar'
import { formatNumber } from '@/utils/formatters'
import ArrowIcon from '@/assets/arrow.svg?react'
import CloseIcon from '@/assets/close.svg?react'
import DoneIcon from '@/assets/done.svg?react'
import QuarkIcon from '@/assets/quark.svg?react'
import StarIcon from '@/assets/star.svg?react'
import styles from './mission-card.module.css'
import { useClaimMissionReward, useCheckMissionStatus } from '@/services/api/missions/model'
import { Mission } from '@/services/api/missions/types'
import { MissionCompleteStatus } from '@/stores/missions'

type MissionCardProps = Mission & {
  isInProgress: boolean
  isNotStarted: boolean
  isComplete: boolean
  isClaimedReward: boolean
  isOverdue: boolean
  isParticipatedOnce: boolean
  resolved_status: MissionCompleteStatus
}

export const MissionCard: FC<MissionCardProps> = (props) => {
  const {
    id,
    name,
    reward_quarks,
    reward_stars,
    // description,
    progress_status,
    // start_date,
    // end_date,
    icon_url,
    // requirements,
    isInProgress,
    isNotStarted,
    isComplete,
    isClaimedReward,
    isOverdue,
    isParticipatedOnce,
    // status,
    resolved_status
  } = props

  const queryClient = useQueryClient()
  const rawData = initDataRaw
 
  const claimRewardMutation = useClaimMissionReward({
    onError: (error) => {
      console.error('Error claiming mission reward:', error)
    },
  })

  const checkStatusMutation = useCheckMissionStatus({
    onSuccess: (updatedMission) => {
      queryClient.setQueryData(['missions', rawData], (oldData: Mission[] | undefined) => {
        if (!oldData) return [updatedMission]
        return oldData.map((mission) =>
          mission.id === updatedMission.id ? updatedMission : mission
        )
      })

    },
    onError: (error) => {
      console.error('Error checking mission status:', error)
    },
  })

  const handleOverlayClick = useCallback(() => {
    // if (isComplete) {
    //   claimRewardMutation.mutate({ missionId: id, rawData })
    //   $missions.set($missions.get().map(mission =>
    //     mission.id === id ? { ...mission, progress_status: MissionProgressStatus.CLAIMED_REWARD } : mission
    //   ))
    // } else if (isNotStarted) {
    //   checkStatusMutation.mutate({ missionId: id, rawData })
    // } 
  }, [isComplete, isNotStarted, id, rawData, claimRewardMutation, checkStatusMutation])

  const getIcon = () => {
    if (isOverdue || isParticipatedOnce) return <CloseIcon className={styles.close} />
    if (isClaimedReward) return <DoneIcon />
    if (isInProgress) return <ArrowIcon />
    return null
  }

  // TODO check reward display

  


  return (
    <>
      <Card
        in_progress={resolved_status === 'in_progress'}
        disabled={resolved_status === 'unavailable'}
        onClick={handleOverlayClick}
      >
        <Info>
          <Avatar
            src={icon_url || ''}
            size={40}
          />
          <Texts>
            <Title>{name}</Title>
            <Cost>
                <Currency>
                  {reward_quarks ? <QuarkIcon /> : <StarIcon />}
                  <Value>{formatNumber(reward_quarks || reward_stars)}</Value>
                </Currency>
            </Cost>
          </Texts>
        </Info>
        {progress_status === 'complete' ? (
          <CompleteRight>Complete</CompleteRight>
        ) : (
          <Open>{getIcon()}</Open>
        )}
      </Card>

    </>
  )
}


import { styled, keyframes } from '@/core/styles/stitches.config';

const shineAnimation = keyframes({
  '0%': { left: '-100%', transitionProperty: 'left' },
  '12%, 100%': { left: '100%', transitionProperty: 'left' },
});

export const Card = styled('div', {
  position: 'relative',
  background: '$cardBackground',
  borderRadius: '$small',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$5',
  padding: '$4',

  variants: {
    in_progress: {
      true: {
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animation: `${shineAnimation} 4s ease-in-out infinite`,
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },
});

export const Info = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
});

export const Texts = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const Title = styled('div', {
  fontFamily: '$proDisplay',
  fontSize: '$large',
  fontWeight: '$semiBold',
  color: '$white',
});

export const Cost = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

export const Currency = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

export const Value = styled('div', {
  fontFamily: '$mono',
  fontSize: '$medium',
  fontWeight: '$semiBold',
  color: '$white',
});

export const Open = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '$medium',
  background: '$navBackground',
});

export const CompleteRight = styled('div', {
  background: '$navBackground',
  boxShadow: '0px 0px 17px 0px $colors$swapGradientEnd',
  padding: '14px',
  fontFamily: '$proDisplay',
  fontSize: '$small',
  fontWeight: '$medium',
  borderRadius: '$medium',
  color: '$white',
});

export const leCloseIcon = styled('svg', {
  '& path': {
    fill: '$red',
  },
});