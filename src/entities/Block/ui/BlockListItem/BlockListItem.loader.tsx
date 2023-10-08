import { memo, FC } from 'react';

import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import cls from './BlockListItem.module.scss';

interface BlockListItemLoaderProps {
  className?: string;
}

export const BlockListItemLoader: FC<BlockListItemLoaderProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={cls.BlockListItem}>
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
  );
});
