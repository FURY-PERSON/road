import { lazy } from 'react';

export const ProfilePageAsync = lazy(() => import('./ProfilePage').then((module) => ({ default: module.ProfilePage })));
