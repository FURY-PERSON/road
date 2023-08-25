import { FC, ReactNode, HTMLAttributes } from 'react';

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

export const Card: FC<CardProps> = (props) => {
  const { className, children, variant = CardVariant.DEFAULT, ...otherProps } = props;

  return (
    <div className={classNames(cls.Card, {}, [className, cls[variant]])} {...otherProps}>
      {children}
    </div>
  );
};
