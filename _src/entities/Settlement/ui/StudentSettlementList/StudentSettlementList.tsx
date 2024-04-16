import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { useGetAllUsers } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { StudentSettlementCard } from '../StudentSettlementCard/StudentSettlementCard';
import { initStudentSettlement } from '../../model/services/initStudentSettlement/initStudentSettlement';
import { useGetStudentSettlementsByProcess } from '../../api/studentSettlementApi';
import { SettlementProcessState } from '../../model/constants/settlementProcess';

export interface StudentSettlementListProps {
  settlementProcessState: SettlementProcessState;
  processId: string;
}

export const StudentSettlementList: FC<StudentSettlementListProps> = memo((props) => {
  const { settlementProcessState, processId } = props;

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { data: studentSettlements } = useGetStudentSettlementsByProcess({ processId });
  const { data: users } = useGetAllUsers();

  const usersById = useMemo(() => new Map(users?.map((user) => [user.id, user])), [users]);

  useInitialEffect(() => {
    dispatch(initStudentSettlement());
  });

  if (!studentSettlements?.length) {
    return (
      <VStack gap={24}>
        <Text title={t('student settlements list')} />

        <Text text={t('no items')} />
      </VStack>
    );
  }

  return (
    <VStack gap={24}>
      <Text title={t('student settlements list')} />

      {studentSettlements?.map((settlement) => (
        <StudentSettlementCard
          settlementProcessState={settlementProcessState}
          settlementInfo={settlement}
          user={usersById.get(settlement.student.id)}
          key={settlement.student.id}
        />
      ))}
    </VStack>
  );
});
