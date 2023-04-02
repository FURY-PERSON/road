import { memo, FC, useLayoutEffect } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { SvgLoader } from 'shared/ui/SvgLoader';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { getNewsDetailsLoading } from '../../model/selectors/getNewsDetailsLoading/getNewsDetailsLoading';
import { newsDetailsReducer } from '../../model/slice/newsDetails.slice';
import { fetchNewsById } from '../../model/services/fetchNewsById/fetchNewsById';
import cls from './NewsDetails.module.scss';
import { getNewsDetailsError } from '../../model/selectors/getNewsDetailsError/getNewsDetailsError';
import { getNewsDetailsData } from '../../model/selectors/getNewsDetailsData/getNewsDetailsData';

interface NewsDetailsProps {
  className?: string;
  id: string
}

const reducers: ReducersList = {
  newsDetails: newsDetailsReducer,
};

export const NewsDetails:FC<NewsDetailsProps> = memo((props) => {
  const { className, id } = props;
  const dispatch = useAppDispatch();

  const isLoading = useSelector(getNewsDetailsLoading);
  const error = useSelector(getNewsDetailsError);
  const news = useSelector(getNewsDetailsData);

  useLayoutEffect(() => {
    dispatch(fetchNewsById({ id }));
  }, [dispatch, id]);

  let content;

  if (!isLoading) {
    content = (
      <div className={cls.loading}>
        <Skeleton className={cls.avatar} width={200} height={200} borderRadius="50%" />
        <Skeleton className={cls.skeleton} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </div>
    );  
  } else if (error) {
    content = (
      <div className={cls.error}>
        <Text variant={TextVariant.ERROR} title={error} />
      </div>
    );  
  } else {
    content = (
      <div></div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.NewsDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});
