import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment: Comment
}

export const CommentCard:FC<CommentCardProps> = memo((props) => {
  const { className, comment } = props;

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {/*         <Avatar size={30} src={comment.author.imageUrl}/> */}
        <Text size={TextSize.L} title={comment.author?.login} />
      </div>

      <Text className={cls.title} size={TextSize.L} title={comment.title} text={comment.subTitle} />
      <Text className={cls.text} size={TextSize.M} text={comment.mainText} />
    </div>
  );
});
