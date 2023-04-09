import {
  memo, FC, useMemo, useCallback, 
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { News, NewsListVariant } from '../../model/types/news';
import cls from './NewsListItem.module.scss';

interface NewsListItemProps {
  className?: string;
  news: News,
  variant: NewsListVariant,
}

export const NewsListItem:FC<NewsListItemProps> = memo((props) => {
  const {
    className, news, variant, 
  } = props;

  const { t } = useTranslation('news');
  const navigate = useNavigate();
  const [isHover, bindHover] = useHover();
  const createdAt = useMemo(() => `${new Date(news.createdAt)}`, [news]);

  const onItemClick = useCallback(() => {
    navigate(RoutePath[AppRoutes.NEWS_DETAILS] + news.id);
  }, [navigate, news.id]);

  if (variant === NewsListVariant.BLOCK) {
    return (
      <div onClick={onItemClick} {...bindHover} className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
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
      </div>
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

        <div className={cls.footer}>
          <Button onClick={onItemClick} className={cls.button} variant={ButtonVariant.OUTLINE}>{t('read more')}</Button>
        </div>
      </Card>

    </div>
  );
});
