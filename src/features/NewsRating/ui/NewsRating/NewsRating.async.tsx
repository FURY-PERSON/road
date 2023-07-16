import { Suspense, lazy } from 'react';
import { NewsRatingProps } from './NewsRating';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

const NewsRatingLazy = lazy(() => import('./NewsRating').then((module) => ({ default: module.NewsRating })));

export const NewsRatingAsync = (props: NewsRatingProps) => (
  <Suspense fallback={<Skeleton width="100%" height={120} />}>
    <NewsRatingLazy {...props} />
  </Suspense>
);
