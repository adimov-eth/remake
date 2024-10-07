import { isAfter, isBefore, 
  // isValid, 
  parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';



export const currentZonedDate = () => {
  const TIME_ZONE = 'Europe/Moscow';
  const currentDate = new Date();

  return toZonedTime(currentDate, TIME_ZONE);
};

export const calculateProgress = (
  startDateISO: string | null,
  endDateISO: string | null
) => {
  if (!startDateISO || !endDateISO) return;

  const startDate = parseISO(startDateISO);
  const endDate = parseISO(endDateISO);
  const currentDate = currentZonedDate();

  if (isBefore(currentDate, startDate)) return 0;
  if (isAfter(currentDate, endDate)) return 100;

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = currentDate.getTime() - startDate.getTime();
  return (elapsedDuration / totalDuration) * 100;
};
export const formatRemainingTime = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
};

export const isTimeUp = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  return now >= end;
};
