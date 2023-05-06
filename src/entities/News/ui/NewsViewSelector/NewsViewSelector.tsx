import { NewsListVariant } from 'entities/News/model/types/news';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/list.svg';
import GridIcon from 'shared/assets/icons/grid.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import cls from './NewsViewSelector.module.scss';

interface NewsViewSelectorProps {
    className?: string;
    view: NewsListVariant,
    onViewClick?: (view: NewsListVariant) => void;
}

const viewTypes = [
  {
    view: NewsListVariant.BLOCK,
    Icon: GridIcon,
  },
  {
    view: NewsListVariant.LIST,
    Icon: ListIcon,
  },
];

export const NewsViewSelector = memo((props: NewsViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: NewsListVariant) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.NewsViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          variant={ButtonVariant.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <viewType.Icon className={classNames(cls.icon, { [cls.notSelected]: viewType.view !== view })} />
        </Button>
      ))}
    </div>
  );
});
