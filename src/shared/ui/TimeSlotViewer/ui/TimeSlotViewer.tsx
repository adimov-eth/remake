import React, { ReactNode, useState, useEffect } from 'react';

interface ITimeSlotViewerProps {
  hour?: number;
  minute?: number;
  durationMinutes?: number;
  children: ReactNode;
}

export const TimeSlotViewer: React.FC<ITimeSlotViewerProps> = ({ 
  hour = 0,
  minute = 0,
  durationMinutes = 1,
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const checkTime = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(hour, minute, 0, 0);

      if (now > targetTime) targetTime.setDate(targetTime.getDate() + 1);

      const timeUntilTarget = targetTime.getTime() - now.getTime();
      const isTargetTimeWindow = now.getHours() === hour && now.getMinutes() >= minute && now.getMinutes() < minute + durationMinutes;

      if (timerId) clearTimeout(timerId);

      if (isTargetTimeWindow) {
        setIsVisible(true);
        const remainingTime = (durationMinutes * 60000) - ((now.getMinutes() - minute) * 60000 + now.getSeconds() * 1000);
        timerId = setTimeout(() => setIsVisible(false), remainingTime);
      } else {
        setIsVisible(false);
        timerId = setTimeout(checkTime, timeUntilTarget);
      }
    };

    checkTime();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [hour, minute, durationMinutes]);

  if (!isVisible) return null;
  
  return <>{children}</>;
};
