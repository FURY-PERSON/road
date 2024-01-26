import { memo, FC, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useGetBlockSanitaryVisits } from '@/entities/Block';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { AddSanitaryVisitModal } from '@/features/AddSanitaryVisitForm';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { getUserRoleName } from '@/entities/User';
import { RoleName } from '@/entities/Role';
import { RoleGuard } from '@/features/RoleGuard';

import { Skeleton } from '../Skeleton/Skeleton';
import { MarkCell } from '../MarkCell/MarkCell';
import { DateCell } from '../DateCell/DateCell';
import { FieldNameCell } from '../FieldNameCell/FieldNameCell';
import { getEverageMark } from '../../model/helpers/getEverageMark';

import cls from './BlockSanitaryCondition.module.scss';

interface BlockSanitaryConditionProps {
  className?: string;
  blockId: string;
}

export const BlockSanitaryCondition: FC<BlockSanitaryConditionProps> = memo((props) => {
  const { className, blockId } = props;

  const { t } = useTranslation('translation');

  const { data, isLoading, error } = useGetBlockSanitaryVisits({ blockId: blockId });

  const useRole = useSelector(getUserRoleName);

  const [openModal, setOpenModal] = useState(false);

  const onModalClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  const onCreateNewVisitClick = useCallback(() => {
    setOpenModal(true);
  }, []);

  const loading = isLoading;

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  return (
    <VStack className={classNames(cls.BlockSanitaryCondition, {}, [className])} gap={16}>
      <HStack className={cls.table}>
        <VStack>
          <div className={cls.emptyCell} />

          {data?.[0]?.marks.map((mark) => <FieldNameCell key={mark.type} name={mark.name} />)}
        </VStack>

        {data?.map((visit) => (
          <VStack key={visit.id}>
            <DateCell dateString={visit.date} />

            <VStack>
              {visit.marks.map((mark) => (
                <MarkCell key={mark.id} mark={mark} editable={useRole !== RoleName.STUDENT} />
              ))}
            </VStack>
          </VStack>
        ))}
      </HStack>

      <HStack gap={32} align="center">
        <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
          <Button onClick={onCreateNewVisitClick} variant="filled">
            {t('create new visit')}
          </Button>
        </RoleGuard>

        {data?.length ? (
          <Text title={`${t('Evarage')}: ${getEverageMark(data).toFixed(2)}`} />
        ) : null}
      </HStack>

      <AddSanitaryVisitModal open={openModal} onClose={onModalClose} blockId={blockId} />
    </VStack>
  );
});
