import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { NewsFilters } from '@/widgets/NewsFilters';
import { NewsSort, NewsType } from '@/entities/News';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SortOrder } from '@/shared/types/sort';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

import { getNewsPageSort } from '../../model/selectors/getNewsPageSort/getNewsPageSort';
import { getNewsPageOrder } from '../../model/selectors/getNewsPageOrder/getNewsPageOrder';
import { getNewsPageSearch } from '../../model/selectors/getNewsPageSearch/getNewsPageSearch';
import { getNewsPageType } from '../../model/selectors/getNewsPageType/getNewsPageType';
import { newsPageActions } from '../../model/slice/newsPage.slice';
import { fetchNewsList } from '../../model/services/fetchNewsList/fetchNewsList';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const sort = useSelector(getNewsPageSort);
  const order = useSelector(getNewsPageOrder);
  const search = useSelector(getNewsPageSearch);
  const type = useSelector(getNewsPageType);

  const refetchNews = useCallback(() => {
    dispatch(fetchNewsList({ replace: true }));
  }, [dispatch]);

  const debouncedRefetchNews = useDebounce(refetchNews, 500);

  const onChangeSort = useCallback(
    (value: NewsSort) => {
      dispatch(newsPageActions.setSort(value));
      dispatch(newsPageActions.setPage(1));
      refetchNews();
    },
    [dispatch, refetchNews]
  );

  const onChangeOrder = useCallback(
    (value: SortOrder) => {
      dispatch(newsPageActions.setOrder(value));
      dispatch(newsPageActions.setPage(1));
      refetchNews();
    },
    [dispatch, refetchNews]
  );

  const onChangeSearch = useCallback(
    (value: string) => {
      dispatch(newsPageActions.setSearch(value));
      dispatch(newsPageActions.setPage(1));
      debouncedRefetchNews();
    },
    [dispatch, debouncedRefetchNews]
  );

  const onChangeType = useCallback(
    (value: NewsType) => {
      dispatch(newsPageActions.setType(value));
      dispatch(newsPageActions.setPage(1));
      refetchNews();
    },
    [dispatch, refetchNews]
  );

  return (
    <NewsFilters
      type={type}
      onChangeSearch={onChangeSearch}
      order={order}
      onChangeOrder={onChangeOrder}
      search={search}
      sort={sort}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
      className={className}
    />
  );
});
