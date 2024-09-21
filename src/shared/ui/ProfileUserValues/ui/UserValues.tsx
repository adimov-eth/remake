import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { ValueTooltip } from '@shared/ui/ValueTooltip';
import { initDataRaw } from '@app/stores/telegram';
import { $gameState } from '@app/stores/state';
import { useTranslation } from 'react-i18next';

import { $completedMissionsCount, $missions } from '@app/stores/missions';

import { Link } from '@/shared/ui/Link/ui/Link';
import { useAllMissions } from '@shared/services/api/missions/model';
import { formatNumber } from '@shared/utils/formatters';

import QuarkIcon from '@shared/assets/quark.svg?react';
import StarIcon from '@shared/assets/star-gradient.svg?react';
import UserIcon from '@shared/assets/user.svg?react';

import styles from './user-values.module.css';

export const UserValues = () => {
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
    <div className={styles.root}>
      <a className={styles.card} id="quarks">
        <div className={styles.icon}>
          <QuarkIcon />
        </div>
        <div className={styles.value}>{formatNumber(quarks)}</div>
        <div className={styles.title}>{t('quarks')}</div>
      </a>
      <a className={styles.card} id="stars">
        <div className={styles.icon}>
          <StarIcon />
        </div>
        <div className={styles.value}>{formatNumber(stars)}</div>
        <div className={styles.title}>{t('stars')}</div>
      </a>
      <Link to="/missions" className={styles.card}>
        <div className={styles.icon}>
          <UserIcon />
        </div>
        <div className={styles.value}>{actualMissions || 0}</div>
        <div className={styles.title}>{t('missions')}</div>
      </Link>
      <ValueTooltip value={quarks} type="quarks" />
      <ValueTooltip value={stars} type="stars" />
    </div>
  );
};
