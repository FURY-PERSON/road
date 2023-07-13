import { CommentList } from '@/entities/Comment';
import { getNewsDetailsError } from '@/entities/News/model/selectors/getNewsDetailsError/getNewsDetailsError';
import { getNewsDetailsLoading } from '@/entities/News/model/selectors/getNewsDetailsLoading/getNewsDetailsLoading';
import { memo, FC } from 'react';
import { useSelector } from 'react-redux';
import { getNewsDetailsComments } from '../model/slice/newsDetailsComments.slice';

import cls from './NewsDetailsCommentList.module.scss';

export interface NewsDetailsCommentListProps {
  className?: string;
  newsId: string
}

export const NewsDetailsCommentList:FC<NewsDetailsCommentListProps> = memo((props) => {
  const comments = useSelector(getNewsDetailsComments.selectAll);
  const isLoading = useSelector(getNewsDetailsLoading);
  const error = useSelector(getNewsDetailsError);

  return (
    <CommentList isLoading={isLoading} comments={comments} />
  );
});
