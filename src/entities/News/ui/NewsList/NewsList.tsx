import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { News, NewsListVariant } from '../../model/types/news';
import { NewsListItem } from '../NewsListItem/NewsListItem';
import { NewsListItemLoader } from '../NewsListItem/NewsListItem.loader';
import cls from './NewsList.module.scss';

interface NewsListProps {
  className?: string;
  news: News[],
  isLoading?: boolean,
  variant?: NewsListVariant
}

export const NewsList:FC<NewsListProps> = memo((props) => {
  const {
    className, isLoading, news, variant = NewsListVariant.LIST, 
  } = props;

  if (isLoading) {
    const skeletonAmount = variant === NewsListVariant.LIST ? 3 : 12;

    return (
      <div className={classNames(cls.NewsList, {}, [className])}>
        {new Array(skeletonAmount).fill(0).map((s, i) => <NewsListItemLoader key={i} variant={variant} />)}
      </div>
    );
  }

  return (
    <div className={classNames(cls.NewsList, {}, [className])}>
      {news.map((item) => <NewsListItem key={item.id} variant={variant} news={item} />)}
    </div>
  );
});
