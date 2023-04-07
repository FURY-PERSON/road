import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgLoader } from 'shared/ui/SvgLoader';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

import cls from './CommentList.module.scss';

export interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean
}

export const CommentList:FC<CommentListProps> = memo((props) => {
  const { comments, isLoading } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <SvgLoader />
    );
  }

  if (!comments || !comments?.length) {
    return (
      <Text text={t('there are no comments')} />
    );
  }

  return (
    <>
      {comments.map((comment) => <CommentCard className={cls.comment} key={comment.id} comment={comment} />)}
    </>
  );
});
