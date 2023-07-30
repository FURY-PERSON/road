import { createSelector } from '@reduxjs/toolkit';
import BookIcon from '@/shared/assets/icons/book.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import NewsIcon from '@/shared/assets/icons/news.svg';
import i18n from '@/shared/config/i18n/i18n';
import { getUserData } from '@/entities/User';
import { RoleName } from '@/entities/Role';
import { ISidebarItem } from '../../types/item';
import { routes } from '@/shared/constant/router';


export const getSidebarItemList = createSelector<any, ISidebarItem[]>(
  getUserData,
  (userData) => {
    const items: ISidebarItem[] = [
      {
        path: routes.about(),
        Icon: BookIcon,
        text: i18n.t('to about'),
      },
    ];

    if (userData) {
      items.push(
        {
          path: routes.users(),
          Icon: ProfileIcon,
          text: i18n.t('to users'),
          roles: [RoleName.ADMIN],
        },
        {
          path: routes.profile(userData.login),
          Icon: ProfileIcon,
          text: i18n.t('to profile'),
        },
        {
          path: routes.news(),
          Icon: NewsIcon,
          text: i18n.t('to news'),
        },
        {
          path: routes.newsCreate(),
          Icon: NewsIcon,
          text: i18n.t('create news'),
          roles: [RoleName.ADMIN],
        },
      );
    }

    return items;
  }, 
);
