import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import {
  memo, FC, useState, useCallback, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { RoleGuard } from 'features/RoleGuard';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItemList } from '../../model/selectors/getSidebarItemList/getSidebarItemList';

interface SidebarProps {
  className?: string;
}

export const Sidebar:FC<SidebarProps> = memo((props) => {
  const { className } = props;
  const [collapsed, serCollapsed] = useState(false);

  const sidebarItemList = useSelector(getSidebarItemList);

  const onToggle = useCallback(() => {
    serCollapsed((value) => !value);
  }, []);

  return (
    <aside 
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <VStack role="navigation" gap={16} className={cls.links}>
        {sidebarItemList.map((item) => (
          <RoleGuard key={item.path} roleNames={item.roles}>
            <SidebarItem item={item} collapsed={collapsed} />
          </RoleGuard>
        ))}
      </VStack>

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
    </aside>
  );
});
