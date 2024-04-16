import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Text.module.scss';

type TextVariant = 'primary' | 'error' | 'accent';

type TextSize = 'M' | 'L' | 'XL';

type TextElement = 'h2' | 'h3' | 'h4';

interface TextProps {
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  title?: string | number | null;
  text?: string | number | null;
  variant?: TextVariant;
  size?: TextSize;
  bold?: boolean;
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
    titleClassName,
    textClassName,
    bold,
    'data-testid': dataTestId = 'Text'
  } = props;

  const TextElement = textElementMap[size];

  return (
    <div className={classNames(cls.Text, {}, [cls[variant], cls[size], className])}>
      {title ? (
        <TextElement
          data-testid={`${dataTestId}.title`}
          className={classNames(cls.title, { [cls.bold]: bold }, [titleClassName])}
        >
          {title}
        </TextElement>
      ) : null}

      {text ? (
        <p data-testid={`${dataTestId}.text`} className={classNames(cls.text, {}, [textClassName])}>
          {text}
        </p>
      ) : null}
    </div>
  );
});
