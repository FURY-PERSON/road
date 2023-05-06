import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { NewsListVariant } from '../../model/types/news';
import cls from './NewsListItem.module.scss';

interface NewsListItemLoaderProps {
  className?: string;
  variant: NewsListVariant
}

export const NewsListItemLoader:FC<NewsListItemLoaderProps> = memo((props) => {
  const { className, variant } = props;

  if (variant === NewsListVariant.BLOCK) {
    return (
      <div className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <Skeleton className={cls.image} width="100%" height={120} />

          </div>
          <Skeleton height={16} width={70} className={cls.tags}></Skeleton>

          <Skeleton height={16} width={160} className={cls.title}></Skeleton>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
      <Card className={cls.card}>
        <div className={cls.header}>
          <Skeleton width={160} height={16} className={cls.author}></Skeleton>
          <Skeleton width={70} height={14} className={cls.title} />
        </div>

        <Skeleton width="100%" height={260} className={cls.image} />

        <Skeleton height={16} width={70} className={cls.tags}></Skeleton>

        <Skeleton width="100%" height={130} className={cls.mainText}></Skeleton>

        <div className={cls.footer}>
          <Skeleton width={120} height={64} className={cls.button}></Skeleton>
        </div>
      </Card>
    </div>
  );
});
