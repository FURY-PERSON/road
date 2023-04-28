import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './NewsToolsItem.module.scss';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';

interface NewsToolsItemProps {
  className?: string;
  onClick?: () => void;
  label?: string
}

export const NewsToolsItem:FC<NewsToolsItemProps> = memo((props) => {
  const { className, onClick, label } = props;

  return (
    <Button variant={ButtonVariant.OUTLINE} onClick={onClick} className={classNames(cls.NewsToolsItem, {}, [className])}>
      {label}
    </Button>
  );
})