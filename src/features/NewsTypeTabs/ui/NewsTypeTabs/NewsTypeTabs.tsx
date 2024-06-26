import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { NewsType } from '@/entities/News';
import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs/Tabs';

interface NewsTypeTabsProps {
  className?: string;
  value: NewsType;
  onChangeType: (type: NewsType) => void;
}

export const NewsTypeTabs = memo((props: NewsTypeTabsProps) => {
  const { className, value, onChangeType } = props;

  const { t } = useTranslation();

  const onTabClick = useCallback(
    (tab: TabItem<NewsType>) => {
      onChangeType(tab.value);
    },
    [onChangeType]
  );

  const onTabClickDeprecated = useCallback(
    (tab: NewsType) => {
      onChangeType(tab);
    },
    [onChangeType]
  );

  const newsTypeTabs: Array<TabItem<NewsType>> = useMemo(
    () => [
      { value: NewsType.ALL, content: t('all') },
      { value: NewsType.WARNING, content: t('warning') }
    ],
    [t]
  );

  return (
    <ToggleFeatures
      feature="newDesign"
      on={
        <Tabs
          direction="column"
          tabs={newsTypeTabs}
          value={value}
          onTabClick={onTabClick}
          className={classNames('', {}, [className])}
        />
      }
      off={
        <TabsDeprecated
          tabs={newsTypeTabs}
          value={value}
          onTabClick={onTabClickDeprecated}
          className={classNames('', {}, [className])}
        />
      }
    />
  );
});
