import { memo, FC, useCallback } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card as CardDeprecated, CardVariant } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { Notification } from '../../model/types/notification';

import cls from './NotificationItem.module.scss';
import clsR from './NotificationItem.redesigned.module.scss';

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
    <ToggleFeatures
      feature="newDesign"
      off={
        <CardDeprecated
          className={classNames(cls.NotificationItem, {}, [className])}
          variant={CardVariant.OUTLINED}
          onClick={onClickHandler}
        >
          <TextDeprecated title={item.title} text={item.mainText} size={TextSize.M} />

          {!item.readed ? <div className={cls.unread} /> : null}
        </CardDeprecated>
      }
      on={
        <Card className={classNames(clsR.NotificationItem, {}, [className])}>
          <Text size="M" title={item.title} text={item.mainText} />

          {!item.readed ? <div className={clsR.unread} /> : null}
        </Card>
      }
    />
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
