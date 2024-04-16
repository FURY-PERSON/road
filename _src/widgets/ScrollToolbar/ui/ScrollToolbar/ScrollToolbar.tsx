import { memo } from 'react';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ScrollToTopButton } from '@/features/ScrollToTopButton';
import { useRouteChange } from '@/shared/lib/hooks/useRouteChange/useRouteChange';
import { RouteName } from '@/shared/constant/router';

import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
  className?: string;
}

const showToolbarPages: Array<RouteName> = [
  'news',
  'newsCreate',
  'newsDetails',
  'newsEdit',
  'users',
  'blocks'
];

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  const appRoute = useRouteChange();

  if (!showToolbarPages.includes(appRoute)) {
    return null;
  }

  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNames(cls.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
