import { NewsDetails } from 'entities/News';
import { AddNewCommentFormAsync, CommentEntityType, sendNewsComment } from 'features/AddNewComment';
import { fetchCommentsByNewsId, NewsDetailsCommentList } from 'features/NewsDetailsCommentList';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from 'shared/ui/Text/Text';
import cls from './NewsDetailsPage.module.scss';

export const NewsDetailsPage = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('news');
  const dispatch = useAppDispatch();

  const onNewsCommentSend = useCallback(async () => {
    if (!id) return;

    await dispatch(sendNewsComment({ id: id }));
    dispatch(fetchCommentsByNewsId(id))
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
      <NewsDetails id={id} />

      <Text title={t('comments')} />

      <AddNewCommentFormAsync onSendComment={onNewsCommentSend} />
      <NewsDetailsCommentList newsId={id} className={cls.comments} />
    </div>
  );
};
