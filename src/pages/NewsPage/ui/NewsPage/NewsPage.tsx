import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page/Page';
import { Text, TextVariant } from '@/shared/ui/deprecated/Text/Text';

import { getNewsPageError } from '../../model/selectors/getNewsPageError/getNewsPageError';
import { fetchNextNewsPage } from '../../model/services/fetchNextNewsPage/fetchNextNewsPage';
import { newsPageReducer } from '../../model/slice/newsPage.slice';
import { NewsPageFilter } from '../NewsPageFilter/NewsPageFilter';
import { NewsList } from '../NewsList/NewsList';

import cls from './NewsPage.module.scss';

const reducers: ReducersList = {
  newsPage: newsPageReducer
};

export const NewsPage = () => {
  const dispatch = useAppDispatch();

  const error = useSelector(getNewsPageError);

  const loadNextPage = useCallback(() => {
    dispatch(fetchNextNewsPage());
  }, [dispatch]);

  if (error) {
    return <Text title={error} variant={TextVariant.ERROR} />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={loadNextPage} className={cls.main} testId="NewsPage">
        <NewsPageFilter />

        <NewsList />
      </Page>
    </DynamicModuleLoader>
  );
};
