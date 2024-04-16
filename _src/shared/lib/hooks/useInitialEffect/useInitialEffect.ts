import { useLayoutEffect } from 'react';

export const useInitialEffect = (callback: () => void) => {
  useLayoutEffect(() => {
    if (__PROJECT__ === 'storybook' || __PROJECT__ === 'jest') return;
    callback();
  }, []);
};
