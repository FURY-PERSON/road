import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextSize = 'M' | 'L' | 'XL';

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
  M: 'h4',
  L: 'h3',
  XL: 'h2'
};

export const Text: FC<TextProps> = memo((props) => {
  const {
    className,
    text,
    title,
    variant = 'primary',
    size = 'L',
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