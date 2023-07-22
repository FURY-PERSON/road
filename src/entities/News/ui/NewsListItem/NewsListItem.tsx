import {
  memo, FC, useMemo, HTMLAttributeAnchorTarget, 
} from 'react';
import { useTranslation } from 'react-i18next';
import { AppRoutes, RoutePath } from '@/shared/constant/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { News, NewsListVariant } from '../../model/types/news';
import cls from './NewsListItem.module.scss';

interface NewsListItemProps {
  className?: string;
  news: News,
  variant: NewsListVariant,
  target?: HTMLAttributeAnchorTarget
}

export const NewsListItem:FC<NewsListItemProps> = memo((props) => {
  const {
    className, news, variant, target = '_self',
  } = props;

  const { t } = useTranslation('news');
  const [isHover, bindHover] = useHover();
  const createdAt = useMemo(() => `${new Date(news.createdAt)}`, [news]);

  if (variant === NewsListVariant.BLOCK) {
    return (
      <AppLink 
        target={target}
        to={RoutePath[AppRoutes.NEWS_DETAILS] + news.id} 
        {...bindHover}
        className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <img className={cls.image} src={news.imageUrl} alt="news" />
            <Text className={cls.date} size={TextSize.M} text={createdAt} />
          </div>
          <div className={cls.tags}>
            {news.type}
          </div>

          <div className={cls.title}>{news.title}</div>
        </Card>
      </AppLink>
    );
  }

  return (
    <div className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
      <Card className={cls.card}>
        <div className={cls.header}>
          <Text size={TextSize.M} title={`${t('author')}: ${news.author.login}`} className={cls.author}></Text>
          <Text title={news.title} text={news.subTitle} className={cls.title} />
        </div>

        <img className={cls.image} src={news.imageUrl} alt="news" />

        <div className={cls.tags}>
          {news.type}
        </div>

        <Text text={news.mainText} className={cls.mainText}></Text>

        <AppLink target={target} to={RoutePath[AppRoutes.NEWS_DETAILS] + news.id} className={cls.footer}>
          <Button className={cls.button} variant={ButtonVariant.OUTLINE}>{t('read more')}</Button>
        </AppLink>
      </Card>

    </div>
  );
});
