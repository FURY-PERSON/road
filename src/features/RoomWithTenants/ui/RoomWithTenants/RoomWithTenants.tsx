import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useGetRoomInfo } from '@/entities/Room';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';

import { Skeleton } from '../Skeleton/Skeleton';

import cls from './RoomWithTenants.module.scss';

interface RoomWithTenantsProps {
  className?: string;
  roomId: string;
}

export const RoomWithTenants: FC<RoomWithTenantsProps> = memo((props) => {
  const { className, roomId } = props;

  const { data, isLoading, isFetching, error } = useGetRoomInfo({ roomId: roomId });

  const loading = isLoading || isFetching;

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  return (
    <HStack className={classNames(cls.RoomWithTenants, {}, [className])}>
      {data?.tenants.map((tenant) => <div key={tenant.id}>{tenant.id}</div>)}
    </HStack>
  );
});
