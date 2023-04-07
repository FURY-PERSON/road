import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

type Routes = keyof typeof RoutePath;

export interface ISidebarItem {
  path: typeof RoutePath[Routes];
  text: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}
