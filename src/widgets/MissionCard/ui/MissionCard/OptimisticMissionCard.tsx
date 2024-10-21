import { FC, useMemo } from 'react';
import { ResolvedMission, MissionProgressStatus } from '@app/stores/missions';

import { Card, CardVariant } from '@shared/ui/Card';
import { BalanceDisplay } from '@features/BalanceDisplay';
import { Avatar } from '@/shared/ui/Avatar';

import { CloseIcon, DoneIcon, StarsIcon } from '@shared/assets/icons';

import * as S from './MissionCard.styles';
import { MissionOptimisticValidation } from '@features/MissionOptimisticValidation';

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

// TODO remove

export const OptimisticMissionCard: FC<ResolvedMission> = (mission) => {
  const {
    id,
    name,
    slug,
    reward_quarks,
    reward_stars,
    description,
    progress_status,
    icon_url,
    start_date,
    end_date,
    resolved_status,
  } = mission;

  const missionValidationConfig = useMemo(() => ({
    validationTimeMs: 1500,
    missionTimeMs: 5000,
    missionsFetchStatus: []
  }), []);
  let url = 'https://t.me/tonstarsdao';
  if (slug === 'follow_x') {
    url = 'https://x.com/tonstarsdao';
  } else if (slug === 'follow_instagram') {
    url = 'https://instagram.com/tonstars.dao';
  }
  return (
    <>
      <MissionOptimisticValidation
        key={id}
        url={url}
        icon={<StarsIcon />}
        title={name}
        modalDescription={'You successfully subscribed!'}
        modalTitle={name}
        incompleteModalDescription="Failed to check your subscription. Please try again"
        mission={mission}
        modalConfirm={'Continue'}
        config={missionValidationConfig}
      >
        {(isLoading) => (
          <Card 
            variant={ResolvedStatusMap[resolved_status]}
            slotStart={<SlotStart {...{ icon_url, name, start_date, end_date }} />}
            slotEnd={<SlotEnd {...{ progress_status, reward_quarks, reward_stars, isLoading }} />}
            slotTitle={name}
            slotDescription={description}
            onClick={ () => console.log('Optimistic MissionCard clicked') }
          />
        )}
      </MissionOptimisticValidation>
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
  isLoading,
}: Pick<ResolvedMission, 'progress_status' | 'reward_quarks' | 'reward_stars'> & { isLoading: boolean }) => {
  const isShowQuarks = amountQuarks > 0;
  const isShowStars = amountStars > 0;

  if (isLoading) return (
    <S.LoaderText>
      Checking...
    </S.LoaderText>
  );
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
