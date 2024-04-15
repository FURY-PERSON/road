import { Benefit } from '@/entities/Benefit';
import { Rebuke } from '@/entities/Rebuke';
import { ScientificWork } from '@/entities/ScientificWork';

export type StudentInfo = {
  id: string;
  budget: boolean;
  course: number;
  reputation: number;
  averageMark: string;
  blockSanitaryMark: string;
  rebukes: Rebuke[];
  scientificWorks: ScientificWork[];
  benefits: Benefit[];
};
