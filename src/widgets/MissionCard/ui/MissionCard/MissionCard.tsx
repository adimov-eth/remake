import { FC, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { initDataRaw } from '@app/stores/telegram';
import { useClaimMissionReward, useCheckMissionStatus } from '@shared/services/api/missions/model';
import { Mission } from '@shared/services/api/missions/types';
import { ResolvedMission, MissionProgressStatus } from '@app/stores/missions';
import { useClickNotification } from '@shared/hooks';

import { Card, CardVariant } from '@shared/ui/Card';
import { BalanceDisplay } from '@features/BalanceDisplay';
import { Avatar } from '@/shared/ui/Avatar';
import { MissionModal } from '../MissionModal/MissionModal';
import { AchievementNotification, InformationNotification } from '@shared/ui/Notification';

import { CloseIcon, DoneIcon } from '@shared/assets/icons';

import * as S from './MissionCard.styles';

const ResolvedStatusMap: Record<MissionProgressStatus | 'overdue', CardVariant> = {
  [MissionProgressStatus.IN_PROGRESS]: 'active',
  [MissionProgressStatus.CLAIMED_REWARD]: 'disabled',
  [MissionProgressStatus.PARTICIPATED_ONCE]: 'disabled',
  [MissionProgressStatus.COMPLETE]: 'default',
  [MissionProgressStatus.NOT_STARTED]: 'default',
  [MissionProgressStatus.AVAILABLE]: 'default',
  [MissionProgressStatus.UNAVAILABLE]: 'disabled',
  overdue: 'disabled',
};


export const MissionCard: FC<ResolvedMission> = ({
  id,
  name,
  reward_quarks,
  reward_stars,
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
    onError: error => console.error('Error claiming mission reward:', error),
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

  return (
    <>
      <Card 
        variant={ResolvedStatusMap[resolved_status]}
        slotStart={<SlotStart {...{ icon_url, name, start_date, end_date }} />}
        slotEnd={<SlotEnd {...{ progress_status, reward_quarks, reward_stars }} />}
        slotTitle={name}
        slotDescription={description}
        onClick={handleOverlayClick}
      />
      <MissionModal
        open={modalOpen}
        icon={icon_url}
        onClose={() => setModalOpen(false)}
        title={name}
        description={description}
        amountQuarks={reward_quarks}
        amountStars={reward_stars}
        onButtonClick={handleOverlayClick}
        status={progress_status}
        loading={claimRewardMutation.isPending || checkStatusMutation.isPending}
        requirements={requirements}
      />
    </>
  );
};

const SlotStart = ({
  icon_url,
  start_date,
  end_date,
}: Pick<ResolvedMission, 'icon_url' | 'name' | 'start_date' | 'end_date'>) => {
  return (
    <Avatar 
      src={icon_url} 
      size={40} 
      start_date={start_date} 
      end_date={end_date} 
    />
  );
};

const SlotEnd = ({ 
  progress_status, 
  reward_quarks: amountQuarks,
  reward_stars: amountStars,
}: Pick<ResolvedMission, 'progress_status' | 'reward_quarks' | 'reward_stars'>) => {
  const isShowQuarks = amountQuarks > 0;
  const isShowStars = amountStars > 0;

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
    return <S.StatusIcon as={DoneIcon} variant="success" />;
  case progress_status === MissionProgressStatus.PARTICIPATED_ONCE:
    return <S.StatusIcon as={CloseIcon} variant="danger" />;
  default:
    return null;
  }
};
