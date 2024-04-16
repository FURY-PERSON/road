import { memo, FC } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const { className, children, variant = 'primary', activeClassName = '', ...otherProps } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])
      }
      end
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
