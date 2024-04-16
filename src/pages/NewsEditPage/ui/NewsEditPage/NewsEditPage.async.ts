import { lazy } from 'react';

export const NewsEditPageAsync = lazy(() =>
  import('./NewsEditPage').then((module) => ({ default: module.NewsEditPage }))
);
