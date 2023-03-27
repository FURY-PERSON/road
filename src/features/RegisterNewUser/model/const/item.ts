import { Role } from 'entities/Role';
import i18n from 'shared/config/i18n/i18n';
import { SelectOption } from 'shared/ui/Select/Select';

export const rolesList: Array<SelectOption> = [
  { content: i18n.t('worker'), value: Role.WORKER },
  { content: i18n.t('student'), value: Role.STUDENT },
  { content: i18n.t('admin'), value: Role.ADMIN },
];
