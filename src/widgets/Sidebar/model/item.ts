import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import BookIcon from 'shared/assets/icons/book.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import NewsIcon from 'shared/assets/icons/news.svg';
import i18n from 'shared/config/i18n/i18n';

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
    text: i18n.t('to main'),
  },
  {
    path: RoutePath.about,
    Icon: BookIcon,
    text: i18n.t('to about'),
  },
  {
    path: `${RoutePath.profile}/${userLogin}`,
    Icon: ProfileIcon,
    text: i18n.t('to profile'),
  },
  {
    path: RoutePath.news,
    Icon: NewsIcon,
    text: i18n.t('to news'),
  },
];
