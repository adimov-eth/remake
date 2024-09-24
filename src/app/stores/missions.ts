import { atom, computed } from 'nanostores'
import { isAfter, isBefore, isValid, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { initDataRaw } from './telegram'

import { Mission, MissionProgressStatus as MPS, MissionStatus as MS, MissionType, missionTypeOrder } from '@shared/services/api/missions/types'
import { MissionStatus, MissionProgressStatus } from '@shared/services/api/missions/types'
import { useAllMissions } from '@shared/services/api/missions/model'

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




export const $missions = atom<Mission[]>([])

const currentZonedDate = () => toZonedTime(new Date(), 'Europe/Moscow')


const getProgressStatusOrder = (status: MPS | MS): number => {
  const orderMap: Record<MPS | MS, number> = {
    [MS.OVERDUE]: 0,
    [MPS.CLAIMED_REWARD]: 1,
    [MPS.NOT_STARTED]: 2,
    [MPS.IN_PROGRESS]: 3,
    [MPS.COMPLETE]: 4,
    [MS.AVAILABLE]: 0,
    [MS.UNAVAILABLE]: 0,
    [MPS.PARTICIPATED_ONCE]: 0,
  }
  return orderMap[status] ?? 0
}

export type ResolvedMission = Mission & {
  resolved_status: MissionCompleteStatus
}

export const $resolvedMissions = computed($missions, (missions: Mission[]): ResolvedMission[] => 
    missions.map((mission: Mission): Mission & { resolved_status: MissionCompleteStatus } => ({
      ...mission,
      resolved_status: magicStatusResolver(mission) as MissionCompleteStatus
    }))
  )

export const $completedMissionsCount = computed($resolvedMissions, (missions: ResolvedMission[]): number => 
  missions.filter(mission => mission.resolved_status === 'claimed_reward').length
)


const available = (mission: Mission): boolean => {

  if (mission.status === MS.UNAVAILABLE) return false;
  const { start_date, mission_type, progress_status, slug } = mission;
  if (start_date) {
    const parsedStartDate = parseISO(start_date);
    if (!isValid(parsedStartDate) || !isAfter(currentZonedDate(), parsedStartDate)) {
      return false;
    }
  }
  if (mission_type === MissionType.SECRET &&
      progress_status !== MPS.COMPLETE &&
      progress_status !== MPS.CLAIMED_REWARD) {
    return false;
  }
  if (['secret_stash', 'easter_egg_hunter'].includes(`${slug}`) &&
      progress_status !== MPS.CLAIMED_REWARD) {
    return false;
  }
  return true;
}




export const sortMissions = (missions: Mission[], order: MissionType[]) => {
  return missions.sort((a, b) => {
    const progressOrderA = getProgressStatusOrder(
      a.status === MS.OVERDUE ? a.status : a.progress_status
    )
    const progressOrderB = getProgressStatusOrder(
      b.status === MS.OVERDUE ? b.status : b.progress_status
    )

    if (progressOrderA !== progressOrderB) {
      return progressOrderB - progressOrderA
    }

    return order.indexOf(a.mission_type) - order.indexOf(b.mission_type)
  })
}

export const $filteredAndSortedMissions = computed($resolvedMissions, missions => 
  sortMissions(
    missions.filter(available),
    missionTypeOrder
  )
)





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


export { MissionProgressStatus }

export const fetchMissions = async () => {
  if (!initDataRaw) return
  const { data: fetchedMissions, error } = await useAllMissions(initDataRaw)
  if (fetchedMissions) {
    $missions.set(fetchedMissions)
  } else if (error) {
    console.error('Error fetching missions:', error)
    // Optionally, you can set an error state here
  }
}
