import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';

import cls from './NewsToolsItem.module.scss';

export interface NewsToolItem {
  onClick?: () => void;
  label?: string;
}

interface NewsToolsItemProps {
  className?: string;
  item: NewsToolItem;
}

export const NewsToolsItem: FC<NewsToolsItemProps> = memo((props) => {
  const { className, item } = props;

  return (
    <Button
      variant={ButtonVariant.OUTLINE}
      onClick={item.onClick}
      className={classNames(cls.NewsToolsItem, {}, [className])}
    >
      {item.label}
    </Button>
  );
});
