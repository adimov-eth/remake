import { useCallback, useEffect, useMemo, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import cn from 'classnames'

import { initDataRaw } from '@/stores/telegram'

import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import {
  AchievementNotification,
  ErrorNotification,
} from '@/components/Notification/Notification'

import useClickNotification from '@/hooks/useClickNotification'

import { RewardCard } from './components/RewardCard'
import styles from './day-rewards-modal.module.css'

import {
  useClaimMissionReward,
  useGetDailyRewards,
} from '@/services/api/missions/model'
import { MissionProgressStatus } from '@/services/api/missions/types'

export const DayRewardsModal = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const { notifyUser } = useClickNotification('')
  const rawData = initDataRaw || ''
  const queryClient = useQueryClient()

  const { data: rewards, isLoading } = useGetDailyRewards({
    enabled: !!rawData,
    variables: { rawData },
  })

  const { mutateAsync: claimReward, isPending: claimRewardLoading } =
    useClaimMissionReward({
      onSuccess: () => {
        AchievementNotification('Claimed successfully!')
        setRewardIsClaimed(true)
        queryClient.invalidateQueries({ queryKey: ['get/dailyRewards'] })
      },
      onError: (error) => {
        ErrorNotification('Something went wrong')
        console.error('Error claim reward:', error)
      },
    })

  const sortedRewards = useMemo(
    () => rewards?.sort((a, b) => a.day - b.day),
    [rewards]
  )

  const currentCompleteReward = useMemo(
    () =>
      rewards?.find(
        (rew) => rew.progress_status === MissionProgressStatus.COMPLETE
      ),
    [rewards]
  )

  const [rewardIsClaimed, setRewardIsClaimed] = useState(true)

  useEffect(() => {
    setRewardIsClaimed(!currentCompleteReward)
  }, [currentCompleteReward])

  const handleCollectReward = useCallback(async () => {
    notifyUser()
    if (currentCompleteReward && rawData) {
      await claimReward({
        missionId: currentCompleteReward.id,
        rawData,
      })
    }
  }, [currentCompleteReward, rawData, claimReward, notifyUser])

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.title}>Daily Reward</div>
      <div className={styles.description}>
        Collect coins for daily entry into the game without passes. The
        &ldquo;Collect&rdquo; button must be pressed daily, otherwise the day counter will
        start over.
      </div>
      {isLoading ? (
        <>
          <br />
          <br />
          <br />
          <Loader speed="slow" />
          <h1 className={cn(styles.title, styles.textCenter)}>
            Receiving Daily Rewards...
          </h1>
        </>
      ) : (
        <>
          <div className={styles.rewards}>
            {sortedRewards?.map((reward, i) => (
              <RewardCard key={i} {...reward} day={i + 1} />
            ))}
          </div>
          <Button
            disabled={
              !currentCompleteReward ||
              rewardIsClaimed ||
              claimRewardLoading ||
              !rawData
            }
            variant="gradientFilled"
            onClick={handleCollectReward}
          >
            {claimRewardLoading
              ? 'Loading...'
              : !currentCompleteReward || rewardIsClaimed
                ? 'Come get your award tomorrow'
                : 'Collect'}
          </Button>
        </>
      )}
    </Modal>
  )
}
