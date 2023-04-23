import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { NewsList, NewsListVariant } from 'entities/News';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './NewsRecommendationList.module.scss';
import { getNewsRecommendations, getNewsRecommendationsLoading } from '../../model/selectors/selectors';
import { newsRecommendationListReducer } from '../../model/slice/newsRecomendationList.slice';
import { fetchNewsRecommendationList } from '../../model/services/fetchNewsRecommendationList/fetchNewsRecommendationList';

interface NewsRecommendationListProps {
  className?: string;
}

const reducers: ReducersList = {
  newsRecommendationList: newsRecommendationListReducer,
};

export const NewsRecommendationList:FC<NewsRecommendationListProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchNewsRecommendationList());
  });

  const recommendedNews = useSelector(getNewsRecommendations);
  const loading = useSelector(getNewsRecommendationsLoading);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <NewsList 
        className={classNames(cls.NewsRecomendationList, {}, [className])} 
        news={recommendedNews} 
        target="_blank"
        isLoading={loading} 
        variant={NewsListVariant.BLOCK}
      />
    </DynamicModuleLoader>
  );
});
