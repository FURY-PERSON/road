import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { memo, FC, useState } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar:FC<SidebarProps> = memo((props) => {
  const { className } = props;
  const [collapsed, serCollapsed] = useState(false);

  const onToggle = () => {
    serCollapsed((value) => !value)
  }

  return (
      <div className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
        <button onClick={onToggle} type="button">toggle</button>

        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LanguageSwitcher className={cls.lng} />
        </div>
      </div>
  );
})