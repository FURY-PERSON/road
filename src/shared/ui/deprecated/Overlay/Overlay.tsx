import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />;
});
