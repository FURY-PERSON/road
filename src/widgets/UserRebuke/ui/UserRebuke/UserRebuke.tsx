import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';
import { AddRebukeModal } from '@/features/AddRebukeModal';
import { EditRebukeModal } from '@/features/EditRebukeModal';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { RebukeCard } from '@/entities/Rebuke';

import { useUserRebuke } from '../../model/hooks/useUserRebuke';
import { RebukeActionPanel } from '../RebukeActionPanel/RebukeActionPanel';

import cls from './UserRebuke.module.scss';

interface UserRebukeProps {
  className?: string;
  login?: string;
}

export const UserRebuke: FC<UserRebukeProps> = memo((props) => {
  const { className, login } = props;

  const { t } = useTranslation();

  const {
    userRebukes,
    loading,
    error,
    isAddModalOpen,
    isEditModalOpen,
    editableRebukeId,
    deleteRebuke,
    closeAddRebuke,
    closeEditRebuke,
    openAddRebuke,
    openEditRebuke
  } = useUserRebuke(login);

  const getContent = useCallback(() => {
    if (!userRebukes?.length) {
      return <Text size="M" variant="accent" bold title={t('no rebukes')} />;
    }

    return (
      <VStack gap={16} max>
        {userRebukes?.map((item) => (
          <RebukeCard item={item} className={cls.card}>
            <RoleGuard roleNames={[RoleName.ADMIN]}>
              <RebukeActionPanel
                id={item.id}
                openEditRebuke={openEditRebuke}
                deleteRebuke={deleteRebuke}
              />
            </RoleGuard>
          </RebukeCard>
        ))}
      </VStack>
    );
  }, [deleteRebuke, openEditRebuke, userRebukes]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  return (
    <Card padding="24" max className={classNames(cls.UserRebuke, {}, [className])}>
      <VStack gap={16} max>
        <Text size="L" bold title={t('rebuke')} />

        {getContent()}
      </VStack>

      <RoleGuard roleNames={[RoleName.ADMIN]}>
        <Button className={cls.addButton} onClick={openAddRebuke}>
          <PlusIcon className={cls.addIcon} />
        </Button>
      </RoleGuard>

      <AddRebukeModal open={isAddModalOpen} onClose={closeAddRebuke} login={login} />

      <EditRebukeModal
        rebukeId={editableRebukeId}
        login={login}
        open={isEditModalOpen}
        onClose={closeEditRebuke}
      />
    </Card>
  );
});
