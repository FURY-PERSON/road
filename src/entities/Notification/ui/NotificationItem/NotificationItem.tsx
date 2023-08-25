import { memo, FC, useCallback } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card, CardVariant } from '@/shared/ui/Card/Card';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

import { Notification } from '../../model/types/notification';

import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item: Notification;
  onClick?: (item: Notification) => void;
}

export const NotificationItem: FC<NotificationItemProps> = memo((props) => {
  const { className, item, onClick } = props;

  const onClickHandler = useCallback(() => {
    onClick?.(item);
  }, [onClick, item]);

  const content = (
    <Card
      className={classNames(cls.NotificationItem, {}, [className])}
      variant={CardVariant.OUTLINED}
      onClick={onClickHandler}
    >
      <Text title={item.title} text={item.mainText} size={TextSize.M} />

      {!item.readed ? <div className={cls.unread} /> : null}
    </Card>
  );

  if (item.link) {
    return (
      <AppLink className={cls.link} to={item.link} target="_blank">
        {content}
      </AppLink>
    );
  }

  return content;
});
