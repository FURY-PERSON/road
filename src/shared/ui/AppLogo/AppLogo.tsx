import React, { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { HStack } from '../Stack/HStack/HStack';

import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
  return (
    <HStack justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <div className={cls.appLogo}>BDS</div>
    </HStack>
  );
});
