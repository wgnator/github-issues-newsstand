import React, { RefObject } from 'react';

export default function useIntersectionObserver(
  detectorRef: RefObject<HTMLElement>,
  rootRef: RefObject<HTMLElement>,
  callback: () => void,
  dependencies: any[] = [],
) {
  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      console.log('intersecting...');
      callback();
    }
  };

  React.useEffect(() => {
    const options = {
      root: rootRef.current,
      rootMargin: '200px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(onIntersection, options);
    if (detectorRef.current) {
      observer.observe(detectorRef.current);
    }
    return () => observer.disconnect();
  }, dependencies);
}
