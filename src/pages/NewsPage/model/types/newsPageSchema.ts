import { EntityState } from '@reduxjs/toolkit';
import { News, NewsListVariant } from 'entities/News';

export interface NewsPageSchema extends EntityState<News> {
  isLoading?: boolean,
  error?: string,
  view: NewsListVariant
}
