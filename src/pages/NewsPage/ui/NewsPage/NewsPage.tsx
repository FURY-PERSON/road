import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page/Page';
import { Text, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';

import { getNewsPageError } from '../../model/selectors/getNewsPageError/getNewsPageError';
import { fetchNextNewsPage } from '../../model/services/fetchNextNewsPage/fetchNextNewsPage';
import { newsPageReducer } from '../../model/slice/newsPage.slice';
import { NewsPageFilter } from '../NewsPageFilter/NewsPageFilter';
import { NewsList } from '../NewsList/NewsList';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

import cls from './NewsPage.module.scss';
import clsR from './NewsPage.redesigned.module.scss';

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

  const content = (
    <ToggleFeatures
      feature="newDesign"
      off={
        <Page onScrollEnd={loadNextPage} className={cls.main} testId="NewsPage">
          <NewsPageFilter />

          <NewsList />
        </Page>
      }
      on={
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={
            <Page testId="NewsPage" onScrollEnd={loadNextPage} className={clsR.main}>
              <NewsList />
            </Page>
          }
        />
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};
