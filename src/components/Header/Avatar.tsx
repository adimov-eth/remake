import { FC, useState, useEffect, useCallback } from 'react'
import UserIcon from '@/assets/user.svg?react'
import {
  calculateProgress,
  formatRemainingTime,
  isTimeUp,
} from '@/features/missions/utils/utils.ts'

interface AvatarProps {
  src?: string
  size?: number
  alt?: string
  className?: string
  start_date?: string | null
  end_date?: string | null
}

export const Avatar: FC<AvatarProps> = ({
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
    <AvatarContainer css={{ minWidth: size, width: size, height: size }}>
      {src && !imgError ? (
        <ProfileImage
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
    </AvatarContainer>
  )

  const renderProgressBar = () => (
    <ProgressBar
      css={{
        background: `conic-gradient(transparent ${progress}%, ${getProgressColor(progress ?? 0)} ${progress}%)`,
        borderWidth: progressBarWidth,
      }}
    >
      <ProgressBarInner>{renderAvatarContent()}</ProgressBarInner>
    </ProgressBar>
  )

  return (
    <AvatarWrapper
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
            <TimeDisplay css={{ backgroundColor: getProgressColor(progress ?? 0) }}>
              {remainingTime}
            </TimeDisplay>
          )}
        </>
      ) : (
        renderAvatarContent()
      )}
    </AvatarWrapper>
  )
}


import { styled, keyframes } from '@/stitches.config';

const progressBarAnimation = keyframes({
  '0%': { background: 'conic-gradient($colors$progressStart 0%, $colors$progressStart 100%)' },
  '100%': { background: 'conic-gradient(transparent ${progress}%, ${color} ${progress}%)' },
});

export const AvatarWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
  position: 'relative',
});

export const AvatarContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: '$background',
  borderRadius: '40%',
  position: 'relative',
});

export const ProfileImage = styled('img', {
  objectFit: 'cover',
  borderRadius: '40%',
});

export const ProgressBar = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '40%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${progressBarAnimation} 2s ease-out forwards`,
});

export const ProgressBarInner = styled('div', {
  backgroundColor: 'transparent',
  borderRadius: '40%',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

export const TimeDisplay = styled('div', {
  position: 'absolute',
  bottom: '0px',
  right: '-6px',
  fontFamily: '$proDisplay',
  fontSize: '10px',
  fontWeight: 500,
  borderRadius: '3px',
  padding: '3px',
  color: 'white',
});