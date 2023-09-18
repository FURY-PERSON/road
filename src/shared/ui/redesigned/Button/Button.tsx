import { memo, FC, ButtonHTMLAttributes } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';

import { SvgLoader } from '../SvgLoader';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'background' | 'backgroundInverted';

export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  isLoading?: boolean;
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
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled
  };

  return (
    <button
      {...otherProps}
      type="button"
      disabled={disabled}
      className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
    >
      {isLoading === true ? <SvgLoader /> : children}
    </button>
  );
});
