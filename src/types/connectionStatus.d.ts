export type ConnectionStatus =
  | 'online'
  | 'connecting'
  | 'reconnecting'
  | 'handshake'
  | 'offline'

export interface ConnectionContext {
  connectionStatus: ConnectionStatus
  isLoading: boolean
  reconnect: () => void
  disconnect: () => void
}