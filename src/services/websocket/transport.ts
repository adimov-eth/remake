/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNanoEvents, Emitter } from 'nanoevents'
import { $currentNotification } from '@/stores/notifications'
import { Action } from '@/services/websocket/clicker'
import {
  ChannelClientEvent,
  ChannelServerEvent,
  PROTOCOL_VERSION,
  happenedBefore,
  isParallelClocks,
  isEqualClocks,
  VectorClock,
  updateClock,
  IngameNotification,
} from '@/services/websocket/protocol'
import ReconnectingWebSocket from "@/services/websocket/reconnectingWebsocket"
import { queryClient } from "@/services/api/queryClient"

import { $connectionStatus, $gameState, $ingameNotifications } from '@/stores/state'

// Constants
const PING_INTERVAL = 30000 // 30 seconds
const PONG_TIMEOUT = 5000 // 5 seconds

// Types
export interface NotificationStore {
  cursor: number
  notifications: IngameNotification[]
}

class Transport {
  private clk: VectorClock = [0, 0]
  private socket: ReconnectingWebSocket | undefined
  private handshakeTime: number | null = null
  private pingTimer: ReturnType<typeof setInterval> | undefined
  private pongTimer: ReturnType<typeof setTimeout> | undefined
  private isConnecting = false
  private messageQueue: any[] = []
  private batchInterval: ReturnType<typeof setInterval> | undefined

  emitter: Emitter = createNanoEvents()


  constructor(url: string) {
    this.connect(url)
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  connect(url: string) {
    if (this.isConnecting) return
    this.isConnecting = true
    $connectionStatus.set('connecting')
    this.socket = new ReconnectingWebSocket(url, undefined, {
      connectionTimeout: 10000, // 10 seconds
      debug: true, // Enable debug logging
      debugLogger: console.log, // Use console.log for debug messages
      maxRetries: Infinity, // Keep trying to reconnect
    })
    
    this.setupEventListeners()
  }

  private setupEventListeners() {
    if (!this.socket) return

    this.socket.addEventListener('open', this.handleOpen)
    this.socket.addEventListener('close', this.handleClose)
    this.socket.addEventListener('message', this.handleMessage)
    this.socket.addEventListener('error', (event: Event) => {
      if (event instanceof ErrorEvent) {
        this.handleError(event);
      } else {
        console.error('Unknown error event:', event);
      }
    })
  }

  private handleOpen = () => {
    this.isConnecting = false
    $connectionStatus.set('handshake')
    this.handshakeTime = Date.now()

    this.sendHandshake()
    this.startPingInterval()
  }

  private handleClose = () => {
    this.isConnecting = false
    this.clearPingInterval()
    $connectionStatus.set('offline')
  }

  private handleMessage = (e: MessageEvent) => {
    const event = JSON.parse(e.data) as ChannelServerEvent
    if (event.evt === 'pong') {
      this.handlePong()
      return
    }

    this.processServerEvent(event)
  }

  private handleError = (event: ErrorEvent) => {
    console.error('WebSocket error:', event.message);
    this.isConnecting = false
    this.clearPingInterval()
    $connectionStatus.set('reconnecting')
  }

  private handleOnline = () => {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      this.connect(this.socket?.url || '')
    }
  }

  private handleOffline = () => {
    this.disconnect()
  }

  private handleVisibilityChange = () => {
    if (!document.hidden && this.socket?.readyState !== WebSocket.OPEN) {
      this.socket?.reconnect()
    }
  }

  private startPingInterval() {
    this.clearPingInterval()
    this.pingTimer = setInterval(() => this.ping(), PING_INTERVAL)
  }

  private clearPingInterval() {
    if (this.pingTimer) clearInterval(this.pingTimer)
    if (this.pongTimer) clearTimeout(this.pongTimer)
  }

  private ping() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ evt: 'ping' }))
      this.pongTimer = setTimeout(() => {
        // No pong received, connection might be dead
        this.socket?.close()
      }, PONG_TIMEOUT)
    }
  }

  private handlePong() {
    if (this.pongTimer) clearTimeout(this.pongTimer)
  }

  private processServerEvent(event: ChannelServerEvent) {
    switch (event.evt) {
      case 'ack':
        this.handleAckEvent(event)
        break
      case 'leaders':
        this.handleLeadersEvent(event)
        break
      case 'notification':
        this.handleNotificationEvent(event)
        break
      case 'hi':
        this.handleHiEvent(event)
        break
    }
  }

  private handleAckEvent(event: Extract<ChannelServerEvent, { evt: 'ack' }>) {
    if (
      !isEqualClocks(this.clk, event.clk) &&
      (happenedBefore(this.clk, event.clk) ||
        isParallelClocks(this.clk, event.clk))
    ) {
      console.info(
        'Server version is dominant, overwriting the state :: ' +
          `${JSON.stringify(this.clk)} < ${JSON.stringify(event.clk)}`
      )
      $gameState.get()?.deserialize(event.state)
      queryClient.invalidateQueries({ queryKey: ['get/userData'] })
    }

    // update the clock
    this.clk = updateClock(this.clk, event.clk)
  }

  private handleLeadersEvent(event: Extract<ChannelServerEvent, { evt: 'leaders' }>) {
    console.log('Received leaders event', event)
    const currentState = $gameState.get()
    currentState?.handleLeaders(event.leaders)
  }

  private handleNotificationEvent(event: Extract<ChannelServerEvent, { evt: 'notification' }>) {
    console.log('Received notification event', event)
    const { message, type } = event.notification
    const currentStore = $ingameNotifications.get()
    const currentNotifications = currentStore.notifications
    currentStore.notifications = currentNotifications
    currentStore.cursor = currentStore.cursor + 1
    currentNotifications.push({ message, type })
    $ingameNotifications.set(currentStore)
    $currentNotification.set(event.notification)
  }

  private handleHiEvent(event: Extract<ChannelServerEvent, { evt: 'hi' }>) {
    const handshakeReceivedTime = Date.now()
    const roundTripTime = handshakeReceivedTime - this.handshakeTime!
    const serverTime = handshakeReceivedTime - event.time

    const timeSkew = Math.abs(roundTripTime / 2 - serverTime)

    if (timeSkew > 500) {
      console.warn(
        `Time skew is too high: ${timeSkew}ms, consider syncing the time with the server`
      )
    } else {
      console.info('Time skew between client and server: ', timeSkew)
    }

    $gameState.get()?.deserialize(event.state)

    $connectionStatus.set('online')
  }

  private sendHandshake() {
    this.socket?.send(JSON.stringify({
      evt: 'hi',
      ver: PROTOCOL_VERSION,
      time: this.handshakeTime,
    }))
  }

  private sendBatchedMessage(message: any) {
    this.messageQueue.push(message)
    if (!this.batchInterval) {
      this.batchInterval = setInterval(() => this.flushMessages(), 100) // Flush every 100ms
    }
  }

  private flushMessages() {
    if (this.messageQueue.length > 0) {
      const batch = this.messageQueue
      this.messageQueue = []
      this.socket?.send(JSON.stringify(batch))
    } else {
      clearInterval(this.batchInterval!)
      this.batchInterval = undefined
    }
  }

  private async sendAction(type: Action['type'], payload: Action['payload']): Promise<void> {
    if ($connectionStatus.get() !== 'online') {
      console.error('Not connected to server, cannot send action')
      return
    }

    const currentState = $gameState.get()
    if (!currentState) {
      console.error('State is not initialized, did you forget to do a handshake?')
      return
    }

    const action: Action = { type, payload }
    const updated = currentState.handleAction(action)

    if (updated) {
      this.clk[1] += 1
      const message: ChannelClientEvent = { evt: 'action', clk: this.clk, act: action }
      this.sendBatchedMessage(message)
    }
  }

  disconnect() {
    this.socket?.close()
    $connectionStatus.set('offline')
  }

  // Public methods
  click() {
    this.sendAction('click', {})
  }

  upgrade(slug: string) {
    this.sendAction('upgrade', { slug })
  }

  commit() {
    this.socket?.send(JSON.stringify({ evt: 'commit' }))
  }

  getLeaders(level: number) {
    this.socket?.send(JSON.stringify({ evt: 'leaders', level }))
  }
}

export default Transport