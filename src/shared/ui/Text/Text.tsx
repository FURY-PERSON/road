import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Text.module.scss';

export enum TextVariant {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null
  variant?: TextVariant,
  size?: TextSize
}

export const Text:FC<TextProps> = memo((props) => {
  const {
    className, text, title, variant = TextVariant.PRIMARY, size = TextSize.L,
  } = props;

  return (
    <div className={classNames(cls.Text, {}, [className, cls[variant], cls[size]])}>
      {title
        ? <p className={cls.title}>{title}</p>
        : null}

      {text
        ? <p className={cls.text}>{text}</p>
        : null}
    </div>
  );
});
