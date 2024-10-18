import { useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { initHapticFeedback } from '@telegram-apps/sdk-react';
import { $isVibrationEnabled } from '@app/stores/state';
interface useClickNotification {
  notifyUser: () => void;
}

const useClickNotification = (path: string): useClickNotification => {
  const isVibrationEnabled = useStore($isVibrationEnabled);

  if (!isVibrationEnabled) return { notifyUser: () => {} };

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
