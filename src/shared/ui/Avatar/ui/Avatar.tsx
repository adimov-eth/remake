import { FC, useState, useEffect, useCallback } from 'react'
import { calculateProgress, formatRemainingTime, isTimeUp } from '@shared/utils/missions'

import UserIcon from '@shared/assets/user.svg?react'
import * as S from './Avatar.styles'

interface IAvatarProps {
  src?: string
  size?: number
  alt?: string
  className?: string
  start_date?: string | null
  end_date?: string | null
}

export const Avatar: FC<IAvatarProps> = ({
  src,
  size = 40,
  alt = 'User Profile',
  className,
  start_date,
  end_date,
}) => {
  const [imgError, setImgError] = useState(false)
  const [progress, setProgress] = useState<number | undefined>(undefined)
  const [remainingTime, setRemainingTime] = useState<string | undefined>(undefined)
  const updateProgress = useCallback(() => {
    if (start_date && end_date) {
      const newProgress = calculateProgress(start_date, end_date)
      setProgress(newProgress)
      setRemainingTime(formatRemainingTime(end_date))
    }
  }, [start_date, end_date])

  useEffect(() => {
    updateProgress()
    if (start_date && end_date) {
      const interval = setInterval(updateProgress, 1000)
      return () => clearInterval(interval)
    }
  }, [start_date, end_date, updateProgress])

  const progressBarWidth = Math.max(2, Math.round(size * 0.05))

  const getProgressColor = (progress: number) => {
    const startColor = { r: 97, g: 87, b: 226 }
    const endColor = { r: 247, g: 10, b: 129 }
    const r = Math.round(startColor.r + ((endColor.r - startColor.r) * progress) / 100)
    const g = Math.round(startColor.g + ((endColor.g - startColor.g) * progress) / 100)
    const b = Math.round(startColor.b + ((endColor.b - startColor.b) * progress) / 100)
    return `rgb(${r}, ${g}, ${b})`
  }

  const renderAvatarContent = () => (
    <S.AvatarContainer css={{ minWidth: size, width: size, height: size }}>
      {src && !imgError ? (
        <S.ProfileImage
          src={src}
          alt={alt}
          css={{ minWidth: size, width: size, height: size }}
          onError={() => setImgError(true)}
        />
      ) : (
        <UserIcon
          style={{
            minWidth: size * 0.7,
            width: size * 0.7,
            height: size * 0.7,
          }}
        />
      )}
    </S.AvatarContainer>
  )

  const renderProgressBar = () => (
    <S.ProgressBar
      css={{
        background: `conic-gradient(transparent ${progress}%, ${getProgressColor(progress ?? 0)} ${progress}%)`,
        borderWidth: progressBarWidth,
      }}
    >
      <S.ProgressBarInner>{renderAvatarContent()}</S.ProgressBarInner>
    </S.ProgressBar>
  )

  return (
    <S.AvatarWrapper
      className={className}
      css={{
        minWidth: size + progressBarWidth * 2 + 2,
        width: size + progressBarWidth * 2 + 2,
        height: size + progressBarWidth * 2 + 2,
      }}
    >
      {end_date && !isTimeUp(end_date) ? (
        <>
          {progress !== undefined && renderProgressBar()}
          {remainingTime && (
            <S.TimeDisplay css={{ backgroundColor: getProgressColor(progress ?? 0) }}>
              {remainingTime}
            </S.TimeDisplay>
          )}
        </>
      ) : (
        renderAvatarContent()
      )}
    </S.AvatarWrapper>
  )
}