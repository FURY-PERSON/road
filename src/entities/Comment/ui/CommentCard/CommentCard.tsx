import { memo, FC } from 'react';

import { routes } from '@/shared/constant/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { Comment } from '../../model/types/comment';

import cls from './CommentCard.module.scss';
import clsR from './CommentCard.redesigned.module.scss';

interface CommentCardProps {
  className?: string;
  comment: Comment;
}

export const CommentCard: FC<CommentCardProps> = memo((props) => {
  const { className, comment } = props;

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.CommentCard, {}, [className])}>
          <AppLinkDeprecated to={routes.profile(comment.author?.login)} className={cls.header}>
            {/*         <Avatar size={30} src={comment.author.imageUrl} /> */}
            <TextDeprecated size={TextSize.L} title={comment.author?.login} />
          </AppLinkDeprecated>

          <TextDeprecated
            className={cls.title}
            size={TextSize.L}
            title={comment.title}
            text={comment.subTitle}
          />
          <TextDeprecated className={cls.text} size={TextSize.M} text={comment.mainText} />
        </div>
      }
      on={
        <Card
          padding="24"
          border="round"
          fullWidth
          className={classNames(clsR.CommentCard, {}, [className])}
        >
          <VStack gap={8} max>
            <AppLink to={routes.profile(comment.author?.login)}>
              <HStack gap={8}>
                {/*                 {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null} */}
                <Text title={comment.author?.login} bold size="L" />
              </HStack>
            </AppLink>

            <Text text={comment.mainText} size="M" />
          </VStack>
        </Card>
      }
    />
  );
});
