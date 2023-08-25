import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { RatingCard, useCreateNewsFeedback, useGetNewsFeedback } from '@/entities/Feedback';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface NewsRatingProps {
  className?: string;
  newsId: string;
}

export const NewsRating: FC<NewsRatingProps> = memo((props) => {
  const { className, newsId } = props;
  const { t } = useTranslation();

  const { data, isLoading, isFetching, error } = useGetNewsFeedback({
    newsId: newsId
  });

  const [createFeedback] = useCreateNewsFeedback();

  const onAccept = useCallback(
    (rating: number, feedbackText?: string) => {
      createFeedback({
        newsId: newsId,
        rating: rating,
        text: feedbackText
      });
    },
    [newsId]
  );

  const onCancel = useCallback(
    (rating: number) => {
      createFeedback({
        newsId: newsId,
        rating: rating
      });
    },
    [newsId]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <RatingCard
      title={data?.rating ? t('thanks for the feedback') : t('rate news')}
      className={className}
      hasFeedback
      feedbackTitle={t('leave your feedback about the news')}
      rate={data?.rating}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
});
