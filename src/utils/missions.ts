import { isAfter, isBefore, 
  // isValid, 
  parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'


// import { Mission, MissionStatus as MS, MissionProgressStatus as MPS, MissionType } from '@/services/api/missions/types';


// const PROGRESS_STATUS_ORDER = {
//   [MS.OVERDUE]: 0,
//   [MPS.CLAIMED_REWARD]: 1,
//   [MPS.NOT_STARTED]: 2,
//   [MPS.IN_PROGRESS]: 3,
//   [MPS.COMPLETE]: 4,
// };
// const getProgressStatusOrder = (status: MPS | MS): number => {
//   const statusKey = status as keyof typeof PROGRESS_STATUS_ORDER;
//   return PROGRESS_STATUS_ORDER[statusKey] ?? 0;
// };

// const isValidStartDate = (startDate: string | null): boolean => {
//   if (!startDate) return false;
//   const parsedDate = parseISO(startDate);
//   return isValid(parsedDate) && isAfter(currentZonedDate(), parsedDate);
// };

// const isHiddenMission = (mission: Mission): boolean => {
//   const isHiddenSecret = 
//     mission.mission_type === MissionType.SECRET && 
//     mission.progress_status !== MPS.COMPLETE && 
//     mission.progress_status !== MPS.CLAIMED_REWARD;

//   const isAlwaysHidden = 
//     ['secret_stash', 'easter_egg_hunter'].includes(mission.slug || '') && 
//     mission.progress_status !== MPS.CLAIMED_REWARD;

//   return isHiddenSecret || isAlwaysHidden;
// };

// export const filterMissions = (missions: Mission[]): Mission[] => {
//   return missions.filter((mission) => 
//     mission.status !== MS.UNAVAILABLE &&
//     (mission.start_date ? isValidStartDate(mission.start_date) : true) &&
//     !isHiddenMission(mission)
//   );
// };

// export const sortMissions = (missions: Mission[], order: MissionType[]): Mission[] => {
//   return missions.sort((a, b) => {
//     const statusA = a.status === MS.OVERDUE ? a.status : a.progress_status;
//     const statusB = b.status === MS.OVERDUE ? b.status : b.progress_status;
//     const progressOrderA = getProgressStatusOrder(statusA);
//     const progressOrderB = getProgressStatusOrder(statusB);

//     if (progressOrderA !== progressOrderB) {
//       return progressOrderB - progressOrderA;
//     }

//     return order.indexOf(a.mission_type) - order.indexOf(b.mission_type);
//   });
// };


export const currentZonedDate = () => {
  const TIME_ZONE = 'Europe/Moscow'
  const currentDate = new Date()

  return toZonedTime(currentDate, TIME_ZONE)
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
