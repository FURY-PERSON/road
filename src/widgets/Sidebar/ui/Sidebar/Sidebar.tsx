import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { memo, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonSize, ButtonVariant } from 'shared/ui/Button/Button';
import HomeIcon from 'shared/assets/icons/home.svg';
import BookIcon from 'shared/assets/icons/book.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar:FC<SidebarProps> = memo((props) => {
  const { className } = props;
  const [collapsed, serCollapsed] = useState(false);
  const { t } = useTranslation();

  const onToggle = () => {
    serCollapsed((value) => !value);
  };

  return (
    <div 
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <div className={cls.links}>
        <AppLink className={cls.item} to={RoutePath.main}>
          <HomeIcon className={cls.icon} />
          <span className={cls.link}>{t('to main')}</span>
        </AppLink>
        <AppLink className={cls.item} to={RoutePath.about}>
          <BookIcon className={cls.icon} />
          <span className={cls.link}>{t('to about')}</span>
        </AppLink>
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
