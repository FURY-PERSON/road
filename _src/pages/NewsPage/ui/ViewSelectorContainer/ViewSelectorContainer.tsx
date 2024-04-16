import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { NewsListVariant } from '@/entities/News';
import { NewsViewSelector } from '@/features/NewsViewSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { newsPageActions } from '../../model/slice/newsPage.slice';
import { getNewsPageListView } from '../../model/selectors/getNewsPageListView/getNewsPageListView';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const view = useSelector(getNewsPageListView);

  const onChangeView = useCallback(
    (view: NewsListVariant) => {
      dispatch(newsPageActions.setView(view));
    },
    [dispatch]
  );

  return <NewsViewSelector className={className} view={view} onViewClick={onChangeView} />;
});
