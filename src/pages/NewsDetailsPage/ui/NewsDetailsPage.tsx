import { NewsDetails } from 'entities/News';
import { AddNewCommentFormAsync, sendNewsComment } from 'features/AddNewComment';
import { fetchCommentsByNewsId, NewsDetailsCommentList } from 'features/NewsDetailsCommentList';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Text } from 'shared/ui/Text/Text';
import cls from './NewsDetailsPage.module.scss';

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
    <div className={cls.main}>
      <AppLink to={RoutePath[AppRoutes.NEWS_DETAILS]} className={cls.back}>{t('back to list')}</AppLink>

      <NewsDetails id={id} />

      <Text title={t('comments')} />

      <AddNewCommentFormAsync onSendComment={onNewsCommentSend} />
      <NewsDetailsCommentList newsId={id} className={cls.comments} />
    </div>
  );
};
