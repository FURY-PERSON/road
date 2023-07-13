import {
  memo, FC, useCallback, useState, 
} from 'react';
import { useSelector } from 'react-redux';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  Notification, NotificationList, markNotificationAsRead, useGetNotifications, 
} from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Popover } from '@/shared/ui/popups';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
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
  const [drawerOpened, setDrawerOpened] = useState(false);

  const onNotificationItemClick = useCallback((notification: Notification) => {
    dispatch(markNotificationAsRead(notification));
  }, []);

  const onButtonClick = useCallback(() => {
    setDrawerOpened(true);
  }, [setDrawerOpened]);

  const onDrawerClose = useCallback(() => {
    setDrawerOpened(false);
  }, [setDrawerOpened]);

  const trigger = (
    <Button className={cls.notificationButton} onClick={onButtonClick} variant={ButtonVariant.CLEAR}>
      <NotificationIcon className={cls.notificationIcon} />

      {unreadNotificationsAmount 
        ? <div className={cls.unreadAmount}>{unreadNotificationsAmount}</div>
        : null}
    </Button> 
  );

  return (
    <>
      <BrowserView>
        <Popover
          direction="bottom left"
          className={classNames(cls.NotificationButton, {}, [className])}
          panelClassName={cls.popover}
          trigger={trigger}
        >
          <NotificationList items={data} isLoading={isLoading} onItemClick={onNotificationItemClick} />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}
        <Drawer isOpen={drawerOpened} onClose={onDrawerClose}> 
          <NotificationList items={data} isLoading={isLoading} onItemClick={onNotificationItemClick} />
        </Drawer>
      </MobileView>
    </>
  );
});
