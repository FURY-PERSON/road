import { MutableRefObject, useEffect } from 'react';

export interface IUseInfinityScroll {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>,
}

export function useInfinityScroll({ callback, triggerRef, wrapperRef }: IUseInfinityScroll) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const trigger = triggerRef.current;

    const options = {
      root: wrapper,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback?.();
      }
    }, options);

    observer.observe(trigger);

    return () => {
      if (trigger) {
        observer.unobserve(trigger);
      }
    };
  }, [wrapperRef, callback, triggerRef]);
}
