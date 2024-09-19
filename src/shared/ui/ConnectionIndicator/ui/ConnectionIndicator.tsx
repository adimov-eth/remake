import React from 'react'
import { useTranslation } from 'react-i18next'
import { ConnectionStatus } from '@/shared/types/connectionStatus'

interface Props {
  status: ConnectionStatus
}

export const ConnectionIndicator: React.FC<Props> = ({ status }) => {
  console.log('ConnectionIndicator: Rendering with status', status)

  if (status === 'online') return null

  const { t } = useTranslation('global');

  return (
    <div className={`connection-indicator ${status}`}>
      {status === 'offline' && t('offline_mode')}
      {status === 'connecting' && t('connecting')}
      {status === 'reconnecting' && t('reconnecting')}
    </div>
  )
}