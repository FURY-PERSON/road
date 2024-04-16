import { ScientificWorkType } from '../constants/scientificWork';

export interface ScientificWork {
  id: string;
  title: string;
  type: ScientificWorkType;
  date: string;
}
