import { createSelector } from '@reduxjs/toolkit';
import { getUserData } from '../getUserData/getUserData';

export const getUserAuthData = createSelector(
  getUserData,
  (user) => user.authData,
); 
