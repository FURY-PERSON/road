import { EntityState } from '@reduxjs/toolkit';
import { User } from '@/entities/User';
import { SortOrder } from '@/shared/types/sort';
import { UsersRolesFilter, UsersSortFilter } from './usersPage';

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
  sort: UsersSortFilter
  role: UsersRolesFilter

  _inited?: boolean
}
