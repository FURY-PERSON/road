import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsDetailsData = (state: StateSchema) => state.newsDetails?.data;
