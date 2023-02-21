import { memo, FC, ButtonHTMLAttributes } from 'react';
import { useTheme } from 'shared/contexts/ThemeProvider';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ThemeVariant
}

export const Button:FC<ButtonProps> = memo((props) => {
 const { className, children, variant = ThemeVariant.CLEAR, ...otherProps } = props;
 const {theme} = useTheme();

 return (
    <button {...otherProps} className={classNames(cls.Button, {}, [className, cls[variant]])}>{children}</button>
 );
})

export enum ThemeVariant {
  CLEAR = 'clear'
}