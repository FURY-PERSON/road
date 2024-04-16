import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import AppSvg from '@/shared/assets/icons/app-image.svg';

import { HStack } from '../Stack/HStack/HStack';

import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
  return (
    <HStack justify="center" className={classNames(cls.appLogoWrapper, {}, [className])}>
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg width={size} height={size} color="#000" className={cls.appLogo} />
    </HStack>
  );
});
