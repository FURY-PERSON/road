import { BlockSanitaryEntity } from '../constants/sanitaryVisit';

import { Block } from './block';

export interface SanitaryVisitMark {
  id: string;
  type: BlockSanitaryEntity;
  name: string;
  mark: number | null;
}

export interface SanitaryVisit {
  id: string;
  date: string;
  block: Block;
  marks: SanitaryVisitMark[];
}
