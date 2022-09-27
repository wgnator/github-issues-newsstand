import React, { useEffect, useRef } from 'react';

type Listener = (event: MouseEvent) => void;

export default function useDetectOutsideClick(
  targetElements: React.RefObject<HTMLElement>[],
  callback: () => void,
) {
  const listener = useRef<Listener | undefined>();

  useEffect(() => {
    const hasClickedOutsideElement = (
      event: MouseEvent,
      targetElement: HTMLElement | null,
    ) => {
      return !!(targetElement && !targetElement.contains(<Node>event?.target));
    };
    listener.current = (event: MouseEvent) => {
      const hasClickedOutsideAllElements = targetElements.every((ref) =>
        hasClickedOutsideElement(event, ref.current),
      );
      if (hasClickedOutsideAllElements) {
        callback();
      }
    };
    window.addEventListener('click', listener.current, true);
    return () => {
      if (listener.current !== undefined)
        window.removeEventListener('click', listener.current, true);
    };
  }, []);
}
