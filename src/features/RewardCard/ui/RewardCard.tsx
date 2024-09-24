import QuarkIcon from '@shared/assets/quark.svg?react'
import StarIcon from '@shared/assets/star-gradient.svg?react'

import { DailyReward } from '@shared/services/api/missions/types'

import * as S from './RewardCard.styles'

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
    <S.Root progressStatus={progress_status as "claimed_reward" | "complete"}>
      <S.Title>{day}</S.Title>
      <S.Icon>
        {Boolean(reward_quarks) && Boolean(!reward_stars) ? (
          <QuarkIcon />
        ) : (
          <StarIcon />
        )}
      </S.Icon>
      <S.Value>
        {Boolean(reward_stars) && (
          <S.BottomQuarkIcon>
            <QuarkIcon />
          </S.BottomQuarkIcon>
        )}
        {formatter.format(reward_quarks)}
      </S.Value>
    </S.Root>
  )
}
