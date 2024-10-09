/* eslint-disable @typescript-eslint/no-explicit-any */
import { Survey } from 'posthog-js';

export interface DailyReward {
  id: string
  completed: boolean
  day: number
  description: string
  icon_url: string | null
  name: string
  progress_status: MissionProgressStatus
  reward_quarks: number
  reward_stars: number
  slug: string
  status: MissionStatus
}

export enum MissionType {
  DAILY = 'daily',
  MILESTONE = 'milestone',
  SPECIAL = 'special',
  EVENT = 'event',
  SECRET = 'secret',
}

export enum MissionRewardType {
  QUARKS = 'quarks',
  STARS = 'stars',
}

export enum MissionStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  OVERDUE = 'overdue',
}

export enum MissionProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
  CLAIMED_REWARD = 'claimed_reward',
  PARTICIPATED_ONCE = 'participated_once',
  AVAILABLE = MissionStatus.AVAILABLE,
  UNAVAILABLE = MissionStatus.UNAVAILABLE,
}

export interface Mission {
  id: string
  name: string
  slug: string | null
  description: string
  mission_type: MissionType
  reward_quarks: number
  reward_stars: number
  status: MissionStatus
  progress_status: MissionProgressStatus
  start_date?: string | null
  end_date?: string | null
  icon_url?: string | null
  requirements: any
  postHogSurvey: Survey
}

export type MissionRequirements = {
  referrals_count?: number
  quarks_count?: number
  level?: number
  clicks_count?: number
  quarks_spent_on_upgrades?: number
  join_before?: string
  daily_login?: any
  daily_quarks_tapped?: number;
  daily_clicks_tapped?: number;
  daily_boosts_bought?: number;
  daily_friends_invited?: number;
  daily_quarks_swapped?: number;
}

// const missionTypeMap: Record<MissionType, string> = {
//   [MissionType.DAILY]: 'Daily',
//   [MissionType.MILESTONE]: 'Milestone',
//   [MissionType.SPECIAL]: 'Special',
//   [MissionType.EVENT]: 'Event',
//   [MissionType.SECRET]: 'Secret',
// }

export const missionTypeOrder: MissionType[] = [
  MissionType.EVENT,
  MissionType.DAILY,
  MissionType.MILESTONE,
  MissionType.SPECIAL,
  MissionType.SECRET,
];
