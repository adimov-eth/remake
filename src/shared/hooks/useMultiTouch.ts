import { useEffect, RefObject } from 'react';

type TouchEventHandler = (event: TouchEvent, numberOfTouches: number) => void;

const useMultiTouch = (
  refElement: RefObject<HTMLElement>,
  onTouchStart?: TouchEventHandler,
  onTouchMove?: TouchEventHandler,
  onTouchEnd?: TouchEventHandler
): RefObject<HTMLElement> => {
  const touchAreaRef = refElement;

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      const numberOfTouches = event.touches.length;
      if (onTouchStart) {
        onTouchStart(event, numberOfTouches);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      const numberOfTouches = event.touches.length;
      if (onTouchMove) {
        onTouchMove(event, numberOfTouches);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const numberOfTouches = event.touches.length;
      if (onTouchEnd) {
        onTouchEnd(event, numberOfTouches);
      }
    };

    const touchArea = touchAreaRef.current;
    if (touchArea) {
      touchArea.addEventListener('touchstart', handleTouchStart);
      touchArea.addEventListener('touchmove', handleTouchMove);
      touchArea.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (touchArea) {
        touchArea.removeEventListener('touchstart', handleTouchStart);
        touchArea.removeEventListener('touchmove', handleTouchMove);
        touchArea.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [onTouchStart, onTouchMove, onTouchEnd]);

  return touchAreaRef;
};

export default useMultiTouch;