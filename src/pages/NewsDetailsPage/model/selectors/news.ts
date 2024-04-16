import { createSelector } from '@reduxjs/toolkit';

import { getNewsDetailsData } from '@/entities/News';
import { getUserData } from '@/entities/User';

export const getCanEditNews = createSelector(getUserData, getNewsDetailsData, (user, news) => {
  if (user?.id === news?.author.id) return true;
  return false;
});
