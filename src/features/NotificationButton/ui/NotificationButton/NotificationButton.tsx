import { memo, FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  Notification,
  NotificationList,
  markNotificationAsRead,
  useGetNotifications
} from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification.svg';
import NotificationIcon from '@/shared/assets/icons/notificationRedesigned.svg';
import { Popover } from '@/shared/ui/redesigned/popups';
import { Button as ButtonDeprecated, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import { getUnreadMessagesAmount } from '../../model/selectors/notificationButton';

import cls from './NotificationButton.module.scss';
import clsR from './NotificationButton.redesigned.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo((props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetNotifications(null, {
    pollingInterval: 15000
  });

  const unreadNotificationsAmount = useSelector(getUnreadMessagesAmount(data));
  const [drawerOpened, setDrawerOpened] = useState(false);

  const onNotificationItemClick = useCallback(
    (notification: Notification) => {
      dispatch(markNotificationAsRead(notification));
    },
    [dispatch]
  );

  const onButtonClick = useCallback(() => {
    setDrawerOpened(true);
  }, [setDrawerOpened]);

  const onDrawerClose = useCallback(() => {
    setDrawerOpened(false);
  }, [setDrawerOpened]);

  const trigger = (
    <ToggleFeatures
      feature="newDesign"
      off={
        <ButtonDeprecated
          className={cls.notificationButton}
          onClick={onButtonClick}
          variant={ButtonVariant.CLEAR}
        >
          <NotificationIconDeprecated className={cls.notificationIcon} />

          {unreadNotificationsAmount ? (
            <div className={cls.unreadAmount}>{unreadNotificationsAmount}</div>
          ) : null}
        </ButtonDeprecated>
      }
      on={
        <Button
          className={clsR.notificationButton}
          onClick={onButtonClick}
          variant={ButtonVariant.CLEAR}
        >
          <NotificationIcon className={clsR.notificationIcon} />

          {unreadNotificationsAmount ? (
            <div className={clsR.unreadAmount}>{unreadNotificationsAmount}</div>
          ) : null}
        </Button>
      }
    />
  );

  return (
    <>
      <BrowserView>
        <Popover
          direction="bottom left"
          className={classNames(cls.NotificationButton, {}, [className])}
          trigger={trigger}
        >
          <NotificationList
            items={data}
            isLoading={isLoading}
            onItemClick={onNotificationItemClick}
            className={clsR.notifications}
          />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}
        <Drawer isOpen={drawerOpened} onClose={onDrawerClose}>
          <NotificationList
            items={data}
            isLoading={isLoading}
            onItemClick={onNotificationItemClick}
          />
        </Drawer>
      </MobileView>
    </>
  );
});
