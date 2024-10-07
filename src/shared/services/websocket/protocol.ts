// This code shared with backend

import { Action, SerializedState } from './clicker';

export const PROTOCOL_VERSION = '1.0.0';

/** Vector clocks for ordering events */
export type VectorClock = [number, number];
export interface IngameNotification {
  message: string,
  type: 'info' | 'error' | 'success',
}

export const happenedBefore = ([s1, c1]: VectorClock, [s2, c2]: VectorClock) =>
  s1 <= s2 && c1 <= c2 && (s1 < s2 || c1 < c2);

export const isEqualClocks = ([s1, c1]: VectorClock, [s2, c2]: VectorClock) =>
  s1 === s2 && c1 === c2;

export const isParallelClocks = (lhs: VectorClock, rhs: VectorClock) =>
  !happenedBefore(lhs, rhs) && !happenedBefore(rhs, lhs);

export const updateClock = ([s1, c1]: VectorClock, [s2, c2]: VectorClock): VectorClock => [
  Math.max(s1, s2),
  Math.max(c1, c2),
];

// Types of events sent over the WS channel (client -> server)
export type ChannelClientEvent =
  // the first message sent by the client (handshake)
  | {
    evt: 'hi';
    ver: string;
    time: number;
  }
  // perform an action (update)
  | {
    evt: 'action';
    act: Action;
    clk: VectorClock;
  }
  // client asks to save the updates to the permanent storage
  | {
    evt: 'commit';
  }
  | {
    evt: 'notification';
    notification: IngameNotification;
  }
  | {
    evt: 'ping';
  };

export type ACKErrorCode = 'RATE_LTD' | 'INV_ACTION';

export type ChannelServerEvent =
  | {
    evt: 'hi';
    ver: string;
    time: number;
    state: SerializedState;
  }
  | {
    evt: 'ack';
    clk: VectorClock;
    err?: ACKErrorCode | undefined;
    state: SerializedState;
  }
  | {
    evt: 'pong';
  }
  | {
    evt: 'notification';
    notification: IngameNotification;
  };