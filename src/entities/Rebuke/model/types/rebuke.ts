import { RebukeType } from '../constants/rebuke';

export interface Rebuke {
  id: string;
  type: RebukeType;
  note: string;
  startDate: string;
  endDate: string;
}
