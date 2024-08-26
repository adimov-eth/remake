import { atom, computed } from 'nanostores'
import { Mission, MissionProgressStatus as MPS, MissionStatus as MS, MissionType, missionTypeOrder } from '@/services/api/missions/types'
import { isAfter, isBefore, isValid, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'


import { MissionStatus, MissionProgressStatus } from '@/services/api/missions/types'

export type StatusMap = {
    [MissionStatus.OVERDUE]: 'overdue';
    [MissionStatus.AVAILABLE]: 'available';
    [MissionStatus.UNAVAILABLE]: 'unavailable';
    [MissionProgressStatus.CLAIMED_REWARD]: 'claimed_reward';
    [MissionProgressStatus.COMPLETE]: 'complete';
    [MissionProgressStatus.IN_PROGRESS]: 'in_progress';
    [MissionProgressStatus.NOT_STARTED]: 'not_started' | 'available' | 'unavailable';
    [MissionProgressStatus.PARTICIPATED_ONCE]: 'participated_once';
  }
  
export type MissionCompleteStatus = StatusMap[keyof StatusMap];
  
export const resolveMissionStatus = (mission: Mission): MissionCompleteStatus => {
    const { status, progress_status, start_date } = mission;
  
    const statusMap: StatusMap = {
      [MissionStatus.OVERDUE]: 'overdue',
      [MissionStatus.AVAILABLE]: 'available',
      [MissionStatus.UNAVAILABLE]: 'unavailable',
      [MissionProgressStatus.CLAIMED_REWARD]: 'claimed_reward',
      [MissionProgressStatus.COMPLETE]: 'complete',
      [MissionProgressStatus.IN_PROGRESS]: 'in_progress',
      [MissionProgressStatus.PARTICIPATED_ONCE]: 'participated_once',
      [MissionProgressStatus.NOT_STARTED]: start_date && isAfter(currentZonedDate(), parseISO(start_date))
        ? 'available'
        : 'unavailable',
    };
  
    return (
      statusMap[status as keyof StatusMap] ||
      statusMap[progress_status as keyof StatusMap] ||
      'unknown'
    ) as MissionCompleteStatus;
  };



export const $missions = atom<Mission[]>([])

const currentZonedDate = () => toZonedTime(new Date(), 'Europe/Moscow')

const isMissionAvailable = (mission: Mission): boolean => {
  // TODO double check
  const currentDate = currentZonedDate()
  const isStartDateValid = mission.start_date
    ? isValid(parseISO(mission.start_date)) && isAfter(currentDate, parseISO(mission.start_date))
    : true
  const isHiddenSecretMission = mission.mission_type === MissionType.SECRET &&
    mission.progress_status !== MPS.COMPLETE &&
    mission.progress_status !== MPS.CLAIMED_REWARD
  const isAlwaysHiddenMission = ['secret_stash', 'easter_egg_hunter'].includes(mission.slug || '') &&
    mission.progress_status !== MPS.CLAIMED_REWARD

  return mission.status !== MS.UNAVAILABLE &&
    isStartDateValid &&
    !isHiddenSecretMission &&
    !isAlwaysHiddenMission
}

const getProgressStatusOrder = (status: MPS | MS): number => {
  const orderMap: Record<MPS | MS, number> = {
    [MS.OVERDUE]: 0,
    [MPS.CLAIMED_REWARD]: 1,
    [MPS.NOT_STARTED]: 2,
    [MPS.IN_PROGRESS]: 3,
    [MPS.COMPLETE]: 4,
    [MS.AVAILABLE]: 5,
    [MS.UNAVAILABLE]: 6,
    [MPS.PARTICIPATED_ONCE]: 7,
  }
  return orderMap[status] ?? 0
}

export const $computedMissions = computed($missions, missions =>
  missions.map(mission => ({
    ...mission,
    isInProgress: mission.progress_status === MPS.IN_PROGRESS,
    isNotStarted: mission.progress_status === MPS.NOT_STARTED,
    isComplete: mission.progress_status === MPS.COMPLETE,
    isClaimedReward: mission.progress_status === MPS.CLAIMED_REWARD,
    isParticipatedOnce: mission.progress_status === MPS.PARTICIPATED_ONCE,
    isOverdue: mission.status === MS.OVERDUE,
  }))
)


export const $resolvedMissions = computed($computedMissions, (missions) => 
    missions.map((mission) => ({
      ...mission,
      resolved_status: resolveMissionStatus(mission)
    }))
  )


export const $filteredAndSortedMissions = computed($resolvedMissions, missions => {
  const filteredMissions = missions.filter(isMissionAvailable)
  return filteredMissions.sort((a, b) => {
    const orderA = getProgressStatusOrder(a.status === MS.OVERDUE ? a.status : a.progress_status)
    const orderB = getProgressStatusOrder(b.status === MS.OVERDUE ? b.status : b.progress_status)
    if (orderA !== orderB) return orderB - orderA
    return missionTypeOrder.indexOf(a.mission_type) - missionTypeOrder.indexOf(b.mission_type)
  })
})




export const calculateProgress = (startDateISO: string | null, endDateISO: string | null): number | undefined => {
  if (!startDateISO || !endDateISO) return undefined

  const startDate = parseISO(startDateISO)
  const endDate = parseISO(endDateISO)
  const currentDate = currentZonedDate()

  if (isBefore(currentDate, startDate)) return 0
  if (isAfter(currentDate, endDate)) return 100

  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsedDuration = currentDate.getTime() - startDate.getTime()
  return (elapsedDuration / totalDuration) * 100
}

export const formatRemainingTime = (endDate: string): string => {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - now.getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return hours > 0 ? `${hours}h` : `${minutes}m`
}

export const isTimeUp = (endDate: string): boolean => new Date() >= new Date(endDate)


// Legacy
export const magicStatusResolver = (mission: Mission): string => {
  const { status, progress_status, start_date } = mission
  // Mission is overdue
  if (status === MS.OVERDUE) return 'overdue'

  // Mission reward has been claimed
  if (progress_status === 'claimed_reward') return 'claimed_reward'

  // Mission is complete but reward not yet claimed
  if (progress_status === 'complete') return 'complete'

  // Mission is currently in progress
  if (progress_status === 'in_progress') return 'in_progress'

  // Mission is not started
  if (progress_status === 'not_started') {
    // Mission is available to start
    if (start_date && isAfter(currentZonedDate(), parseISO(start_date))) return 'available'
    // Mission is not yet available to start
    return 'unavailable'
  }
  // User has participated in the mission once (specific to certain mission types)
  if (progress_status === 'participated_once') return 'participated_once'

  // Mission is available but not started   
  if (status === 'available') return 'available'
  
  // Mission is not available
  if (status === 'unavailable') return 'unavailable'

  // Default case or error handling
  return 'unknown'
}

