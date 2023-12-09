import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';

import { NewsListVariant } from '../../../model/types/news';

import cls from './NewsListItem.deprecated.module.scss';

interface NewsListItemLoaderProps {
  className?: string;
  variant: NewsListVariant;
}

export const NewsListItemLoader: FC<NewsListItemLoaderProps> = memo((props) => {
  const { className, variant } = props;

  if (variant === NewsListVariant.BLOCK) {
    return (
      <div className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
        <CardDeprecated className={cls.card}>
          <div className={cls.imageWrapper}>
            <SkeletonDeprecated className={cls.image} width="100%" height={120} />
          </div>
          <SkeletonDeprecated height={16} width={70} className={cls.tags} />

          <SkeletonDeprecated height={16} width={160} className={cls.title} />
        </CardDeprecated>
      </div>
    );
  }

  return (
    <div className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
      <CardDeprecated className={cls.card}>
        <div className={cls.header}>
          <SkeletonDeprecated width={160} height={16} className={cls.author} />
          <SkeletonDeprecated width={70} height={14} className={cls.title} />
        </div>

        <SkeletonDeprecated width="100%" height={260} className={cls.image} />

        <SkeletonDeprecated height={16} width={70} className={cls.tags} />

        <SkeletonDeprecated width="100%" height={130} className={cls.mainText} />

        <div className={cls.footer}>
          <SkeletonDeprecated width={120} height={38} className={cls.button} />
        </div>
      </CardDeprecated>
    </div>
  );
});
