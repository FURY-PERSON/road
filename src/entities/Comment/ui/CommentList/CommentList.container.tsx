import { memo, FC } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { CommentList, CommentListProps } from './CommentList';
import cls from './CommentList.module.scss';

export const CommentListContainer:FC<CommentListProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.CommentList, {}, [className])} data-testId="CommentListContainer">
      <CommentList {...props} />
    </div>
  );
});
