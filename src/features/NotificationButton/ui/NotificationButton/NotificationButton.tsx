import { memo, FC, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import {
  Notification, NotificationList, markNotificationAsRead, useGetNotifications, 
} from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Popover } from 'shared/ui/popups';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './NotificationButton.module.scss';
import { getUnreadMessagesAmount } from '../../model/selectors/notificationButton';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton:FC<NotificationButtonProps> = memo((props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const {
    data, isLoading, error, 
  } = useGetNotifications(null, {
    pollingInterval: 15000,
  });

  const unreadNotificationsAmount = useSelector(getUnreadMessagesAmount(data));

  const onNotificationItemClick = useCallback((notification: Notification) => {
    dispatch(markNotificationAsRead(notification));
  }, []);

  return (
    <Popover
      direction="bottom left"
      className={classNames(cls.NotificationButton, {}, [className])}
      panelClassName={cls.popover}
      trigger={(
        <Button className={cls.notificationButton} variant={ButtonVariant.CLEAR}>
          <NotificationIcon className={cls.notificationIcon} />

          {unreadNotificationsAmount 
            ? <div className={cls.unreadAmount}>{unreadNotificationsAmount}</div>
            : null}
        </Button> 
      )}
    >
      <NotificationList items={data} isLoading={isLoading} onItemClick={onNotificationItemClick} />
    </Popover>
  );
});
