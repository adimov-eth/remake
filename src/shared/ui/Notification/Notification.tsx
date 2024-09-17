import React from 'react'

import { Zoom, toast } from 'react-toastify'

import ErrorIcon from '@shared/assets/close.svg?react'
import SuccessIcon from '@shared/assets/done.svg?react'
import InfoIcon from '@shared/assets/info.svg?react'
import StarIcon from '@shared/assets/star.svg?react'

import styles from './Notification.module.css'

type NotificationProps = {
  message: string
  type?: 'achievement' | 'info' | 'error' | 'success'
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'achievement',
}) => {
  let icon
  switch (type) {
    case 'achievement':
      icon = <StarIcon className={styles.icon} />
      break
    case 'info':
      icon = <InfoIcon className={styles.icon} />
      break
    case 'error':
      icon = <ErrorIcon className={styles.icon} />
      break
    case 'success':
      icon = <SuccessIcon className={styles.icon} />
      break
    default:
      icon = <StarIcon className={styles.icon} />
  }

  const notificationClass =
    type === 'achievement'
      ? styles.achievement
      : type === 'info'
        ? styles.info
        : type === 'error'
          ? styles.error
          : styles.success

  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.messageContainerWithAnimation}>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
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
    bodyClassName: styles.body,
    className: styles.body,
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
    bodyClassName: styles.body,
    className: styles.body,
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
    bodyClassName: styles.body,
    className: styles.body,
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
    bodyClassName: styles.body,
    className: styles.body,
  })
