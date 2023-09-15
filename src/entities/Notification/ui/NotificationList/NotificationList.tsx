import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/deprecated/Stack/VStack/VStack';
import { SvgLoader } from '@/shared/ui/deprecated/SvgLoader';
import { Text, TextVariant } from '@/shared/ui/deprecated/Text/Text';

import { Notification } from '../../model/types/notification';
import { NotificationItem } from '../NotificationItem/NotificationItem';

import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
  items?: Notification[];
  isLoading?: boolean;
  error?: string;
  onItemClick?: (item: Notification) => void;
}

export const NotificationList: FC<NotificationListProps> = memo((props) => {
  const { className, items, error, isLoading, onItemClick } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.NotificationList, {}, [className, cls.loader])}>
        <SvgLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.NotificationList, {}, [className, cls.loader])}>
        <Text title={t('Notification fetching error')} variant={TextVariant.ERROR} />
      </div>
    );
  }

  return (
    <VStack gap={16} className={classNames(cls.NotificationList, {}, [className])}>
      {items?.map((notification) => (
        <NotificationItem key={notification.id} item={notification} onClick={onItemClick} />
      ))}
    </VStack>
  );
});
