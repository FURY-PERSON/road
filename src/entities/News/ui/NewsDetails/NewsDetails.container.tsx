import { memo, FC } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { newsDetailsReducer } from '../../model/slice/newsDetails.slice';
import { NewsDetails, NewsDetailsProps } from './NewsDetails';
import cls from './NewsDetails.module.scss';

const reducers: ReducersList = {
  newsDetails: newsDetailsReducer,
};

export const NewsDetailsContainer:FC<NewsDetailsProps> = memo((props) => {
  const { className } = props;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.NewsDetails, {}, [className])}>
        <NewsDetails {...props} />
      </div>
    </DynamicModuleLoader>
  );
});
