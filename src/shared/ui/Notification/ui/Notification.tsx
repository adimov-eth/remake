import React from 'react'

import { Zoom, toast } from 'react-toastify'

import ErrorIcon from '@shared/assets/close.svg?react'
import SuccessIcon from '@shared/assets/done.svg?react'
import InfoIcon from '@shared/assets/info.svg?react'
import StarIcon from '@shared/assets/star.svg?react'

import * as S from './Notification.styles';
 
type NotificationProps = {
  message: string
  type?: 'achievement' | 'info' | 'error' | 'success'
}

const iconsMap = {
  achievement: StarIcon,
  info: InfoIcon,
  error: ErrorIcon,
  success: SuccessIcon,
  default: StarIcon,
}

export const Notification: React.FC<NotificationProps> = ({
  message = '',
  type = 'achievement',
}) => {
  const Icon = iconsMap[type] || iconsMap.default

  return (
    <S.Notification type={type}>
      <S.NotificationIcon>
        <Icon />
      </S.NotificationIcon>
      <S.NotificationMessage>
        <S.NotificationMessageText>
          {message}
        </S.NotificationMessageText>
      </S.NotificationMessage>
    </S.Notification>
  )
}

export const AchievementNotification = (message: string) =>
  toast(<Notification message={message} type="achievement" />, {
    position: 'top-center',
    hideProgressBar: true,
    icon: false,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 5000,
    transition: Zoom,
})

export const InformationNotification = (message: string) =>
  toast.info(<Notification message={message} type="info" />, {
    position: 'top-center',
    hideProgressBar: true,
    icon: false,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 5000,
    transition: Zoom,
})

export const ErrorNotification = (message: string) =>
  toast.error(<Notification message={message} type="error" />, {
    position: 'top-center',
    hideProgressBar: true,
    icon: false,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 5000,
    transition: Zoom,
})

export const SuccessNotification = (message: string) =>
  toast.success(<Notification message={message} type="success" />, {
    position: 'top-center',
    hideProgressBar: true,
    icon: false,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 5000,
    transition: Zoom,
})
