import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { NewsDetails } from '@/entities/News';
import { AddNewCommentFormAsync, sendNewsComment } from '@/features/AddNewComment';
import { fetchCommentsByNewsId, NewsDetailsCommentList } from '@/features/NewsDetailsCommentList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page/Page';
import { Text } from '@/shared/ui/Text/Text';
import { NewsRecommendationList } from '@/features/NewsRecommendationList';
import cls from './NewsDetailsPage.module.scss';
import { NewsDetailsPageHeader } from '../NewsDetailsPageHeader/NewsDetailsPageHeader';
import { NewsRating, NewsRatingAsync } from '@/features/NewsRating';

export const NewsDetailsPage = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('news');
  const dispatch = useAppDispatch();

  const onNewsCommentSend = useCallback(async () => {
    if (!id) return;

    await dispatch(sendNewsComment({ id: id }));
    dispatch(fetchCommentsByNewsId(id));
  }, [dispatch, id]);

  if (!id) {
    return (
      <div className={cls.notFound}>
        <div className={cls.notFound__text}>{t('news not found')}</div>
      </div>
    );
  }

  return (
    <Page className={cls.main}>
      <NewsDetailsPageHeader />
      
      <NewsDetails id={id} />

      <NewsRatingAsync className={cls.rating} newsId={id} />

      <Text className={cls.commentsTitle} title={t('comments')} />
      <AddNewCommentFormAsync onSendComment={onNewsCommentSend} />
      <NewsDetailsCommentList newsId={id} className={cls.comments} />

      <Text className={cls.recommendationsTitle} title={t('recommendations')} />
      <NewsRecommendationList className={cls.recommendations} />
    </Page>
  );
};
