import { ReactNode, HTMLAttributes } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Card.module.scss';

export enum CardVariant {
  DEFAULT = 'default',
  OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
}

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const Card = (props: CardProps) => {
  const { className, children, variant = CardVariant.DEFAULT, ...otherProps } = props;

  return (
    <div className={classNames(cls.Card, {}, [className, cls[variant]])} {...otherProps}>
      {children}
    </div>
  );
};
