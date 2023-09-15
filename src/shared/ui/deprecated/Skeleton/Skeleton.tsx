import { memo, FC, CSSProperties } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  borderRadius?: string | number;
  width?: string | number;
}

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const Skeleton: FC<SkeletonProps> = memo((props) => {
  const { className, borderRadius, height, width } = props;

  const styles: CSSProperties = {
    height,
    width,
    borderRadius
  };

  return <div style={styles} className={classNames(cls.Skeleton, {}, [className])} />;
});
