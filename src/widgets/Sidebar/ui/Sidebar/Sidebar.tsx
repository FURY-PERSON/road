import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { memo, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
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
      <button data-testid="sidebar-toggle" onClick={onToggle} type="button">{t('toggle')}</button>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher className={cls.lng} />
      </div>
    </div>
  );
});
