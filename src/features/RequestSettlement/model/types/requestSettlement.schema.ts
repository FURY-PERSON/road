import { Benefit } from '@/entities/Benefit';

export interface RequestSettlementSchema {
  benefits: Benefit[];
  targetDormId?: string | null;
}
