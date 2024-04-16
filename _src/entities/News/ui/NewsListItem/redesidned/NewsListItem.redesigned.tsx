import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { routes } from '@/shared/constant/router';
import { getDateWithTime } from '@/shared/lib/helpers/date/getDateWithTime';

import { News, NewsBlockType, NewsListVariant, NewsTextBlock } from '../../../model/types/news';

import cls from './NewsListItem.redesigned.module.scss';

interface NewsListItemProps {
  className?: string;
  news: News;
  variant: NewsListVariant;
  target?: HTMLAttributeAnchorTarget;
}

export const NewsListItem = memo((props: NewsListItemProps) => {
  const { className, news, variant, target } = props;
  const { t } = useTranslation('news');

  if (variant === NewsListVariant.LIST) {
    const textBlock = news.blocks.find(
      (block) => block.type === NewsBlockType.TEXT
    ) as NewsTextBlock;

    return (
      <Card
        padding="24"
        max
        className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}
      >
        <VStack max gap={16}>
          <HStack gap={8} max>
            <Text bold text={news.author.login} />
            <Text text={getDateWithTime(news.createdAt)} />
          </HStack>

          <Text title={news.title} bold />
          <Text title={news.mainText} size="M" />

          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={news.imageUrl}
            className={cls.img}
            alt={news.title}
          />

          {textBlock?.paragraphs && (
            <Text className={cls.textBlock} text={textBlock.paragraphs?.slice(0, 2).join(' ')} />
          )}

          <HStack max justify="between">
            <AppLink target={target} to={routes.newsDetails(news.id)}>
              <Button variant="outline">{t('read more')}</Button>
            </AppLink>
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      target={target}
      to={routes.newsDetails(news.id)}
      className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}
    >
      <Card className={cls.card} border="round">
        <AppImage
          fallback={<Skeleton width={200} height={200} />}
          alt={news.title}
          src={news.imageUrl}
          className={cls.img}
        />

        <VStack className={cls.info} gap={4}>
          <Text text={news.title} className={cls.title} size="L" />
          <VStack gap={4} className={cls.footer} max>
            <HStack justify="between" max>
              <Text text={getDateWithTime(news.createdAt)} className={cls.date} size="M" />
            </HStack>

            <HStack gap={4}>
              <Text bold text={`${t('author')}: `} />
              <Text bold title={news.author.login} size="M" />
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
