import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { ValueTooltip } from '@/components/Header/ValueTooltip'
import { initDataRaw } from '@/stores/telegram'
import { $gameState } from '@/stores/state'

import { $completedMissionsCount, $missions } from '@/stores/missions'

import { Link } from '@/components/Link'
import { useAllMissions } from '@/services/api/missions/model'
import { formatNumber } from '@/utils/formatters'

import QuarkIcon from '@/assets/quark.svg?react'
import StarIcon from '@/assets/star.svg?react'
import UserIcon from '@/assets/user.svg?react'

import styles from './user-values.module.css'

export const UserValues = () => {
  const clickerState = $gameState.get()

  if (!initDataRaw) return null
  const { data: fetchedMissions = [], isLoading } = useAllMissions(initDataRaw)

  useEffect(() => {
    if (fetchedMissions.length > 0) {
      $missions.set(fetchedMissions)
    }
  }, [fetchedMissions])


  const actualMissions = useStore($completedMissionsCount)

  const quarks = useStore(clickerState.quarks)
  const stars = useStore(clickerState.stars)
  
  if (isLoading) return null
  return (
    <div className={styles.root}>
      <a className={styles.card} id="quarks">
        <div className={styles.icon}>
          <QuarkIcon />
        </div>
        <div className={styles.value}>{formatNumber(quarks)}</div>
        <div className={styles.title}>Quarks</div>
      </a>
      <a className={styles.card} id="stars">
        <div className={styles.icon}>
          <StarIcon />
        </div>
        <div className={styles.value}>{formatNumber(stars)}</div>
        <div className={styles.title}>Stars</div>
      </a>
      <Link to="/missions" className={styles.card}>
        <div className={styles.icon}>
          <UserIcon />
        </div>
        <div className={styles.value}>{actualMissions || 0}</div>
        <div className={styles.title}>Missions</div>
      </Link>
      <ValueTooltip value={quarks} type="quarks" />
      <ValueTooltip value={stars} type="stars" />
    </div>
  )
}
