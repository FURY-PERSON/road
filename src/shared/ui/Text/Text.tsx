import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

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

type TextElement = 'h2' | 'h3' | 'h4';

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null;
  variant?: TextVariant;
  size?: TextSize;

  'data-testid'?: string;
}

const textElementMap: Record<TextSize, TextElement> = {
  [TextSize.M]: 'h4',
  [TextSize.L]: 'h3',
  [TextSize.XL]: 'h2'
};

export const Text: FC<TextProps> = memo((props) => {
  const {
    className,
    text,
    title,
    variant = TextVariant.PRIMARY,
    size = TextSize.L,
    'data-testid': dataTestId = 'Text'
  } = props;

  const TextElement = textElementMap[size];

  return (
    <div className={classNames(cls.Text, {}, [className, cls[variant], cls[size]])}>
      {title ? (
        <TextElement data-testid={`${dataTestId}.title`} className={cls.title}>
          {title}
        </TextElement>
      ) : null}

      {text ? (
        <p data-testid={`${dataTestId}.text`} className={cls.text}>
          {text}
        </p>
      ) : null}
    </div>
  );
});
