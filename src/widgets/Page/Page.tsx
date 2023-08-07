import {
  FC, ReactNode, useRef, MutableRefObject, UIEvent, 
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveScrollActions } from '@/widgets/SaveScroll/model/slice/saveScroll.slice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getPageSaveScroll } from '@/widgets/SaveScroll';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void,
  saveScroll?: boolean
  testId?: string
}

export const Page:FC<PageProps> = (props) => {
  const {
    className, children, onScrollEnd, saveScroll = true, testId
  } = props;

  const pageRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useInfinityScroll({
    callback: onScrollEnd, 
    triggerRef: triggerRef,
    wrapperRef: pageRef,
  });

  const scroll = useSelector((state: StateSchema) => getPageSaveScroll(state, pathname));

  useInitialEffect(() => {
    pageRef.current.scrollTop = scroll;
  });

  const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
    if (!saveScroll) return;
    dispatch(saveScrollActions.setScrollPosition({
      path: pathname,
      position: event.currentTarget.scrollTop,
    }));
  }, 300);

  return (
    <div onScroll={onScroll} ref={pageRef} className={classNames(cls.Page, {}, [className])} data-testId={testId}>
      {children}
      {onScrollEnd
        ? (
          <div className={cls.triggerWrapper}>
            <div className={cls.trigger} ref={triggerRef}></div>
          </div>
        )
        : null}
    </div>
  );
};
