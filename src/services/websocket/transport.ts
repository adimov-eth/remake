import { createNanoEvents, Emitter } from 'nanoevents';
import {
  $connectionStatus,
  $gameState,
  $ingameNotifications,
  $currentNotification,
} from '@/stores/state';
import { initClicker, Action } from '@/services/websocket/clicker';

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
} from '@/services/websocket/protocol';

import ReconnectingWebSocket from '@/services/websocket/reconnectingWebsocket';
import { queryClient } from '@/services/api/queryClient';

const PING_INTERVAL = 2000;
const PING_LEEWAY = 2000;

const pingInterval = () => {
  // use varying ping intervals to avoid flooding the server
  return Math.floor(PING_INTERVAL + Math.random() * PING_LEEWAY);
};

export interface NotificationStore {
  cursor: number;
  notifications: IngameNotification[];
}

class Transport {
  private clk: VectorClock = [0, 0]; // [server, client]

  private socket: ReconnectingWebSocket | undefined;
  private handshakeTime: number | null = null;

  private pingTimer: ReturnType<typeof setTimeout> | undefined;

  emitter: Emitter = createNanoEvents();

  constructor(url: string) {
    this.connect(url);
  }

  ping(websocket: WebSocket) {
    if (websocket.readyState === 1) {
      websocket.send(JSON.stringify({ evt: 'ping' }));
      this.pingTimer = setTimeout(() => this.ping(websocket), pingInterval());
    }
  }

  async connect(url: string) {
    //TODO verify

    console.warn('connect called', $connectionStatus.get());
    if ($connectionStatus.get() !== 'offline') return Promise.resolve(this.socket);
    console.warn('setting connection status to connecting');
    $connectionStatus.set('connecting');
    this.socket = new ReconnectingWebSocket(url);

    this.socket.addEventListener('open', () => {
      console.log('Connected to server. Sending a handshake...');

      $connectionStatus.set('handshake');
      this.handshakeTime = Date.now();

      if (this.socket !== undefined) {
        this.socket.send(
          JSON.stringify({
            evt: 'hi',
            ver: PROTOCOL_VERSION,
            time: this.handshakeTime,
          })
        );

        clearTimeout(this.pingTimer);
        this.pingTimer = setTimeout(() => this.ping(this.socket as WebSocket), pingInterval());
      }
    });

    this.socket.addEventListener('close', () => {
      console.log(
        'Disconnected from server, if it happens alot make sure you dont have parallel sessions'
      );

      clearTimeout(this.pingTimer);
      $connectionStatus.set('offline');
      // TODO: reset game state why?
      //   $gameState.set(null);
    });

    this.socket.addEventListener('message', e => {
      const event = JSON.parse(e.data) as ChannelServerEvent;
      if (event.evt === 'pong') return; // ignore pongs

      console.log('Received message from server:', event);

      if (event.evt === 'ack') {
        if (
          !isEqualClocks(this.clk, event.clk) &&
          (happenedBefore(this.clk, event.clk) || isParallelClocks(this.clk, event.clk))
        ) {
          console.info(
            'Server version is dominant, overwriting the state :: ' +
              `${JSON.stringify(this.clk)} < ${JSON.stringify(event.clk)}`
          );
          $gameState.get()?.deserialize(event.state);
        }

        // update the clock
        this.clk = updateClock(this.clk, event.clk);
      }

      if (event.evt === 'leaders') {
        console.log('Received leaders event', event);
        const currentState = $gameState.get();
        currentState?.handleLeaders(event.leaders);
      }

      if (event.evt === 'notification') {
        console.log('Received notification event', event);
        const { message, type } = event.notification;
        const currentStore = $ingameNotifications.get();
        const currentNotifications = currentStore.notifications;
        currentStore.notifications = currentNotifications;
        currentStore.cursor = currentStore.cursor + 1;
        currentNotifications.push({ message, type });
        $ingameNotifications.set(currentStore);
        $currentNotification.set(event.notification);
      }

      if (event.evt === 'hi') {
        const handshakeReceivedTime = Date.now();
        const roundTripTime = handshakeReceivedTime - this.handshakeTime!;
        const serverTime = handshakeReceivedTime - event.time;

        const timeSkew = Math.abs(roundTripTime / 2 - serverTime);

        if (timeSkew > 500) {
          console.warn(
            `Time skew is too high: ${timeSkew}ms, consider syncing the time with the server`
          );
        } else {
          console.info('Time skew between client and server: ', timeSkew);
        }

        if (!$gameState.get()) {
          $gameState.set(initClicker());
        }
        $gameState.get()?.deserialize(event.state);

        $connectionStatus.set('online');
      }
    });

    this.socket.addEventListener('error', () => {
      console.log('Error connecting to server. Trying to reconnect...');

      clearInterval(this.pingTimer);
      $connectionStatus.set('reconnecting');
    });
    return Promise.resolve(this.socket);
  }

  disconnect() {
    console.log('Disconnecting from server...');
    this.socket?.close();
    $connectionStatus.set('offline');
  }

  private async sendAction(type: Action['type'], payload: Action['payload']): Promise<void> {
    if ($connectionStatus.get() !== 'online') {
      console.error('Not connected to server, cannot send action');
      return;
    }

    const action: Action = {
      type,
      payload,
    };

    const currentState = $gameState.get();

    if (!currentState) {
      console.error('State is not initialized, did you forget to do a handshake?');
      return;
    }

    // Apply the action using the reducer function
    const updated = currentState.handleAction(action);

    // Send the update if the state was actually changed
    if (updated) {
      console.log('Local update action:', action);

      // increment our version of the clock
      this.clk[1] += 1;
      const message: ChannelClientEvent = {
        evt: 'action',
        clk: this.clk,
        act: action,
      };
      // Send the action to the server
      this.socket?.send(JSON.stringify(message));
    }
  }

  /**
   * Actions that the UI should call to modify the state
   */
  click() {
    this.sendAction('click', {});
  }

  upgrade(slug: string) {
    this.sendAction('upgrade', { slug });
  }

  commit() {
    // Send the action to the server
    this.socket?.send(JSON.stringify({ evt: 'commit' }));
  }

  getLeaders(level: number) {
    this.socket?.send(JSON.stringify({ evt: 'leaders', level }));
  }
}

export default Transport;
