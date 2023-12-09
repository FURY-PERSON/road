import { RoleName } from '@/entities/Role';
import i18n from '@/shared/config/i18n/i18n';
import { SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

export const rolesListDeprecated: Array<SelectOption<RoleName>> = [
  { content: i18n.t('worker'), value: RoleName.WORKER },
  { content: i18n.t('student'), value: RoleName.STUDENT },
  { content: i18n.t('admin'), value: RoleName.ADMIN }
];

export const rolesList: Array<ListBoxItem<RoleName>> = [
  { content: i18n.t('worker'), value: RoleName.WORKER },
  { content: i18n.t('student'), value: RoleName.STUDENT },
  { content: i18n.t('admin'), value: RoleName.ADMIN }
];
