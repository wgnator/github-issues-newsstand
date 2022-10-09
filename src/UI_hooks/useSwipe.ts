import { RefObject, useEffect } from 'react';

const useSwipe = (
  targetRef: RefObject<HTMLDivElement>,
  scrollLength: number,
  direction: 'x' | 'y',
) => {
  useEffect(() => {
    const startPoint = { x: 0, y: 0 };

    const onTouchStart = (event: TouchEvent) => (
      (startPoint.x = event.changedTouches[0].clientX),
      (startPoint.y = event.changedTouches[0].clientY)
    );

    const onTouchEnd = (event: TouchEvent) => {
      const offset = {
        x: startPoint.x - event.changedTouches[0].clientX,
        y: startPoint.y - event.changedTouches[0].clientY,
      };
      direction === 'y' &&
        Math.abs(offset.y) > Math.abs(offset.x) &&
        (event.preventDefault(),
        targetRef.current?.scrollTo({
          top: targetRef.current.scrollTop + (offset.y / Math.abs(offset.y)) * scrollLength,
          behavior: 'smooth',
        }));

      direction === 'x' &&
        Math.abs(offset.x) > Math.abs(offset.y) &&
        (event.preventDefault(),
        targetRef.current?.scrollTo({
          left: targetRef.current.scrollLeft + (offset.x / Math.abs(offset.x)) * scrollLength,
          behavior: 'smooth',
        }));
    };

    targetRef.current && targetRef.current.addEventListener('touchstart', onTouchStart);
    targetRef.current && targetRef.current.addEventListener('touchend', onTouchEnd);

    return () => {
      targetRef.current?.removeEventListener('touchstart', onTouchStart);
      targetRef.current?.removeEventListener('touchend', onTouchEnd);
    };
  }, []);
};

export default useSwipe;
