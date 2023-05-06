import { News } from './news';

export interface NewsDetailsSchema {
  isLoading?: boolean;
  error?: string;

  data?: News
}
