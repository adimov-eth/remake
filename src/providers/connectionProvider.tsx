import { FC, ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useStore } from '@nanostores/react'
import { $transportStore } from '@/stores/sockets'
import { ConnectionContext, ConnectionStatus } from '@/types/connectionStatus'

const ConnectionCtx = createContext<ConnectionContext | undefined>(undefined)

export const ConnectionProvider: FC<{ children: ReactNode; websocketUrl: string }> = ({ children, websocketUrl }) => {
  const transportStore = useStore($transportStore)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('offline')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('TransportStore:', transportStore)
    if (transportStore && transportStore.$connectionStatus) {
      const unsubscribe = transportStore.$connectionStatus.subscribe((status) => {
        console.log('Connection status changed:', status)
        setConnectionStatus(status as ConnectionStatus)
      })
      return () => unsubscribe()
    } else {
      console.error('TransportStore or $connectionStatus is undefined')
    }
  }, [transportStore])

  useEffect(() => {
    console.log('Current connection status:', connectionStatus)
    if (connectionStatus === 'online') {
      setIsLoading(false)
    } else if (connectionStatus === 'connecting' || connectionStatus === 'reconnecting') {
      const timer = setTimeout(() => setIsLoading(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [connectionStatus])

  const reconnect = useCallback(() => {
    if (typeof transportStore?.connect === 'function') {
      console.log('Attempting to reconnect...')
      transportStore.connect(websocketUrl)
      setIsLoading(true)
    } else {
      console.error('Transport does not have a connect method')
    }
  }, [transportStore, websocketUrl])

  const disconnect = useCallback(() => {
    if (typeof transportStore?.disconnect === 'function') {
      console.log('Disconnecting...')
      transportStore.disconnect()
    } else {
      console.error('Transport does not have a disconnect method')
    }
  }, [transportStore])

  const value: ConnectionContext = {
    connectionStatus,
    isLoading,
    reconnect,
    disconnect,
  }

  return <ConnectionCtx.Provider value={value}>{children}</ConnectionCtx.Provider>
}

export const useConnection = () => {
  const context = useContext(ConnectionCtx)
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider')
  }
  return context
}