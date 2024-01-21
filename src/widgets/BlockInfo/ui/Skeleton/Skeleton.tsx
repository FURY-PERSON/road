import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = memo((props) => {
  const { className } = props;

  return <SvgLoader className={classNames(cls.Skeleton, {}, [className])} />;
});
