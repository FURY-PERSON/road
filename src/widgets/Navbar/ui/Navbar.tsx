import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string
}

export const Navbar = (props: NavbarProps) => {
  const {className} = props;

  return (
    <div className={classNames(cls.Navbar, {} , [className])}>
      <div>
        <AppLink to="/">To Main</AppLink>
        <AppLink to="/about">To About</AppLink>
      </div>
    </div>
  );
};