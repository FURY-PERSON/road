import { memo } from 'react';

import { NewsListVariant } from '@/entities/News/model/types/news';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';

import { viewTypes } from '../../model/constants/newsViewSelector';

import cls from './NewsViewSelector.module.scss';

interface NewsViewSelectorProps {
  className?: string;
  view: NewsListVariant;
  onViewClick?: (view: NewsListVariant) => void;
}

export const NewsViewSelector = memo((props: NewsViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: NewsListVariant) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.NewsViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button variant={ButtonVariant.CLEAR} onClick={onClick(viewType.view)}>
          <viewType.Icon
            className={classNames(cls.icon, { [cls.notSelected]: viewType.view !== view })}
          />
        </Button>
      ))}
    </div>
  );
});
