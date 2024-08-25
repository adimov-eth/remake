import { isAfter, isBefore, isValid, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

import {
  Mission,
  MissionProgressStatus,
  MissionStatus,
  MissionType,
} from '@/services/api/missions/types.ts'

const getProgressStatusOrder = (
  status: MissionProgressStatus | MissionStatus
): number => {
  switch (status) {
    case MissionStatus.OVERDUE:
      return 0
    case MissionProgressStatus.CLAIMED_REWARD:
      return 1
    case MissionProgressStatus.NOT_STARTED:
      return 2
    case MissionProgressStatus.IN_PROGRESS:
      return 3
    case MissionProgressStatus.COMPLETE:
      return 4
    default:
      return 0
  }
}

export const currentZonedDate = () => {
  const TIME_ZONE = 'Europe/Moscow'
  const currentDate = new Date()

  return toZonedTime(currentDate, TIME_ZONE)
}

export const filterMissions = (missions: Mission[]) => {
  return missions.filter((mission: Mission) => {
    const currentDate = currentZonedDate()
    const isStartDateValid = mission.start_date
      ? isValid(parseISO(mission.start_date)) &&
        isAfter(currentDate, parseISO(mission.start_date))
      : false
    const isHiddenSecretMission = (mission.mission_type === MissionType.SECRET) && (mission.progress_status !== MissionProgressStatus.COMPLETE) && (mission.progress_status !== MissionProgressStatus.CLAIMED_REWARD)
    const isAlwaysHiddenMission = ['secret_stash', 'easter_egg_hunter'].includes(mission.slug || '') && mission.progress_status !== MissionProgressStatus.CLAIMED_REWARD
    return (
      mission.status !== MissionStatus.UNAVAILABLE &&
      (!mission.start_date || isStartDateValid) &&
      !isHiddenSecretMission &&
      !isAlwaysHiddenMission
    )
  })
}

export const sortMissions = (missions: Mission[], order: MissionType[]) => {
  return missions.sort((a, b) => {
    const progressOrderA = getProgressStatusOrder(
      a.status === MissionStatus.OVERDUE ? a.status : a.progress_status
    )
    const progressOrderB = getProgressStatusOrder(
      b.status === MissionStatus.OVERDUE ? b.status : b.progress_status
    )

    if (progressOrderA !== progressOrderB) {
      return progressOrderB - progressOrderA
    }

    return order.indexOf(a.mission_type) - order.indexOf(b.mission_type)
  })
}

export const calculateProgress = (
  startDateISO: string | null,
  endDateISO: string | null
) => {
  if (!startDateISO || !endDateISO) return

  const startDate = parseISO(startDateISO)
  const endDate = parseISO(endDateISO)
  const currentDate = currentZonedDate()

  if (isBefore(currentDate, startDate)) return 0
  if (isAfter(currentDate, endDate)) return 100

  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsedDuration = currentDate.getTime() - startDate.getTime()
  return (elapsedDuration / totalDuration) * 100
}
export const formatRemainingTime = (endDate: string) => {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - now.getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours}h`
  } else {
    return `${minutes}m`
  }
}

export const isTimeUp = (endDate: string) => {
  const now = new Date()
  const end = new Date(endDate)
  return now >= end
}
