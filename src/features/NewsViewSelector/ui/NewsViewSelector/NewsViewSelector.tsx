import { memo } from 'react';

import { NewsListVariant } from '@/entities/News/model/types/news';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button as ButtonDeprecated, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import { viewTypes } from '../../model/constants/newsViewSelector';

import cls from './NewsViewSelector.module.scss';
import clsR from './NewsViewSelector.redesigned.module.scss';

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
      <ToggleFeatures
        feature="newDesign"
        off={
          <>
            {' '}
            {viewTypes.map((viewType) => (
              <ButtonDeprecated variant={ButtonVariant.CLEAR} onClick={onClick(viewType.view)}>
                <viewType.Icon
                  className={classNames(cls.icon, { [cls.notSelected]: viewType.view !== view })}
                />
              </ButtonDeprecated>
            ))}
          </>
        }
        on={
          <Card className={classNames(clsR.NewsViewSelector, {}, [className])} border="round">
            <HStack gap={8}>
              {viewTypes.map((viewType) => (
                <Button variant="clear">
                  <viewType.Icon
                    onClick={onClick(viewType.view)}
                    className={classNames(clsR.icon, {
                      [clsR.notSelected]: viewType.view !== view
                    })}
                  />
                </Button>
              ))}
            </HStack>
          </Card>
        }
      />
    </div>
  );
});
