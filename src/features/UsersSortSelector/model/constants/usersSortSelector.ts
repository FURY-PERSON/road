import { UsersSort } from '@/entities/User';
import i18n from '@/shared/config/i18n/i18n';
import { SortOrder } from '@/shared/types/sort';
import { SelectOption } from '@/shared/ui/deprecated/Select/Select';

export const orderOptions: Array<SelectOption<SortOrder>> = [
  { value: 'ASC', content: i18n.t('ascending') },
  { value: 'DESC', content: i18n.t('descending') }
];

export const sortOptions: Array<SelectOption<UsersSort>> = [
  { value: UsersSort.FIRST_NAME, content: i18n.t('last name') },
  { value: UsersSort.LAST_NAME, content: i18n.t('first name') },
  { value: UsersSort.LOGIN, content: i18n.t('login') }
];
