import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ScientificWorkCard } from '@/entities/ScientificWork';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';
import { AddScientificWorkModal } from '@/features/AddScientificWorkModal';
import { EditScientificWorkModal } from '@/features/EditScientificWorkModal';
import PlusIcon from '@/shared/assets/icons/plus.svg';

import { useUserScientificWork } from '../../model/hooks/useUserScientificWork';
import { ScientificWorkActionPanel } from '../ScientificWorkActionPanel/ScientificWorkActionPanel';

import cls from './UserScientificWork.module.scss';

export interface UserScientificWorkProps {
  className?: string;
  login?: string;
}

export const UserScientificWork: FC<UserScientificWorkProps> = memo((props) => {
  const { className, login } = props;

  const { t } = useTranslation();

  const {
    userScientificWorks,
    loading,
    error,
    isAddModalOpen,
    isEditModalOpen,
    editableScientificWorkId,
    deleteScientificWork,
    closeAddScientificWork,
    closeEditScientificWork,
    openAddScientificWork,
    openEditScientificWork
  } = useUserScientificWork(login);

  const getContent = useCallback(() => {
    if (!userScientificWorks?.length) {
      return <Text size="M" variant="accent" bold title={t('no scientific work')} />;
    }

    return (
      <VStack gap={16} max>
        {userScientificWorks?.map((item) => (
          <ScientificWorkCard item={item} className={cls.card}>
            <ScientificWorkActionPanel
              id={item.id}
              openEditScientificWork={openEditScientificWork}
              deleteScientificWork={deleteScientificWork}
            />
          </ScientificWorkCard>
        ))}
      </VStack>
    );
  }, [deleteScientificWork, openEditScientificWork, userScientificWorks]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  return (
    <Card padding="24" max className={classNames(cls.UserScientificWork, {}, [className])}>
      <VStack gap={16} max>
        <Text size="L" bold title={t('scientific work')} />

        {getContent()}
      </VStack>

      <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
        <Button className={cls.addButton} onClick={openAddScientificWork}>
          <PlusIcon className={cls.addIcon} />
        </Button>
      </RoleGuard>

      <AddScientificWorkModal
        open={isAddModalOpen}
        onClose={closeAddScientificWork}
        login={login}
      />

      <EditScientificWorkModal
        scientificWorkId={editableScientificWorkId}
        login={login}
        open={isEditModalOpen}
        onClose={closeEditScientificWork}
      />
    </Card>
  );
});
