import { Benefit } from '@/entities/Benefit';
import { Dorm } from '@/entities/Dorm';

export interface RequestSettlementSchema {
  benefits: Benefit[];
  targetDorm?: Dorm | null;

  dorms?: Dorm[];
}
