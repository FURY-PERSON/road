import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ISidebarItem } from '../../model/item';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: ISidebarItem;
  collapsed: boolean
}

export const SidebarItem:FC<SidebarItemProps> = memo((props) => {
  const { item, collapsed } = props;
  const { t } = useTranslation();

  return (
    <AppLink className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed })} to={item.path}>
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  );
});
