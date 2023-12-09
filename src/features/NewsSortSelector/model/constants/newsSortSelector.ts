import { NewsSort } from '@/entities/News';
import i18n from '@/shared/config/i18n/i18n';
import { SortOrder } from '@/shared/types/sort';
import { SelectOption } from '@/shared/ui/deprecated/Select/Select';

export const orderOptions: Array<SelectOption<SortOrder>> = [
  { value: 'ASC', content: i18n.t('ascending') },
  { value: 'DESC', content: i18n.t('descending') }
];

export const sortOrderOptions: Array<SelectOption<NewsSort>> = [
  { value: NewsSort.TITLE, content: i18n.t('title') },
  { value: NewsSort.CREATED, content: i18n.t('date') }
];
