import { lazy } from 'react';

export const BlocksPageAsync = lazy(() =>
  import('./BlocksPage').then((module) => ({ default: module.BlocksPage }))
);
