import { FC, useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { initDataRaw } from '@/stores/telegram'
import { Avatar } from '@/components/Avatar'
import { formatNumber } from '@/utils/formatters'

import {ArrowIcon, CloseIcon as CloseIconSVG, DoneIcon, QuarkIcon, StarIcon  } from '@/assets/icons'



import { useClaimMissionReward, useCheckMissionStatus } from '@/services/api/missions/model'
import { Mission } from '@/services/api/missions/types'
import { ResolvedMission, 
  MissionProgressStatus 
} from '@/stores/missions'
import { useClickNotification } from '@/hooks'

import { MissionModal } from '@/components/Missions/MissionModal'

import {
  AchievementNotification,
  InformationNotification,
} from '@/components/Notification/Notification'

type MissionCardProps = {
  mission: ResolvedMission
}

export const MissionCard: FC<MissionCardProps> = ({mission}) => {
  const {
    id,
    name,
    reward_quarks,
    reward_stars,
    description,
    progress_status,
    icon_url,
    requirements,
    resolved_status
  } = mission

  const { notifyUser } = useClickNotification('')
  const queryClient = useQueryClient()
  const rawData = initDataRaw || ''


  const [modalOpen, setModalOpen] = useState(false)

 
  const claimRewardMutation = useClaimMissionReward({
    onError: (error) => {
      console.error('Error claiming mission reward:', error)
    },
  })

  const checkStatusMutation = useCheckMissionStatus({
    onSuccess: (updatedMission) => {
      queryClient.setQueryData(['missions', rawData], (oldData: Mission[] | undefined) => {
        if (!oldData) return [updatedMission];
        return oldData.map((mission) => 
          mission.id === updatedMission.id ? updatedMission : mission
        );
      });
      InformationNotification('Mission started')
      setModalOpen(false)
    },
    onError: (error) => {
      console.error('Error checking mission status:', error);
    },
  });

  const handleOverlayClick = useCallback(() => {
    notifyUser();
    switch (resolved_status) {
      case 'complete':
        handleCompleteMission(); 
        break;
      case 'not_started':
        checkStatusMutation.mutate({ missionId: id, rawData });
        break;
      default:
        setModalOpen(true);
    }
  }, [resolved_status, id, rawData, notifyUser]);

  const handleCompleteMission = () => {
    claimRewardMutation.mutate({ missionId: id, rawData });
    updateMissionStatus();
    AchievementNotification('Reward claimed successfully!');
    setModalOpen(false);
  };

  const updateMissionStatus = useCallback(() => {
    queryClient.setQueryData<Mission[]>(
      ['missions', rawData],
      (oldData) => {
        if (!oldData) return oldData;
        return oldData
        .map((mission) =>
          mission.id === id
            ? { ...mission, progress_status: 'claimed' as MissionProgressStatus }
            : mission
        );
      }
    );
  }, [queryClient, rawData, id]);

  const getIcon = () => {
    switch (resolved_status) {
      case 'overdue': return <CloseIcon/>
      case 'claimed_reward': return <DoneIcon />
      case 'in_progress': return <ArrowIcon />
      default:
        return null
    }
  }
  return (
    <>
      <Card
        status={ resolved_status }
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
      <MissionModal
          open={modalOpen}
          icon={icon_url}
          onClose={() => {
            setModalOpen(false)
          }}
          title={name}
          description={description}
          reward_quarks={reward_quarks}
          reward_stars={reward_stars}
          onButtonClick={handleOverlayClick}
          status={progress_status}
          loading={
            claimRewardMutation.isPending || checkStatusMutation.isPending
          }
          requirements={requirements}
        />
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

export const CloseIcon = styled(CloseIconSVG, {
  '& path': {
    fill: '$red',
  },
});
