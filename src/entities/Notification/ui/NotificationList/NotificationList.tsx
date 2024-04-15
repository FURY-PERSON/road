import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text as TextDeprecated, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

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
        <ToggleFeatures
          feature="newDesign"
          off={
            <TextDeprecated title={t('Notification fetching error')} variant={TextVariant.ERROR} />
          }
          on={<Text title={t('Notification fetching error')} variant={TextVariant.ERROR} />}
        />
      </div>
    );
  }

  if (!items?.length) {
    return (
      <VStack
        align="center"
        justify="center"
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Text text={t('no items')} variant="accent" />
      </VStack>
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
