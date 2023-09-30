import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';

import { NewsListVariant } from '../../../model/types/news';

import cls from './NewsListItem.redesigned.module.scss';

interface NewsListItemLoaderProps {
  className?: string;
  variant: NewsListVariant;
}

export const NewsListItemLoader: FC<NewsListItemLoaderProps> = memo((props) => {
  const { className, variant } = props;

  if (variant === NewsListVariant.BLOCK) {
    return (
      <div className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
        <Card className={cls.card} border="round">
          <Skeleton width="100%" height={220} className={cls.title} />

          <VStack className={cls.info} gap={4}>
            <Skeleton width="100%" height={96} />
            <VStack gap={16} className={cls.footer}>
              <HStack justify="between">
                <Skeleton width={160} height={16} />
              </HStack>

              <HStack gap={16}>
                <Skeleton width={160} height={16} />
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </div>
    );
  }

  return (
    <Card padding="24" max className={classNames(cls.NewsListItem, {}, [className, cls[variant]])}>
      <VStack max gap={16}>
        <HStack gap={8}>
          <Skeleton width={160} height={16} />
        </HStack>

        <Skeleton width="100%" height={48} />

        <VStack gap={32} max>
          <Skeleton width="100%" height={156} />

          <Skeleton width="100%" height={92} />
        </VStack>

        <HStack max justify="between">
          <Skeleton width={120} height={32} />
        </HStack>
      </VStack>
    </Card>
  );
});
