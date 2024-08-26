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
import { ResolvedMission } from '@/stores/missions'


type MissionCardProps = {
  mission: ResolvedMission
}

export const MissionCard: FC<MissionCardProps> = ({mission}) => {
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
    status,
    resolved_status
  } = mission

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
  }, [id, rawData, claimRewardMutation, checkStatusMutation])

  const getIcon = () => {
    switch (resolved_status) {
      case 'overdue':
        return <CloseIcon className={styles.close} />
      case 'claimed_reward':
        return <DoneIcon />
      case 'in_progress':
        return <ArrowIcon />
      default:
        return null
    }
  }

  // TODO check reward display
  console.log('Mission:', status, progress_status, )
  console.log('resolved_status', resolved_status)
  
  return (
    <>
      <Card
        status={resolved_status}
        onClick={handleOverlayClick}
      >
        <Info>
          <Avatar
            src={icon_url || ''}
            size={40}
          />
          <Texts>
            <Title>{name}</Title>
            <Reward>
                <Currency>
                  {reward_quarks ? <QuarkIcon /> : <StarIcon />}
                  <Value>{formatNumber(reward_quarks || reward_stars)}</Value>
                </Currency>
            </Reward>
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


import { styled, shineAnimation } from '@/core/stitches.config';


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
    status: {
      in_progress: {
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
      complete: {
        position: 'relative',
      },
      claimed_reward: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      overdue: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      available: {},
      unavailable: {},
      not_started: {},
      participated_once: {},
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

export const Reward = styled('div', {
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

export const junk = `

.open {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 27px;
  background: #1C1F30;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.completeRight {
  background: #1C1F30;
  box-shadow: 0px 0px 17px 0px #365AE5;
  padding: 14px;
  font-family: var(--font-pro-display);
  font-size: 12px;
  font-weight: 500;
  border-radius: 27px;
  color: white;
}

@keyframes shine {
  0% {
    left: -100%;
    transition-property: left;
  }
  12%,
  100% {
    left: 100%;
    transition-property: left;
  }
}

.inProgress {
  position: relative;
  overflow: hidden;
}

.inProgress::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
          120deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
  );
  animation: shine 4s ease-in-out infinite;
}

.complete {
}

.close {
  path {
    fill: red;
  }
}
`