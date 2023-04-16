import { NewsList, NewsListVariant, NewsViewSelector } from 'entities/News';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page/Page';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { getNewsPageError } from '../model/selectors/getNewsPageError/getNewsPageError';
import { getNewsPageListView } from '../model/selectors/getNewsPageListView/getNewsPageListView';
import { getNewsPageLoading } from '../model/selectors/getNewsPageLoading/getNewsPageLoading';
import { fetchNextNewsPage } from '../model/services/fetchNextNewsPage/fetchNextNewsPage';
import { getNews, newsPageActions, newsPageReducer } from '../model/slice/newsPage.slice';
import styles from './NewsPage.module.scss';
import { initNewsPage } from '../model/services/initNewsPage/initNewsPage';

const reducers: ReducersList = {
  newsPage: newsPageReducer,
};

export const NewsPage = () => {
  const { t } = useTranslation('news');
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(initNewsPage());
  });

  const news = useSelector(getNews.selectAll);
  const isLoading = useSelector(getNewsPageLoading);
  const view = useSelector(getNewsPageListView);
  const error = useSelector(getNewsPageError);

  const loadNextPage = useCallback(() => {
    dispatch(fetchNextNewsPage());
  }, [dispatch]);

  const onChangeView = useCallback((view: NewsListVariant) => {
    dispatch(newsPageActions.setView(view));
  }, [dispatch]);

  if (error) {
    return <Text title={error} variant={TextVariant.ERROR} />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={loadNextPage} className={styles.main}>
        <NewsViewSelector view={view} onViewClick={onChangeView} />
 
        <NewsList variant={view} news={news} isLoading={isLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};
