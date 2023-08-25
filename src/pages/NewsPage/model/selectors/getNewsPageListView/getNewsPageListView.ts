import { StateSchema } from '@/app/providers/StoreProvider';
import { NewsListVariant } from '@/entities/News';

export const getNewsPageListView = (state: StateSchema) =>
  state.newsPage?.view || NewsListVariant.LIST;
