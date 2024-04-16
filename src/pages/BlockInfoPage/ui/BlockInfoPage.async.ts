import { lazy } from 'react';

export const BlockInfoPageAsync = lazy(() =>
  import('./BlockInfoPage').then((module) => ({ default: module.BlockInfoPage }))
);
