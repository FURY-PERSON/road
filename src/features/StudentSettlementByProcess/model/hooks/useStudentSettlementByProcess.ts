import { useGetSettlementProcessById } from '@/entities/SettlementProcess';
import { useGetStudentSettlementsByProcess } from '@/entities/StudentSettlement';
import { useGetAllUsers } from '@/entities/User';

export const useStudentSettlementByProcess = (settlementProcessId: string) => {
  const {
    data: studentSettlements,
    isLoading: studentSettlementsLoading,
    isFetching: studentSettlementsFetching,
    error: studentSettlementsError
  } = useGetStudentSettlementsByProcess({
    processId: settlementProcessId
  });
  const {
    data: settlementProcess,
    isLoading: settlementProcessLoading,
    isFetching: settlementProcessFetching,
    error: settlementProcessError
  } = useGetSettlementProcessById({ id: settlementProcessId });

  const { data: users } = useGetAllUsers();

  const loading =
    studentSettlementsLoading ||
    studentSettlementsFetching ||
    settlementProcessLoading ||
    settlementProcessFetching;

  const error = studentSettlementsError && settlementProcessError;

  return {
    studentSettlements,
    settlementProcess,
    users,
    loading,
    error
  };
};
