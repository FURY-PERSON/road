import { FC, memo, useMemo } from 'react';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { useGetAllUsers } from '@/entities/User/api/userApi';
import { SettlementProcessState } from '@/entities/SettlementProcess/models/types/settlementProcess';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { useGetStudentSettlements } from '../../api/studentSettlementApi';
import { StudentSettlementCard } from '../StudentSettlementCard/StudentSettlementCard';
import { initStudentSettlement } from '../../model/services/initStudentSettlement/initStudentSettlement';

export interface StudentSettlementListProps {
  settlementProcessState: SettlementProcessState;
}

export const StudentSettlementList: FC<StudentSettlementListProps> = memo((props) => {
  const { settlementProcessState } = props;

  const dispatch = useAppDispatch();

  const { data: studentSettlements } = useGetStudentSettlements();
  const { data: users } = useGetAllUsers();

  const usersById = useMemo(() => new Map(users?.map((user) => [user.id, user])), [users]);

  useInitialEffect(() => {
    dispatch(initStudentSettlement());
  });

  return (
    <VStack gap={24}>
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
