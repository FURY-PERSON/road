import { memo, FC, useCallback } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { User, UserCard } from '@/entities/User';
import DeleteIcon from '@/shared/assets/icons/cross.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteUserFromRoom, refetchRoomInfo } from '@/entities/Room';
import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';

import cls from './UserCardWithDelete.module.scss';

interface UserCardWithDeleteProps {
  className?: string;
  tenant: User;
  roomId: string;
}

export const UserCardWithDelete: FC<UserCardWithDeleteProps> = memo((props) => {
  const { className, tenant, roomId } = props;

  const dispatch = useAppDispatch();

  const onDeletePress = useCallback(async () => {
    try {
      await dispatch(deleteUserFromRoom({ roomId: roomId, userLogin: tenant.login }));

      dispatch(refetchRoomInfo);
    } catch (error) {
      alert(error);
    }
  }, [roomId, tenant.login]);

  return (
    <HStack className={classNames(cls.UserCardWithDelete, {}, [className])} max justify="between">
      <UserCard key={tenant.id} className={cls.userCard} user={tenant} />

      <RoleGuard roleNames={[RoleName.ADMIN]}>
        <DeleteIcon className={cls.delete} onClick={onDeletePress} width={24} height={24} />
      </RoleGuard>
    </HStack>
  );
});
