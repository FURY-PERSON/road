import { memo, FC, ButtonHTMLAttributes } from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariant {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean,
  size?: ButtonSize,
}

export const Button:FC<ButtonProps> = memo((props) => {
  const {
    className, children, square, disabled,
    size = ButtonSize.SMALL, variant = ButtonVariant.CLEAR, ...otherProps 
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
  };

  return (
    <button 
      {...otherProps} 
      type="button" 
      disabled={disabled}
      className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
    >
      {children}
    </button>
  );
});
