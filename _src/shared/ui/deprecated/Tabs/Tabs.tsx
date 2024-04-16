import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/types/react';
import { Card, CardVariant } from '@/shared/ui/deprecated/Card/Card';

import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: Array<TabItem<T>>;
  value?: string;
  onTabClick: (tabValue: T) => void;
}

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
  const { className, onTabClick, tabs, value } = props;

  const onTabClickHandler = (tab: TabItem<T>) => () => onTabClick(tab.value);

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          variant={value === tab.value ? CardVariant.DEFAULT : CardVariant.OUTLINED}
          onClick={onTabClickHandler(tab)}
          className={cls.tab}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
