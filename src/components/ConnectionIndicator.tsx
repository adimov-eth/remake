import React from 'react'
import { ConnectionStatus } from '@/types/connectionStatus'

interface Props {
  status: ConnectionStatus
}

export const ConnectionIndicator: React.FC<Props> = ({ status }) => {
  console.log('ConnectionIndicator: Rendering with status', status)

  if (status === 'online') return null

  return (
    <div className={`connection-indicator ${status}`}>
      {status === 'offline' && 'Offline Mode'}
      {status === 'connecting' && 'Connecting...'}
      {status === 'reconnecting' && 'Reconnecting...'}
    </div>
  )
}