import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByNewsId } from '../model/services/fetchNewsDetailsComments/fetchNewsDetailsComments';
import { newsDetailsCommentsReducer } from '../model/slice/newsDetailsComments.slice';
import { NewsDetailsCommentList, NewsDetailsCommentListProps } from './NewsDetailsCommentList';
import cls from './NewsDetailsCommentList.module.scss';

const reducers: ReducersList = {
  newsDetailsComments: newsDetailsCommentsReducer,
};

export const NewsDetailsCommentListContainer:FC<NewsDetailsCommentListProps> = memo((props) => {
  const { className, newsId } = props;
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentsByNewsId(newsId));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.NewsDetailsCommentList, {}, [className])}>
        <NewsDetailsCommentList {...props} />
      </div>
    </DynamicModuleLoader>
  );
});
