import { FC, ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useStore } from '@nanostores/react'
import { $transportStore } from '@/stores/sockets'

interface ConnectionContextType {
  connectionStatus: 'online' | 'connecting' | 'reconnecting' | 'handshake' | 'offline'
  isLoading: boolean
  reconnect: () => void
  disconnect: () => void
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)

export const ConnectionProvider: FC<{ children: ReactNode; websocketUrl: string }> = ({ children, websocketUrl }) => {
  const transportStore = useStore($transportStore)
  const connectionStatus = useStore(transportStore.$connectionStatus)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (connectionStatus === 'online') {
      setIsLoading(false)
    } else if (connectionStatus === 'connecting' || connectionStatus === 'reconnecting') {
      const timer = setTimeout(() => setIsLoading(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [connectionStatus])

  const reconnect = useCallback(() => {
    if (typeof transportStore.connect === 'function') {
      transportStore.connect(websocketUrl)
      setIsLoading(true)
    } else {
      console.error('Transport does not have a connect method')
    }
  }, [transportStore, websocketUrl])

  const disconnect = useCallback(() => {
    transportStore.disconnect()
  }, [transportStore])

  const value = {
    connectionStatus,
    isLoading,
    reconnect,
    disconnect,
  }

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>
}

export const useConnection = () => {
  const context = useContext(ConnectionContext)
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider')
  }
  return context
}