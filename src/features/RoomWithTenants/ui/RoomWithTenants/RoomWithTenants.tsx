import { memo, FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useGetRoomInfo } from '@/entities/Room';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { RoleGuard } from '@/features/RoleGuard';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { AddNewTenantToRoomModal } from '@/features/AddNewTenantToRoomForm';
import { RoleName } from '@/entities/Role';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';

import { Skeleton } from '../Skeleton/Skeleton';
import { UserCardWithDelete } from '../UserCardWithDelete/UserCardWithDelete';

import cls from './RoomWithTenants.module.scss';

interface RoomWithTenantsProps {
  className?: string;
  roomId: string;
}

export const RoomWithTenants: FC<RoomWithTenantsProps> = memo((props) => {
  const { className, roomId } = props;

  const { t } = useTranslation('translation');

  const { data, isLoading, isFetching, error } = useGetRoomInfo({ roomId: roomId });

  const [modalOpened, setModalOpened] = useState(false);

  const onClickAddTenant = useCallback(() => {
    setModalOpened(true);
  }, []);

  const onModalClose = useCallback(() => {
    setModalOpened(false);
  }, []);

  const loading = isLoading || isFetching;

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  const canAddTenant = data && data?.peopleAmount > data?.tenants.length;

  return (
    <>
      <VStack gap={32} className={classNames(cls.RoomWithTenants, {}, [className])} max>
        <HStack gap={24} align="center" max>
          <Text title={`${t('Room info')}: ${data?.number} ${data?.subNumber}`} />

          <RoleGuard roleNames={[RoleName.ADMIN]}>
            {canAddTenant ? (
              <Button variant="filled" onClick={onClickAddTenant}>
                {t('Add tenant')}
              </Button>
            ) : null}
          </RoleGuard>
        </HStack>

        <VStack gap={24} max>
          {data?.tenants.map((tenant) => (
            <UserCardWithDelete key={tenant.id} tenant={tenant} roomId={roomId} />
          ))}
        </VStack>
      </VStack>

      <AddNewTenantToRoomModal onClose={onModalClose} open={modalOpened} roomId={data?.id} />
    </>
  );
});
