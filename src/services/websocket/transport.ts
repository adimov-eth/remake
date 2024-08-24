import { createNanoEvents, Emitter } from 'nanoevents'
import { atom } from 'nanostores'

// this is a forked version of the original library extracted from Partysocket
// with up-to-date fixes and types
import { $currentNotification } from '@/stores/notifications'

import {
  ClickerState,
  Action,
  initClicker,
} from '@/services/websocket/clicker'
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

type ConnectionStatus =
  | 'online'
  | 'connecting'
  | 'reconnecting'
  | 'handshake'
  | 'offline'

const PING_INTERVAL = 2000
const PING_LEEWAY = 2000

const pingInterval = () => {
  // use varying ping intervals to avoid flooding the server
  return Math.floor(PING_INTERVAL + Math.random() * PING_LEEWAY)
}

export interface NotificationStore {
  cursor: number
  notifications: IngameNotification[]
}

class Transport {
  private clk: VectorClock = [0, 0] // [server, client]

  private socket: ReconnectingWebSocket | undefined
  private handshakeTime: number | null = null

  private pingTimer: ReturnType<typeof setTimeout> | undefined

  // stores that the UI can subscribe to
  $connectionStatus = atom<ConnectionStatus>('offline')
  $state = atom<ClickerState | null>(null)
  $ingameNotifications = atom<NotificationStore>({
    notifications: [],
    cursor: 0,
  })

  emitter: Emitter = createNanoEvents()

  constructor(url: string) {
    this.connect(url)
  }

  ping(websocket: WebSocket) {
    if (websocket.readyState === 1) {
      websocket.send(JSON.stringify({ evt: 'ping' }))
      this.pingTimer = setTimeout(() => this.ping(websocket), pingInterval())
    }
  }

  connect(url: string) {
    this.socket = new ReconnectingWebSocket(url)
    this.$connectionStatus.set('connecting')

    this.socket.addEventListener('open', () => {
      console.log('Connected to server. Sending a handshake...')

      this.$connectionStatus.set('handshake')
      this.handshakeTime = Date.now()

      if (this.socket !== undefined) {
        this.socket.send(
          JSON.stringify({
            evt: 'hi',
            ver: PROTOCOL_VERSION,
            time: this.handshakeTime,
          })
        )

        clearInterval(this.pingTimer)
        this.pingTimer = setTimeout(
          () => this.ping(this.socket as WebSocket),
          pingInterval()
        )
      }
    })

    this.socket.addEventListener('close', () => {
      console.log('Disconnected from server')

      clearInterval(this.pingTimer)
      this.$connectionStatus.set('offline')
      this.$state.set(null)
    })

    this.socket.addEventListener('message', (e) => {
      const event = JSON.parse(e.data) as ChannelServerEvent
      if (event.evt === 'pong') return // ignore pongs

      console.log('Received message from server:', event)

      if (event.evt === 'ack') {
        if (
          !isEqualClocks(this.clk, event.clk) &&
          (happenedBefore(this.clk, event.clk) ||
            isParallelClocks(this.clk, event.clk))
        ) {
          console.info(
            'Server version is dominant, overwriting the state :: ' +
              `${JSON.stringify(this.clk)} < ${JSON.stringify(event.clk)}`
          )
          this.$state.get()?.deserialize(event.state)
          queryClient.invalidateQueries({ queryKey: ['get/userData'] })
        }

        // update the clock
        this.clk = updateClock(this.clk, event.clk)
      }

      if (event.evt === 'leaders') {
        console.log('Received leaders event', event)
        const currentState = this.$state.get()
        currentState?.handleLeaders(event.leaders)
      }

      if (event.evt === 'notification') {
        console.log('Received notification event', event)
        const { message, type } = event.notification
        const currentStore = this.$ingameNotifications.get()
        const currentNotifications = currentStore.notifications
        currentStore.notifications = currentNotifications
        currentStore.cursor = currentStore.cursor + 1
        currentNotifications.push({ message, type })
        this.$ingameNotifications.set(currentStore)
        $currentNotification.set(event.notification)
      }

      if (event.evt === 'hi') {
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

        if (!this.$state.get()) {
          this.$state.set(initClicker())
        }
        this.$state.get()?.deserialize(event.state)

        this.$connectionStatus.set('online')
      }
    })

    this.socket.addEventListener('error', () => {
      console.log('Error connecting to server. Trying to reconnect...')

      clearInterval(this.pingTimer)
      this.$connectionStatus.set('reconnecting')
    })
  }

  disconnect() {
    console.log('Disconnecting from server...')
    this.socket?.close()
    this.$connectionStatus.set('offline')
  }

  private async sendAction(
    type: Action['type'],
    payload: Action['payload']
  ): Promise<void> {
    if (this.$connectionStatus.get() !== 'online') {
      console.error('Not connected to server, cannot send action')
      return
    }

    const action: Action = {
      type,
      payload,
    }

    const currentState = this.$state.get()

    if (!currentState) {
      console.error(
        'State is not initialized, did you forget to do a handshake?'
      )
      return
    }

    // Apply the action using the reducer function
    const updated = currentState.handleAction(action)

    // Send the update if the state was actually changed
    if (updated) {
      console.log('Local update action:', action)

      // increment our version of the clock
      this.clk[1] += 1

      const message: ChannelClientEvent = {
        evt: 'action',
        clk: this.clk,
        act: action,
      }
      console.log('Local update msg:', message)
      // Send the action to the server
      this.socket?.send(JSON.stringify(message))
    }
  }

  /**
   * Actions that the UI should call to modify the state
   */
  click() {
    this.sendAction('click', {})
  }

  upgrade(slug: string) {
    this.sendAction('upgrade', { slug })
  }

  commit() {
    // Send the action to the server
    this.socket?.send(JSON.stringify({ evt: 'commit' }))
  }

  getLeaders(level: number) {
    this.socket?.send(JSON.stringify({ evt: 'leaders', level }))
  }
}

export default Transport
