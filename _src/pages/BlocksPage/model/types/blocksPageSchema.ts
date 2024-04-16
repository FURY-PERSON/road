import { EntityState } from '@reduxjs/toolkit';

import { SortOrder } from '@/shared/types/sort';
import { Block } from '@/entities/Block';

export interface BlocksPageSchema extends EntityState<Block> {
  isLoading?: boolean;
  error?: string;
  blocks?: Block[];

  // api
  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: SortOrder;
  number?: string;
  floor?: string;

  _inited?: boolean;
}
