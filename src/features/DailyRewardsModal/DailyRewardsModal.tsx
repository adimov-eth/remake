import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

import { initDataRaw } from '@app/stores/telegram';
import useClickNotification from '@shared/hooks/useClickNotification';

import { useClaimMissionReward, useGetDailyRewards } from '@shared/services/api/missions/model';
import { MissionProgressStatus } from '@shared/services/api/missions/types';

import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import { Modal } from '@shared/ui/Modal';
import { AchievementNotification, ErrorNotification } from '@shared/ui/Notification';
import { RewardCard } from '@features/RewardCard';

import * as S from './DailyRewardsModal.styles';

export const DailyRewardsModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { notifyUser } = useClickNotification('');
  const rawData = initDataRaw || '';
  const queryClient = useQueryClient();
  const { t } = useTranslation('global');

  const { data: rewards, isLoading } = useGetDailyRewards({
    enabled: !!rawData,
    variables: { rawData },
  });

  const { mutateAsync: claimReward, isPending: claimRewardLoading } = useClaimMissionReward({
    onSuccess: () => {
      AchievementNotification(t('claimed_successfully'));
      setRewardIsClaimed(true);
      queryClient.invalidateQueries({ queryKey: ['get/dailyRewards'] });
    },
    onError: error => {
      ErrorNotification(t('something_went_wrong'));
      console.error('Error claim reward:', error);
    },
  });

  const sortedRewards = useMemo(() => rewards?.sort((a, b) => a.day - b.day), [rewards]);

  const currentCompleteReward = useMemo(
    () => rewards?.find(rew => rew.progress_status === MissionProgressStatus.COMPLETE),
    [rewards]
  );

  const [rewardIsClaimed, setRewardIsClaimed] = useState(true);

  useEffect(() => {
    setRewardIsClaimed(!currentCompleteReward);
  }, [currentCompleteReward]);

  const handleCollectReward = useCallback(async () => {
    notifyUser();
    if (currentCompleteReward && rawData) {
      await claimReward({
        missionId: currentCompleteReward.id,
        rawData,
      });
      onClose();
    }
  }, [currentCompleteReward, rawData, claimReward, notifyUser, onClose]);

  const getButtonText = () => {
    switch (true) {
    case claimRewardLoading:
      return t('loading');
    case !currentCompleteReward || rewardIsClaimed:
      return t('get_award_tomorrow');
    default:
      return t('collect');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <S.Root>
        <S.Title>{t('daily_rewards')}</S.Title>
        <S.Description>{t('daily_rewards_description')}</S.Description>
        {isLoading ? (
          <>
            <Loader speed="slow" />
            <S.Title>{t('receiving_daily_rewards')}</S.Title>
          </>
        ) : (
          <>
            <S.List>
              {sortedRewards?.map((reward, i) => (
                <S.ListItem key={i}>
                  <RewardCard {...reward} day={i + 1} special={i === sortedRewards.length - 1}/>
                </S.ListItem>
              ))}
            </S.List>
            <S.BottomArea>
              <Button
                disabled={!currentCompleteReward || rewardIsClaimed || claimRewardLoading || !rawData}
                variant="primary"
                onClick={handleCollectReward}
              >
                {getButtonText()}
              </Button>
            </S.BottomArea>
          </>
        )}
      </S.Root>
    </Modal>
  );
};
