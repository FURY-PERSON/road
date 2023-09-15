import { memo, FC, useMemo, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { Button, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { routes } from '@/shared/constant/router';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { AppImage } from '@/shared/ui/deprecated/AppImage/AppImage';

import { News, NewsListVariant } from '../../model/types/news';

import cls from './NewsListItem.module.scss';

interface NewsListItemProps {
  className?: string;
  news: News;
  variant: NewsListVariant;
  target?: HTMLAttributeAnchorTarget;
}

export const NewsListItem: FC<NewsListItemProps> = memo((props) => {
  const { className, news, variant, target = '_self' } = props;

  const { t } = useTranslation('news');
  const [isHover, bindHover] = useHover();
  const createdAt = useMemo(() => `${new Date(news.createdAt)}`, [news]);

  if (variant === NewsListVariant.BLOCK) {
    return (
      <AppLink
        target={target}
        to={routes.newsDetails(news.id)}
        {...bindHover}
        className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <AppImage
              className={cls.image}
              src={news.imageUrl}
              alt="news"
              fallback={<Skeleton width="100%" height={260} />}
            />
            <Text className={cls.date} size={TextSize.M} text={createdAt} />
          </div>
          <div className={cls.tags}>{news.type}</div>

          <div className={cls.title}>{news.title}</div>
        </Card>
      </AppLink>
    );
  }

  return (
    <div className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
      <Card className={cls.card}>
        <div className={cls.header}>
          <Text
            size={TextSize.M}
            title={`${t('author')}: ${news.author.login}`}
            className={cls.author}
          />
          <Text title={news.title} text={news.subTitle} className={cls.title} />
        </div>

        <AppImage
          className={cls.image}
          src={news.imageUrl}
          alt="news"
          fallback={<Skeleton width="100%" height={260} />}
        />

        <div className={cls.tags}>{news.type}</div>

        <Text text={news.mainText} className={cls.mainText} />

        <AppLink target={target} to={routes.newsDetails(news.id)} className={cls.footer}>
          <Button className={cls.button} variant={ButtonVariant.OUTLINE}>
            {t('read more')}
          </Button>
        </AppLink>
      </Card>
    </div>
  );
});
