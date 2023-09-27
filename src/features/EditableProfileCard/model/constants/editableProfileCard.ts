import i18n from '@/shared/config/i18n/i18n';
import { SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { RoleName } from '@/entities/Role';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

import { ProfileValidationError } from '../types/editableProfileCard';

export const errorMap: Record<ProfileValidationError, string> = {
  [ProfileValidationError.NO_DATA]: 'no data',
  [ProfileValidationError.SERVER_ERROR]: 'server error',
  [ProfileValidationError.USER_DATA]: 'incorrect user data'
};

export const roleOptionsDeprecated: SelectOption<RoleName>[] = [
  { value: RoleName.ADMIN, content: i18n.t('admin') },
  { value: RoleName.WORKER, content: i18n.t('worker') },
  { value: RoleName.STUDENT, content: i18n.t('student') }
];

export const roleOptions: ListBoxItem<RoleName>[] = [
  { value: RoleName.ADMIN, content: i18n.t('admin') },
  { value: RoleName.WORKER, content: i18n.t('worker') },
  { value: RoleName.STUDENT, content: i18n.t('student') }
];
