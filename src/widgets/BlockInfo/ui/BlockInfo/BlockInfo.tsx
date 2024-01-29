import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useGetBlockInfo } from '@/entities/Block';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { BlockSanitaryCondition } from '@/features/BlockSanitaryCondition';
import { RoomWithTenants } from '@/features/RoomWithTenants';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Card } from '@/shared/ui/redesigned/Card';

import { Skeleton } from '../Skeleton/Skeleton';

import cls from './BlockInfo.module.scss';

interface BlockInfoProps {
  blockId: string;
  className?: string;
}

export const BlockInfo: FC<BlockInfoProps> = memo((props) => {
  const { className, blockId } = props;

  const { t } = useTranslation('translation');

  const { data, isLoading, isFetching, error } = useGetBlockInfo({ blockId: blockId });

  const loading = isLoading || isFetching;

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  return (
    <Card padding="24" max className={classNames(cls.BlockInfo, {}, [className])}>
      <VStack gap={32}>
        <Text title={`${t('Block info')}: ${data?.number}`} />

        <BlockSanitaryCondition blockId={blockId} />

        <HStack gap={32} max>
          {data?.rooms.map((room) => <RoomWithTenants key={room.id} roomId={room.id} />)}
        </HStack>
      </VStack>
    </Card>
  );
});
