import { EntityState } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import { SortOrder } from 'shared/types/sort';

export interface UsersPageSchema extends EntityState<User> {
  isLoading?: boolean,
  error?: string,
  users?: User[]

  // api
  page: number;
  limit: number;
  hasMore: boolean

  // filters
  order: SortOrder
  search?: string 
/*   sort: NewsSort
  type: NewsType */

  _inited?: boolean
}
