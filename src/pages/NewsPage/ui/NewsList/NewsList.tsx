import { memo, FC } from 'react';
import { NewsList as SimpleNewsList } from 'entities/News';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSearchParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import cls from './NewsList.module.scss';
import { getNews } from '../../model/slice/newsPage.slice';
import { getNewsPageLoading } from '../../model/selectors/getNewsPageLoading/getNewsPageLoading';
import { getNewsPageListView } from '../../model/selectors/getNewsPageListView/getNewsPageListView';
import { initNewsPage } from '../../model/services/initNewsPage/initNewsPage';

export const NewsList:FC = memo(() => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initNewsPage(searchParams));
  });

  const news = useSelector(getNews.selectAll);
  const isLoading = useSelector(getNewsPageLoading);
  const view = useSelector(getNewsPageListView);

  return (
    <SimpleNewsList className={cls.list} variant={view} news={news} isLoading={isLoading} />
  );
});
