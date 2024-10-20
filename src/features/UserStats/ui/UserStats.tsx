import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { Tooltip } from '@shared/ui/Tooltip';
import { initDataRaw } from '@app/stores/telegram';
import { $gameState } from '@app/stores/state';
import { $completedMissionsCount, $missions } from '@app/stores/missions';
import { formatNumberGroup } from '@shared/utils/formatters';

import { Link } from '@/shared/ui/Link/ui/Link';

import { useAllMissions } from '@shared/services/api/missions/model';
import { formatNumber } from '@shared/utils/formatters';

import { quarkPng, starPng, user } from '@shared/assets';

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
        <S.CardIcon src={quarkPng} width={40} height={40}/>
        <S.CardValue>{formatNumber(quarks)}</S.CardValue>
        <S.CardTitle>{t('quarks')}</S.CardTitle>
      </S.Card>
      <S.Card id="stars">
        <S.CardIcon src={starPng} width={40} height={40} />
        <S.CardValue>{formatNumber(stars)}</S.CardValue>
        <S.CardTitle>{t('stars')}</S.CardTitle>
      </S.Card>
      <S.Card>
        <S.CardIcon src={user} width={40} height={40} />
        <S.CardValue>{actualMissions || 0}</S.CardValue>
        <S.CardTitle>{t('missions')}</S.CardTitle>
        <S.CardLink as={Link} to="/missions" />
      </S.Card>
      <Tooltip anchorId="quarks">{formatNumberGroup(Number(quarks))}</Tooltip>
      <Tooltip anchorId="stars">{Number(stars).toFixed(2)}</Tooltip>
    </S.Root>
  );
};
