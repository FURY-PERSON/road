import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Text.module.scss';

export enum TextVariant {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null
  variant?: TextVariant
}

export const Text:FC<TextProps> = memo((props) => {
  const {
    className, text, title, variant = TextVariant.PRIMARY, 
  } = props;

  return (
    <div className={classNames(cls.Text, {}, [className, cls[variant]])}>
      {title
        ? <p className={cls.title}>{title}</p>
        : null}

      {text
        ? <p className={cls.text}>{text}</p>
        : null}
    </div>
  );
});
