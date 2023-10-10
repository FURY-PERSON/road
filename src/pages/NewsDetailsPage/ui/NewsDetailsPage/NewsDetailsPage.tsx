import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { NewsDetails } from '@/entities/News';
import { AddNewCommentFormAsync, sendNewsComment } from '@/features/AddNewComment';
import { fetchCommentsByNewsId, NewsDetailsCommentList } from '@/features/NewsDetailsCommentList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page/Page';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { NewsRecommendationList } from '@/features/NewsRecommendationList';
import { NewsRatingAsync } from '@/features/NewsRating';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { NewsDetailsPageHeader } from '../NewsDetailsPageHeader/NewsDetailsPageHeader';
import { NewsDetailsContainer } from '../NewsDetailsContainer/NewsDetailsContainer';
import { NewsAdditionalInfoContainer } from '../NewsAdditionalInfoContainer/NewsAdditionalInfoContainer';

import cls from './NewsDetailsPage.module.scss';

export const NewsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
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
    <ToggleFeatures
      feature="newDesign"
      off={
        <Page className={cls.main} testId="NewsDetailsPage">
          <NewsDetailsPageHeader />

          <NewsDetails id={id} />

          <NewsRatingAsync className={cls.rating} newsId={id} />

          <TextDeprecated className={cls.commentsTitle} title={t('comments')} />
          <AddNewCommentFormAsync
            onSendComment={onNewsCommentSend}
            testId="NewsDetailsPage.AddNewCommentFormAsync"
          />
          <NewsDetailsCommentList
            newsId={id}
            className={cls.comments}
            testId="NewsDetailsPage.NewsDetailsCommentList"
          />

          <TextDeprecated className={cls.recommendationsTitle} title={t('recommendations')} />
          <NewsRecommendationList
            className={cls.recommendations}
            testId="NewsDetailsPage.NewsRecommendationList"
          />
        </Page>
      }
      on={
        <StickyContentLayout
          content={
            <Page className={classNames(cls.ArticleDetailsPage, {}, [])}>
              <VStack gap={16} max>
                <NewsDetailsContainer newsId={id} />

                <NewsRatingAsync className={cls.rating} newsId={id} />

                <Text className={cls.commentsTitle} title={t('comments')} />
                <AddNewCommentFormAsync
                  onSendComment={onNewsCommentSend}
                  testId="NewsDetailsPage.AddNewCommentFormAsync"
                />
                <NewsDetailsCommentList
                  newsId={id}
                  className={cls.comments}
                  testId="NewsDetailsPage.NewsDetailsCommentList"
                />

                <Text className={cls.recommendationsTitle} title={t('recommendations')} />
                <NewsRecommendationList
                  className={cls.recommendations}
                  testId="NewsDetailsPage.NewsRecommendationList"
                />
              </VStack>
            </Page>
          }
          right={<NewsAdditionalInfoContainer />}
        />
      }
    />
  );
};
