import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import cls from './UsersListItem.module.scss';

interface UsersListItemLoaderProps {
  className?: string;
}

export const UsersListItemLoader: FC<UsersListItemLoaderProps> = memo((props) => {
  const { className } = props;

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.UsersListItem, {}, [className])}>
          <CardDeprecated className={cls.card}>
            <SkeletonDeprecated width="100%" height={164} />
          </CardDeprecated>
        </div>
      }
      on={
        <div className={cls.UsersListItem}>
          <Card border="round" padding="16">
            <VStack gap={16} max>
              <HStack max justify="between">
                <Skeleton width={120} height={24} />
                <Skeleton width={120} height={18} />
              </HStack>

              <Skeleton width={330} height={18} />

              <HStack gap={16}>
                <Skeleton width={64} height={18} />
                <Skeleton width={120} height={18} />
              </HStack>
            </VStack>
          </Card>
        </div>
      }
    />
  );
});
