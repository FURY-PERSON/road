import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsDetailsError = (state: StateSchema) => state.newsDetails?.error;
