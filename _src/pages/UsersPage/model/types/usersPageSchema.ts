import { EntityState } from '@reduxjs/toolkit';

import { User, UsersRoles, UsersSort } from '@/entities/User';
import { SortOrder } from '@/shared/types/sort';

export interface UsersPageSchema extends EntityState<User> {
  isLoading?: boolean;
  error?: string;
  users?: User[];

  // api
  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: SortOrder;
  search?: string;
  sort: UsersSort;
  role: UsersRoles;

  _inited?: boolean;
}
