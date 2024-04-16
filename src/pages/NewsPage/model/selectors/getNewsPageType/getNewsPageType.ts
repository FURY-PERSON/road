import { StateSchema } from '@/app/providers/StoreProvider';
import { NewsType } from '@/entities/News';

export const getNewsPageType = (state: StateSchema) => state.newsPage?.type || NewsType.ALL;
