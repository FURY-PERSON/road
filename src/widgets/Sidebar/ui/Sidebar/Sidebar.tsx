import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import {
  memo, FC, useState, useMemo, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserLogin } from 'entities/User';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';
import { getSidebarItemList } from '../../model/item';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
}

export const Sidebar:FC<SidebarProps> = memo((props) => {
  const { className } = props;
  const [collapsed, serCollapsed] = useState(false);
  const userLogin = useSelector(getUserLogin);
  const { t } = useTranslation();

  const onToggle = () => {
    serCollapsed((value) => !value);
  };
  const SidebarItemList = useMemo(() => getSidebarItemList(userLogin), [userLogin, t]);

  return (
    <div 
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <div className={cls.links}>
        {SidebarItemList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </div>

      <Button 
        data-testid="sidebar-toggle" 
        onClick={onToggle}
        square
        className={cls.collapseBtn}
        size={ButtonSize.SMALL}
        variant={ButtonVariant.BACKGROUND_INVERTED}
      >
        {collapsed ? '>' : '<'}
      </Button>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={collapsed} className={cls.lng} />
      </div>
    </div>
  );
});
