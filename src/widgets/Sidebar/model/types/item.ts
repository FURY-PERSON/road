import React from 'react';
import { RoleName } from '@/entities/Role';

export interface ISidebarItem {
  path: string;
  text: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  roles?: Array<RoleName>
}
