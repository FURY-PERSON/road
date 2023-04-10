import {
  FC, ReactNode, useRef, MutableRefObject, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void
}

export const Page:FC<PageProps> = (props) => {
  const { className, children, onScrollEnd } = props;

  const pageRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfinityScroll({
    callback: onScrollEnd, 
    triggerRef: triggerRef,
    wrapperRef: pageRef,
  });

  return (
    <div ref={pageRef} className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef}></div>
    </div>
  );
};
