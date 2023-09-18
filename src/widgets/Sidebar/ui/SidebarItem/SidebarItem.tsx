import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';

import { ISidebarItem } from '../../model/types/item';

import cls from './SidebarItem.module.scss';
import clsR from './SidebarItem.redesigned.module.scss';

interface SidebarItemProps {
  item: ISidebarItem;
  collapsed: boolean;
  className?: string;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props) => {
  const { item, collapsed, className } = props;

  return (
    <ToggleFeatures
      feature="newDesign"
      on={
        <AppLink
          to={item.path}
          className={classNames(
            clsR.item,
            {
              [clsR.collapsed]: collapsed
            },
            [className]
          )}
          activeClassName={clsR.active}
        >
          <item.Icon className={clsR.icon} />
          <span className={clsR.link}>{item.text}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed })}
          to={item.path}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>{item.text}</span>
        </AppLinkDeprecated>
      }
    />
  );
});
