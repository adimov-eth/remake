import cn from 'classnames'

import QuarkIcon from '@/assets/quark.svg?react'
import StarIcon from '@/assets/star.svg?react'

import styles from './reward-card.module.css'

import { DailyReward } from '@/api/missions/types.ts'

export const RewardCard = ({
  progress_status,
  reward_stars,
  day,
  reward_quarks,
}: DailyReward) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  })

  return (
    <div className={cn(styles.root, styles[progress_status])}>
      <div className={styles.title}>{day}</div>
      <div className={styles.icon}>
        {Boolean(reward_quarks) && Boolean(!reward_stars) ? (
          <QuarkIcon />
        ) : (
          <StarIcon />
        )}
      </div>
      <div className={styles.value}>
        {Boolean(reward_stars) && (
          <QuarkIcon className={styles.bottomQuarkIcon} />
        )}
        {formatter.format(reward_quarks)}
      </div>
    </div>
  )
}
