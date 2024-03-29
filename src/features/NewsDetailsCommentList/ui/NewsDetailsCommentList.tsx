import { memo, FC } from 'react';
import { useSelector } from 'react-redux';

import { CommentList } from '@/entities/Comment';
import { getNewsDetailsError } from '@/entities/News/model/selectors/getNewsDetailsError/getNewsDetailsError';
import { getNewsDetailsLoading } from '@/entities/News/model/selectors/getNewsDetailsLoading/getNewsDetailsLoading';

import { getNewsDetailsComments } from '../model/slice/newsDetailsComments.slice';

export interface NewsDetailsCommentListProps {
  className?: string;
  newsId: string;
  testId?: string;
}

export const NewsDetailsCommentList: FC<NewsDetailsCommentListProps> = memo((props) => {
  const comments = useSelector(getNewsDetailsComments.selectAll);
  const isLoading = useSelector(getNewsDetailsLoading);
  const error = useSelector(getNewsDetailsError);

  return <CommentList isLoading={isLoading} comments={comments} />;
});
