import {
  memo, FC, ReactNode, DetailedHTMLProps, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around'
export type FlexAlign = 'start' | 'center' | 'end' 
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse' 
export type FlexGap = 4 | 8 | 16 | 32

type DivType = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivType {
  className?: string;
  children: ReactNode
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection
  gap?: FlexGap
}

const justifyClassesMap: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
  around: cls.justifyAround,
};

const alignClassesMap: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
};

const directionClassesMap: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
  'row-reverse': cls.directionRowReverse,
  'column-reverse': cls.directionColumnReverse,
};

const gapClassesMap: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  32: cls.gap32,
};

export const Flex:FC<FlexProps> = memo((props) => {
  const {
    className, children, align, direction, justify, gap,
  } = props;

  return (
    <div 
      className={classNames(cls.Flex, {}, [
        className, 
        justify && justifyClassesMap[justify], 
        align && alignClassesMap[align], 
        direction && directionClassesMap[direction],
        gap && gapClassesMap[gap],
      ])}
    >
      {children}
    </div>
  );
});
