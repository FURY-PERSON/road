import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import BookIcon from 'shared/assets/icons/book.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

type Routes = keyof typeof RoutePath;

export interface ISidebarItem {
  path: typeof RoutePath[Routes];
  text: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export const getSidebarItemList = (userLogin?: string):ISidebarItem[] => [
  {
    path: RoutePath.main,
    Icon: HomeIcon,
    text: 'to main',
  },
  {
    path: RoutePath.about,
    Icon: BookIcon,
    text: 'to about',
  },
  {
    path: `${RoutePath.profile}/${userLogin}`,
    Icon: ProfileIcon,
    text: 'to profile',
  },
];
