import { AppRoutes } from 'shared/config/routeConfig/routeConfig';

export type ScrollSchema = OptionalRecord<AppRoutes, number>

export interface SaveScrollSchema {
  scroll: ScrollSchema
}
