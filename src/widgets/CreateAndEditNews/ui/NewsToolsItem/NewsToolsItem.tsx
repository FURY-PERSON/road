import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button as ButtonDeprecated, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import cls from './NewsToolsItem.module.scss';
import clsR from './NewsToolsItem.redesigned.module.scss';

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
    <ToggleFeatures
      feature="newDesign"
      off={
        <ButtonDeprecated
          variant={ButtonVariant.OUTLINE}
          onClick={item.onClick}
          className={classNames(cls.NewsToolsItem, {}, [className])}
        >
          {item.label}
        </ButtonDeprecated>
      }
      on={
        <Button
          variant="outline"
          onClick={item.onClick}
          className={classNames(clsR.NewsToolsItem, {}, [className])}
        >
          {item.label}
        </Button>
      }
    />
  );
});
