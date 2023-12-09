import { Suspense, lazy } from 'react';

import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

import { NewsRatingProps } from './NewsRating';

const NewsRatingLazy = lazy(() =>
  import('./NewsRating').then((module) => ({ default: module.NewsRating }))
);

export const NewsRatingAsync = (props: NewsRatingProps) => (
  <Suspense fallback={<Skeleton width="100%" height={120} />}>
    <NewsRatingLazy {...props} />
  </Suspense>
);
