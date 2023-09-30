import { FC, ReactNode, useRef, MutableRefObject, UIEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveScrollActions } from '@/widgets/SaveScroll/model/slice/saveScroll.slice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getPageSaveScroll } from '@/widgets/SaveScroll';
import { StateSchema } from '@/app/providers/StoreProvider';
import { toggleFeatures } from '@/shared/lib/helpers/features/helpers/toggleFeatureFlag';

import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
  saveScroll?: boolean;
  testId?: string;
}

export const Page: FC<PageProps> = (props) => {
  const { className, children, onScrollEnd, saveScroll = true, testId } = props;

  const pageRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useInfinityScroll({
    callback: onScrollEnd,
    triggerRef: triggerRef,
    wrapperRef: toggleFeatures({
      name: 'newDesign',
      off: () => pageRef,
      on: () => undefined
    })
  });

  const scroll = useSelector((state: StateSchema) => getPageSaveScroll(state, pathname));

  useInitialEffect(() => {
    pageRef.current.scrollTop = scroll;
  });

  const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
    if (!saveScroll) return;
    dispatch(
      saveScrollActions.setScrollPosition({
        path: pathname,
        position: event.currentTarget.scrollTop
      })
    );
  }, 300);

  return (
    <div
      onScroll={onScroll}
      ref={pageRef}
      className={classNames(
        toggleFeatures({
          name: 'newDesign',
          on: () => cls.pageRedesigned,
          off: () => cls.Page
        }),
        {},
        [className]
      )}
      data-testId={testId}
    >
      {children}
      {onScrollEnd ? (
        <div className={cls.triggerWrapper}>
          <div className={cls.trigger} ref={triggerRef} />
        </div>
      ) : null}
    </div>
  );
};
