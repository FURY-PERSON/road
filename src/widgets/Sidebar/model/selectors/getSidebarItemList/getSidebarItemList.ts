import { StateSchema } from 'app/providers/StoreProvider';
import HomeIcon from 'shared/assets/icons/home.svg';
import BookIcon from 'shared/assets/icons/book.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import NewsIcon from 'shared/assets/icons/news.svg';
import i18n from 'shared/config/i18n/i18n';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { createSelector } from '@reduxjs/toolkit';
import { getUserData } from 'entities/User';
import { ISidebarItem } from '../../types/item';

export const getSidebarItemList = createSelector<any, ISidebarItem[]>(
  getUserData,
  (userData) => {
    const items = [
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
    ];

    if (userData) {
      items.push(
        {
          path: `${RoutePath.profile}${userData?.login}`,
          Icon: ProfileIcon,
          text: i18n.t('to profile'),
        },
        {
          path: RoutePath.news,
          Icon: NewsIcon,
          text: i18n.t('to news'),
        },
      );
    }

    return items;
  }, 
);