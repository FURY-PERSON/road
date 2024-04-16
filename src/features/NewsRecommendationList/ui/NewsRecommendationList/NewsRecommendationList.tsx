import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { NewsList, NewsListVariant } from '@/entities/News';

import { newsRecommendationListReducer } from '../../model/slice/newsRecomendationList.slice';
import { useGetNewsRecommendations } from '../../model/api/newsRecommendationsApi';

import cls from './NewsRecommendationList.module.scss';

interface NewsRecommendationListProps {
  className?: string;
  testId?: string;
}

const reducers: ReducersList = {
  newsRecommendationList: newsRecommendationListReducer
};

export const NewsRecommendationList: FC<NewsRecommendationListProps> = memo((props) => {
  const { className, testId } = props;

  const { isLoading, isFetching, error, data: recommendedNews } = useGetNewsRecommendations(6);

  const loading = isLoading || isFetching;

  return (
    <DynamicModuleLoader reducers={reducers}>
      <NewsList
        className={classNames(cls.NewsRecomendationList, {}, [className])}
        news={recommendedNews}
        target="_blank"
        isLoading={loading}
        variant={NewsListVariant.BLOCK}
        testId={testId}
      />
    </DynamicModuleLoader>
  );
});
