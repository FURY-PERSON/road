import { lazy } from 'react';

export const NewsDetailsPageAsync = lazy(() =>
  import('./NewsDetailsPage').then((module) => ({ default: module.NewsDetailsPage }))
);
