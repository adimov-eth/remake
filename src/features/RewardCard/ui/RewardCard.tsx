import { useTranslation } from 'react-i18next';
import { DailyReward } from '@shared/services/api/missions/types';

import * as S from './RewardCard.styles';
import QuarkIcon from '@shared/assets/quark.svg?react';
import StarIcon from '@shared/assets/star-gradient.svg?react';

export const RewardCard = ({
  progress_status,
  reward_stars,
  day,
  reward_quarks,
}: DailyReward) => {
  const { t } = useTranslation('global');

  const formatter = new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  });

  const isQuark = Boolean(reward_quarks) && Boolean(!reward_stars);
  const iconSize = isQuark ? 'medium' : 'large';

  return (
    <S.Root type="button" progressStatus={progress_status as 'claimed_reward' | 'complete'}>
      <span>{t('day', { day })}</span>
      <S.Icon size={iconSize}>
        {isQuark ? <QuarkIcon /> : <StarIcon />}
      </S.Icon>
      <span>{formatter.format(reward_quarks)}</span>
    </S.Root>
  );
};
