import { memo, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { NewsListVariant, NewsSort, NewsType } from '@/entities/News';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { Card } from '@/shared/ui/Card/Card';
import i18n from '@/shared/config/i18n/i18n';
import { SortOrder } from '@/shared/types/sort';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { NewsViewSelector } from '@/features/NewsViewSelector';

import { fetchNewsList } from '../../model/services/fetchNewsList/fetchNewsList';
import { getNewsPageSearch } from '../../model/selectors/getNewsPageSearch/getNewsPageSearch';
import { newsPageActions } from '../../model/slice/newsPage.slice';
import { getNewsPageListView } from '../../model/selectors/getNewsPageListView/getNewsPageListView';
import { getNewsPageSort } from '../../model/selectors/getNewsPageSort/getNewsPageSort';
import { getNewsPageOrder } from '../../model/selectors/getNewsPageOrder/getNewsPageOrder';
import { getNewsPageType } from '../../model/selectors/getNewsPageType/getNewsPageType';

import cls from './NewsPageFilter.module.scss';

interface NewsPageFilterProps {
  className?: string;
}

const orderOption: Array<SelectOption<SortOrder>> = [
  { value: 'ASC', content: i18n.t('ascending') },
  { value: 'DESC', content: i18n.t('descending') }
];

const sortOrderOption: Array<SelectOption<NewsSort>> = [
  { value: NewsSort.TITLE, content: i18n.t('title') },
  { value: NewsSort.CREATED, content: i18n.t('date') }
];

const newsTypeTabs: Array<TabItem<NewsType>> = [
  { value: NewsType.ALL, content: i18n.t('all') },
  { value: NewsType.WARNING, content: i18n.t('warning') }
];

export const NewsPageFilter: FC<NewsPageFilterProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const view = useSelector(getNewsPageListView);
  const sort = useSelector(getNewsPageSort);
  const order = useSelector(getNewsPageOrder);
  const search = useSelector(getNewsPageSearch);
  const type = useSelector(getNewsPageType);
  const { t } = useTranslation();

  const onChangeView = useCallback(
    (view: NewsListVariant) => {
      dispatch(newsPageActions.setView(view));
    },
    [dispatch]
  );

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
    <div className={classNames(cls.NewsPageFilter, {}, [className])}>
      <div className={cls.sortWrapper}>
        <div className={cls.sortSelects}>
          <Select<NewsSort>
            onChange={onChangeSort}
            value={sort}
            label={t('sort by')}
            options={sortOrderOption}
          />
          <Select<SortOrder>
            onChange={onChangeOrder}
            value={order}
            label={t('order by')}
            options={orderOption}
          />
        </div>

        <NewsViewSelector view={view} onViewClick={onChangeView} />
      </div>

      <Card className={cls.search}>
        <TextInput value={search} onChange={onChangeSearch} placeholder="Search..." />
      </Card>

      <Tabs<NewsType>
        className={cls.type}
        tabs={newsTypeTabs}
        value={type}
        onTabClick={onChangeType}
      />
    </div>
  );
});
