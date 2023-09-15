import { memo, FC, useMemo, CSSProperties } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { Skeleton } from '../Skeleton/Skeleton';
import { AppImage } from '../AppImage/AppImage';

import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
}

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const Avatar: FC<AvatarProps> = memo((props) => {
  const { className, src, size = 40 } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size
    }),
    [size]
  );

  return (
    <AppImage
      className={classNames(cls.Avatar, {}, [className])}
      src={src}
      style={styles}
      fallback={<Skeleton width={size} height={size} />}
      alt="avatar"
    />
  );
});
