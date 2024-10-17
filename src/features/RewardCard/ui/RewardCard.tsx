import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DailyReward } from '@shared/services/api/missions/types';

import * as S from './RewardCard.styles';
import { quarkPng, starPng } from '@shared/assets';

interface IRewardCard extends DailyReward {
  special?: boolean;
}

export const RewardCard: FC<IRewardCard> = ({
  progress_status,
  reward_stars,
  day,
  reward_quarks,
  special = false,
}) => {
  const { t } = useTranslation('global');

  const formatter = new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  });

  const isDisabled = progress_status === 'claimed_reward';
  const isQuark = Boolean(reward_quarks) && Boolean(!reward_stars);
  const iconSize = isQuark ? 'medium' : 'large';
  const isComplete = progress_status === 'complete';

  return (
    <S.Root 
      type="button" 
      complete={isComplete} 
      special={special}
      disabled={isDisabled}
    >
      <S.Content>
        <span>{t('day', { day })}</span>
        <S.Icon 
          size={iconSize}
          src={isQuark ? quarkPng : starPng} 
          width={24}
          height={24}
        />
        <S.Value>
          {isQuark ? formatter.format(reward_quarks) : t('star')}
        </S.Value>
      </S.Content>
    </S.Root>
  );
};
