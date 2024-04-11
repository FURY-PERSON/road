import { SettlementProcessState } from '../constants/settlementProcess';

export interface SettlementProcess {
  id: string;
  state: SettlementProcessState;
  startDate: string;
  finishDate?: string | null;
}
