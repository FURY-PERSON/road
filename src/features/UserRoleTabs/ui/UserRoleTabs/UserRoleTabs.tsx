import { memo, useCallback } from 'react';

import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { UsersRoles } from '@/entities/User';

import { userRolesTabs } from '../../model/constants/userRoleTabs';

interface UsersTypeTabsProps {
  className?: string;
  value: UsersRoles;
  onChangeRole: (type: UsersRoles) => void;
}

export const UsersTypeTabs = memo((props: UsersTypeTabsProps) => {
  const { className, value, onChangeRole } = props;

  const onTabClick = useCallback(
    (tab: TabItem<UsersRoles>) => {
      onChangeRole(tab.value);
    },
    [onChangeRole]
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
