import { useLayoutEffect } from 'react';

export const useInitialEffect = (callback: () => void) => {
  useLayoutEffect(() => {
    if (__PROJECT__ === 'storybook') return;
    callback();
  }, []);
};
