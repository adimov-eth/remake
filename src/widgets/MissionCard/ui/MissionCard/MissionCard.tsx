import { FC, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { initDataRaw } from '@app/stores/telegram';
import { useClaimMissionReward, useCheckMissionStatus } from '@shared/services/api/missions/model';
import { Mission } from '@shared/services/api/missions/types';
import { ResolvedMission, MissionProgressStatus } from '@app/stores/missions';
import { useClickNotification } from '@shared/hooks';

import { BalanceDisplay } from '@features/BalanceDisplay';
import { Avatar } from '@/shared/ui/Avatar';
import { MissionModal } from '../MissionModal/MissionModal';
import { AchievementNotification, InformationNotification } from '@shared/ui/Notification';

import { CloseIcon, DoneIcon } from '@shared/assets/icons';

import * as S from './MissionCard.styles';


export const MissionCard: FC<ResolvedMission> = ({
  id,
  name,
  reward_quarks: amountQuarks,
  reward_stars: amountStars,
  description,
  progress_status,
  icon_url,
  start_date,
  end_date,
  requirements,
  resolved_status,
}) => {
  const { t } = useTranslation('global');
  const { notifyUser } = useClickNotification('');
  const queryClient = useQueryClient();
  const rawData = initDataRaw || '';

  const [modalOpen, setModalOpen] = useState(false);

  const claimRewardMutation = useClaimMissionReward({
    onError: error => {
      console.error('Error claiming mission reward:', error);
    },
  });

  const checkStatusMutation = useCheckMissionStatus({
    onSuccess: updatedMission => {
      queryClient.setQueryData(['missions', rawData], (oldData: Mission[] | undefined) => {
        if (!oldData) return [updatedMission];
        return oldData.map(mission =>
          mission.id === updatedMission.id ? updatedMission : mission
        );
      });
      InformationNotification(t('mission_started'));
      setModalOpen(false);
    },
    onError: error => {
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
    case 'participated_once':
      console.warn(' MISSION participated_once'); //TODO показать информацию о том, что миссия одноразовая и уже была начата 
      break;
    default:
      setModalOpen(true);
    }
  }, [resolved_status, id, rawData, notifyUser]);

  const handleCompleteMission = () => {
    claimRewardMutation.mutate({ missionId: id, rawData });
    updateMissionStatus();
    AchievementNotification(t('reward_claimed'));
    setModalOpen(false);
  };

  const updateMissionStatus = useCallback(() => {
    queryClient.setQueryData<Mission[]>(['missions', rawData], oldData => {
      if (!oldData) return oldData;
      return oldData.map(mission =>
        mission.id === id
          ? { ...mission, progress_status: 'claimed_reward' as MissionProgressStatus }
          : mission
      );
    });
  }, [queryClient, rawData, id]);

  const isShowQuarks = amountQuarks > 0;
  const isShowStars = amountStars > 0;

  const renderStatus = () => {
    switch (true) {
    case progress_status === MissionProgressStatus.IN_PROGRESS:
      return <BalanceDisplay
        variant="ghost"
        size="small"
        quarks={amountQuarks}
        stars={amountStars}
        showQuarks={isShowQuarks}
        showStars={isShowStars}
      />;
    case progress_status === MissionProgressStatus.COMPLETE:
      return <BalanceDisplay
        variant="primary"
        size="small"
        quarks={amountQuarks}
        stars={amountStars}
        showQuarks={isShowQuarks}
        showStars={isShowStars}
      />;
    case progress_status === MissionProgressStatus.CLAIMED_REWARD:
      return <S.StatusIcon as={DoneIcon} />;
    case progress_status === MissionProgressStatus.PARTICIPATED_ONCE:
      return <S.StatusIcon as={CloseIcon} />;
    default:
      return null;
    }
  };

  return (
    <>
      <S.Card status={resolved_status} onClick={handleOverlayClick}>
        <S.Info>
          <Avatar 
            src={icon_url || ''} 
            size={48} 
            alt={name} 
            start_date={start_date} 
            end_date={end_date} 
          />
          <S.Content>
            <S.Title>{name}</S.Title>
            <S.Description>{description}</S.Description>
          </S.Content>
        </S.Info>
        {renderStatus()}
      </S.Card>
      <MissionModal
        open={modalOpen}
        icon={icon_url}
        onClose={() => setModalOpen(false)}
        title={name}
        description={description}
        amountQuarks={amountQuarks}
        amountStars={amountStars}
        onButtonClick={handleOverlayClick}
        status={progress_status}
        loading={claimRewardMutation.isPending || checkStatusMutation.isPending}
        requirements={requirements}
      />
    </>
  );
};