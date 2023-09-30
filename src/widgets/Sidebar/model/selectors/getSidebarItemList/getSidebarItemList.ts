import { createSelector } from '@reduxjs/toolkit';

import ArticleIcon from '@/shared/assets/icons/article.svg';
import PenIcon from '@/shared/assets/icons/pen.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import UsersIcon from '@/shared/assets/icons/users.svg';
import AvatarIcon from '@/shared/assets/icons/avatar.svg';
import BookIconDeprecated from '@/shared/assets/icons/book.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import NewsIconDeprecated from '@/shared/assets/icons/news.svg';
import i18n from '@/shared/config/i18n/i18n';
import { getUserData } from '@/entities/User';
import { RoleName } from '@/entities/Role';
import { routes } from '@/shared/constant/router';
import { toggleFeatures } from '@/shared/lib/helpers/features/helpers/toggleFeatureFlag';

import { ISidebarItem } from '../../types/item';

export const getSidebarItemList = createSelector<any, ISidebarItem[]>(getUserData, (userData) => {
  const items: ISidebarItem[] = [
    {
      path: routes.main(),
      Icon: toggleFeatures({
        name: 'newDesign',
        off: () => MainIcon,
        on: () => MainIcon
      }),
      text: i18n.t('to main')
    },
    {
      path: routes.about(),
      Icon: toggleFeatures({
        name: 'newDesign',
        off: () => BookIconDeprecated,
        on: () => AboutIcon
      }),
      text: i18n.t('to about')
    }
  ];

  if (userData) {
    items.push(
      {
        path: routes.users(),
        Icon: toggleFeatures({
          name: 'newDesign',
          off: () => ProfileIconDeprecated,
          on: () => UsersIcon
        }),
        text: i18n.t('to users'),
        roles: [RoleName.ADMIN]
      },
      {
        path: routes.profile(userData.login),
        Icon: toggleFeatures({
          name: 'newDesign',
          off: () => ProfileIconDeprecated,
          on: () => AvatarIcon
        }),
        text: i18n.t('to profile')
      },
      {
        path: routes.news(),
        Icon: toggleFeatures({
          name: 'newDesign',
          off: () => NewsIconDeprecated,
          on: () => ArticleIcon
        }),
        text: i18n.t('to news')
      },
      {
        path: routes.newsCreate(),
        Icon: toggleFeatures({
          name: 'newDesign',
          off: () => NewsIconDeprecated,
          on: () => PenIcon
        }),
        text: i18n.t('create news'),
        roles: [RoleName.ADMIN]
      }
    );
  }

  return items;
});
