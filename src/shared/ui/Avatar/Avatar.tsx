import {
  memo, FC, useMemo, CSSProperties, 
} from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string,
  size?: number
}

export const Avatar:FC<AvatarProps> = memo((props) => {
  const { className, src, size = 40 } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  return (
    <img 
      className={classNames(cls.Avatar, {}, [className])} 
      src={src} 
      style={styles}
      alt="avatar" 
    />
  );
});
