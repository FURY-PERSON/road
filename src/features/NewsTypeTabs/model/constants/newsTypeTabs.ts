import { NewsType } from '@/entities/News';
import i18n from '@/shared/config/i18n/i18n';
import { TabItem } from '@/shared/ui/redesigned/Tabs';

export const newsTypeTabs: Array<TabItem<NewsType>> = [
  { value: NewsType.ALL, content: i18n.t('all') },
  { value: NewsType.WARNING, content: i18n.t('warning') }
];
