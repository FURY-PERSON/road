import { AppRoutes } from '@/shared/constant/router';

export type ScrollSchema = OptionalRecord<AppRoutes, number>

export interface SaveScrollSchema {
  scroll: ScrollSchema
}
