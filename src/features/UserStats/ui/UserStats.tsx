import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { ValueTooltip } from '@shared/ui/ValueTooltip';
import { initDataRaw } from '@app/stores/telegram';
import { $gameState } from '@app/stores/state';
import { $completedMissionsCount, $missions } from '@app/stores/missions';

import { Link } from '@/shared/ui/Link/ui/Link';

import { useAllMissions } from '@shared/services/api/missions/model';
import { formatNumber } from '@shared/utils/formatters';

import QuarkIcon from '@shared/assets/quark.svg?react';
import StarIcon from '@shared/assets/star-gradient.svg?react';
import UserIcon from '@shared/assets/user.svg?react';

import * as S from './UserStats.styles';

export const UserStats = () => {
  const { t } = useTranslation('global');

  const clickerState = $gameState.get();

  console.log('clickerState', clickerState);

  if (!initDataRaw) return null;
  const { data: fetchedMissions = [], isLoading } = useAllMissions(initDataRaw);

  useEffect(() => {
    if (fetchedMissions.length > 0) {
      $missions.set(fetchedMissions);
    }
  }, [fetchedMissions]);

  const actualMissions = useStore($completedMissionsCount);

  const quarks = useStore(clickerState.quarks);
  const stars = useStore(clickerState.stars);

  if (isLoading) return null;

  return (
    <S.Root>
      <S.Card id="quarks">
        <S.CardIcon as={QuarkIcon} />
        <S.CardValue>{formatNumber(quarks)}</S.CardValue>
        <S.CardTitle>{t('quarks')}</S.CardTitle>
      </S.Card>
      <S.Card id="stars">
        <S.CardIcon as={StarIcon} />
        <S.CardValue>{formatNumber(stars)}</S.CardValue>
        <S.CardTitle>{t('stars')}</S.CardTitle>
      </S.Card>
      <S.Card>
        <S.CardIcon as={UserIcon} />
        <S.CardValue>{actualMissions || 0}</S.CardValue>
        <S.CardTitle>{t('missions')}</S.CardTitle>
        <S.CardLink as={Link} to="/missions" />
      </S.Card>
      <ValueTooltip value={quarks} type="quarks" />
      <ValueTooltip value={stars} type="stars" />
    </S.Root>
  );
};
