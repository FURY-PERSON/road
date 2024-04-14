import { lazy } from 'react';

export const DormsPageAsync = lazy(() =>
  import('./DormsPage').then((module) => ({ default: module.DormsPage }))
);
