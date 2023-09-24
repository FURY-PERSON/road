import { memo, FC, ButtonHTMLAttributes, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';

import { SvgLoader } from '../SvgLoader';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  isLoading?: boolean;

  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    square,
    disabled,
    size = 'small',
    variant = 'clear',
    isLoading,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight)
  };

  return (
    <button
      {...otherProps}
      type="button"
      disabled={disabled}
      className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
    >
      <div className={cls.addonLeft}>{addonLeft}</div>
      {isLoading === true ? <SvgLoader /> : children}
      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  );
});
