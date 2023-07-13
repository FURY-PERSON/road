import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsDetailsCommentsError = (state: StateSchema) => state.newsDetailsComments?.error;
