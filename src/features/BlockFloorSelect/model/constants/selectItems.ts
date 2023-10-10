import i18n from '@/shared/config/i18n/i18n';
import { SortOrder } from '@/shared/types/sort';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

export const floorList: Array<ListBoxItem<string>> = [
  { content: 'no floor', value: 'none' },
  { content: 1, value: '1' },
  { content: 2, value: '2' },
  { content: 3, value: '3' },
  { content: 4, value: '4' },
  { content: 5, value: '5' },
  { content: 6, value: '6' },
  { content: 7, value: '7' },
  { content: 8, value: '8' },
  { content: 9, value: '9' },
  { content: 10, value: '10' },
  { content: 11, value: '11' }
];

export const orderOptions: Array<ListBoxItem<SortOrder>> = [
  { value: 'ASC', content: i18n.t('ascending') },
  { value: 'DESC', content: i18n.t('descending') }
];
