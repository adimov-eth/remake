import React from 'react'
import { Zoom, toast } from 'react-toastify'
import { CloseIcon as ErrorIcon, DoneIcon as SuccessIcon, InfoIcon, StarIcon } from '@/assets/icons'
import { styled, keyframes } from '@/core/stitches.config'

// Keyframe animations using Stitches
const slideIn = keyframes({
  '0%': { maxWidth: 0, opacity: 0 },
  '100%': { maxWidth: '300px', opacity: 1 },
})

const slideOut = keyframes({
  '0%': { maxWidth: '300px', opacity: 1 },
  '100%': { maxWidth: 0, opacity: 0 },
})

// Define the styles using Stitches
const NotificationWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px',
  overflow: 'hidden',
})

const IconContainer = styled('div', {
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > svg': {
    width: '18px',
    height: '18px',
    '& path': {
      fill: 'white',
    },  
  }
})

const MessageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  maxWidth: 0,
  opacity: 0,
  animation: `${slideIn} 0.5s ease-out forwards, ${slideOut} 0.5s ease-in 2.5s forwards`,
  whiteSpace: 'nowrap',
})

const Message = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '12px',
  fontWeight: 400,
  color: 'white',
  padding: '0 16px 0 10px',
})

// Create variants for different notification types
const notificationVariants = {
  achievement: {
    background: '#836eff',
    [`& ${IconContainer}`]: {
      background: '#5853f9',
    },
  },
  info: {
    background: '#6ab3f3',
    [`& ${IconContainer}`]: {
      background: '#418fcc',
    },
  },
  error: {
    background: '#971313',
    [`& ${IconContainer}`]: {
      background: '#B53A3A',
    },
  },
  success: {
    background: '#2B7409',
    [`& ${IconContainer}`]: {
      background: '#538B39',
    },
  },
}

// Update the Notification component to use the new styled components
type NotificationProps = {
  message: string
  type?: keyof typeof notificationVariants
  icon?: React.FC
}



export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  icon
}) => {

  return (
    <NotificationWrapper css={notificationVariants[type ?? 'info']}>
      <IconContainer>{icon && React.createElement(icon)}</IconContainer>
      <MessageContainer>
        <Message>{message}</Message>
      </MessageContainer>
    </NotificationWrapper>
  )
}

// Helper function to create toast notifications
const createNotification = (message: string, type: NotificationProps['type'], icon: React.FC) =>{
    return () => toast(<Notification message={message} type={type} icon={icon} />, {
        position: 'top-center',
        hideProgressBar: true,
        icon: false,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        autoClose: 5000,
        transition: Zoom,
        bodyClassName: 'notification-body',
        className: 'notification-body',
      })    
}


export const AchievementNotification = (message: string) => createNotification(message, 'achievement', StarIcon )
export const InformationNotification = (message: string) => createNotification(message, 'info', InfoIcon )
export const ErrorNotification = (message: string) => createNotification(message, 'error', ErrorIcon )
export const SuccessNotification = (message: string) => createNotification(message, 'success', SuccessIcon )

//TODO check

// Global styles for the notification body
// const globalStyles = globalCss({
//   '.notification-body': {
//     borderRadius: '20px',
//     zIndex: 1001
//   },
// })

// Apply global styles
// globalStyles()