import { FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { StudentSettlementList } from '@/entities/Settlement';

import { useStudentSettlementByProcess } from '../../model/hooks/useStudentSettlementByProcess';

import cls from './StudentSettlementByProcess.module.scss';

interface StudentSettlementByProcessProps {
  className?: string;
  settlementProcessId: string;
}

export const StudentSettlementByProcess: FC<StudentSettlementByProcessProps> = (props) => {
  const { className, settlementProcessId } = props;

  const { loading, error, settlementProcess } = useStudentSettlementByProcess(settlementProcessId);

  if (loading) {
    return <SvgLoader className={cls.loader} />;
  }

  if (error) {
    return <Text variant="error" text={String(error)} />;
  }

  if (!settlementProcess?.state) {
    return null;
  }

  return (
    <VStack gap={8} className={classNames(cls.SettlementProcessInfo, {}, [className])}>
      <StudentSettlementList
        processId={settlementProcessId}
        settlementProcessState={settlementProcess?.state}
      />
    </VStack>
  );
};
