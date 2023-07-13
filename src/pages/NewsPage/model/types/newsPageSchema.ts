import { EntityState } from '@reduxjs/toolkit';
import { News, NewsListVariant, NewsSort } from '@/entities/News';
import { NewsType } from '@/entities/News/model/types/news';
import { SortOrder } from '@/shared/types/sort';

export interface NewsPageSchema extends EntityState<News> {
  isLoading?: boolean,
  error?: string,
  view: NewsListVariant

  // api
  page: number;
  limit: number;
  hasMore: boolean

  // filters
  order: SortOrder
  sort: NewsSort
  search?: string 
  type: NewsType

  _inited?: boolean
}
