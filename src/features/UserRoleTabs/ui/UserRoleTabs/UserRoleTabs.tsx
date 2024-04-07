import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { UsersRoles } from '@/entities/User';

interface UsersTypeTabsProps {
  className?: string;
  value: UsersRoles;
  onChangeRole: (type: UsersRoles) => void;
}

export const UsersTypeTabs = memo((props: UsersTypeTabsProps) => {
  const { className, value, onChangeRole } = props;

  const { t } = useTranslation();

  const onTabClick = useCallback(
    (tab: TabItem<UsersRoles>) => {
      onChangeRole(tab.value);
    },
    [onChangeRole]
  );

  const userRolesTabs: Array<TabItem<UsersRoles>> = useMemo(
    () => [
      { value: UsersRoles.ALL, content: t('all') },
      { value: UsersRoles.ADMIN, content: t('admin') },
      { value: UsersRoles.STUDENT, content: t('student') },
      { value: UsersRoles.WORKER, content: t('worker') }
    ],
    [t]
  );

  return (
    <Tabs
      direction="column"
      tabs={userRolesTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames('', {}, [className])}
    />
  );
});
