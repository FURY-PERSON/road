import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { StudentSettlement, StudentSettlementCard } from '@/entities/StudentSettlement';

import { useStudentSettlementByProcess } from '../../model/hooks/useStudentSettlementByProcess';

import cls from './StudentSettlementByProcess.module.scss';

interface StudentSettlementByProcessProps {
  className?: string;
  settlementProcessId: string;
}

export const StudentSettlementByProcess: FC<StudentSettlementByProcessProps> = (props) => {
  const { className, settlementProcessId } = props;

  const { t } = useTranslation();
  const { studentSettlements, loading, error, settlementProcess, users } =
    useStudentSettlementByProcess(settlementProcessId);

  const getStudentSettlement = useCallback(
    (item: StudentSettlement) => {
      if (!settlementProcess?.state) return null;

      const user = users?.filter((user) => user.id === item.student.id)[0];

      return (
        <StudentSettlementCard
          settlementInfo={item}
          settlementProcessState={settlementProcess?.state}
          user={user}
        />
      );
    },
    [settlementProcess?.state, users]
  );

  if (loading) {
    return <SvgLoader />;
  }

  if (error) {
    return <Text variant="error" text={String(error)} />;
  }

  return (
    <VStack gap={8} className={classNames(cls.SettlementProcessInfo, {}, [className])}>
      <Text title={t('student settlements list')} />

      {studentSettlements?.length ? (
        studentSettlements?.map((item) => getStudentSettlement(item))
      ) : (
        <Text text={t('no items')} variant="accent" />
      )}
    </VStack>
  );
};
