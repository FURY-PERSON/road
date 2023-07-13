import { StateSchema } from '@/app/providers/StoreProvider';

export const addCommentFormLoading = (state: StateSchema) => state.addCommentForm?.isLoading;
