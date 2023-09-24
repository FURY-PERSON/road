import { StateSchema } from '@/app/providers/StoreProvider';
import { NewsSort } from '@/entities/News';

export const getNewsPageSort = (state: StateSchema) => state.newsPage?.sort || NewsSort.CREATED;
