import { useCallback } from 'react';

import { initHapticFeedback } from '@telegram-apps/sdk-react';

interface useClickNotification {
  notifyUser: () => void;
}

const useClickNotification = (path: string): useClickNotification => {
  const hapticFeedback = initHapticFeedback();
  const audio = path ? new Audio(path) : false;

  const notifyUser = useCallback(() => {
    hapticFeedback.impactOccurred('medium');
    if (audio) {
      audio.play();
    }
  }, [hapticFeedback, audio]);

  return {
    notifyUser,
  };
};

export default useClickNotification;
