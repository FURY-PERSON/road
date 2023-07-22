import { RoleName } from '@/entities/Role';
import { RoutePath } from '@/shared/constant/router';
import React from 'react';

type Routes = keyof typeof RoutePath;

export interface ISidebarItem {
  path: typeof RoutePath[Routes];
  text: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  roles?: Array<RoleName>
}
