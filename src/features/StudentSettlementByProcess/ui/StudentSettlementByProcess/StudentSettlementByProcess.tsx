import { FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { StudentSettlementCard } from '@/entities/StudentSettlement/ui/StudentSettlementCard/StudentSettlementCard';
import { SettlementProcessState } from '@/entities/SettlementProcess';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';

import { useStudentSettlementByProcess } from '../../model/hooks/useStudentSettlementByProcess';

import cls from './StudentSettlementByProcess.module.scss';

interface StudentSettlementByProcessProps {
  className?: string;
  settlementProcessId: string;
}

export const StudentSettlementByProcess: FC<StudentSettlementByProcessProps> = (props) => {
  const { className, settlementProcessId } = props;

  const { studentSettlements, loading, error } = useStudentSettlementByProcess(settlementProcessId);

  if (loading) {
    return <SvgLoader />;
  }

  if (error) {
    return <Text variant="error" text={String(error)} />;
  }

  return (
    <VStack className={classNames(cls.SettlementProcessInfo, {}, [className])}>
      <Text title="Student settlements list" />

      {studentSettlements?.length ? (
        studentSettlements?.map((item) => (
          <StudentSettlementCard
            settlementInfo={item}
            settlementProcessState={SettlementProcessState.FINISHED}
          />
        ))
      ) : (
        <Text text="no items" variant="accent" />
      )}
    </VStack>
  );
};
