import { memo, FC, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { RoleGuard } from '@/features/RoleGuard';
import { VStack as VStackDeprecated } from '@/shared/ui/deprecated/Stack/VStack/VStack';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItemList } from '../../model/selectors/getSidebarItemList/getSidebarItemList';

import cls from './Sidebar.module.scss';
import clsR from './Sidebar.redesigned.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo((props) => {
  const { className } = props;
  const [collapsed, serCollapsed] = useState(false);

  const sidebarItemList = useSelector(getSidebarItemList);

  const onToggle = useCallback(() => {
    serCollapsed((value) => !value);
  }, []);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <aside
          data-testid="sidebar"
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
          <VStackDeprecated role="navigation" gap={16} className={cls.links}>
            {sidebarItemList.map((item) => (
              <RoleGuard key={item.path} roleNames={item.roles}>
                <SidebarItem item={item} collapsed={collapsed} />
              </RoleGuard>
            ))}
          </VStackDeprecated>

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
      }
      on={
        <aside
          data-testid="sidebar"
          className={classNames(clsR.Sidebar, { [clsR.collapsed]: collapsed }, [className])}
        >
          <AppLogo className={clsR.appLogo} size={collapsed ? 30 : 50} />
          <VStack role="navigation" gap={8} className={clsR.items}>
            {sidebarItemList.map((item) => (
              <RoleGuard key={item.path} roleNames={item.roles}>
                <SidebarItem item={item} collapsed={collapsed} className={clsR.item} />
              </RoleGuard>
            ))}
          </VStack>

          <div className={clsR.collapseBtn} onClick={onToggle}>
            <ArrowIcon data-testid="sidebar-toggle" className={clsR.collapseBtnIcon} />
          </div>

          <div className={clsR.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher short={collapsed} className={clsR.lang} />
          </div>
        </aside>
      }
    />
  );
});
