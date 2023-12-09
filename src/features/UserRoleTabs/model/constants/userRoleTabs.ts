import { UsersRoles } from '@/entities/User';
import i18n from '@/shared/config/i18n/i18n';
import { TabItem } from '@/shared/ui/redesigned/Tabs';

export const userRolesTabs: Array<TabItem<UsersRoles>> = [
  { value: UsersRoles.ALL, content: i18n.t('all') },
  { value: UsersRoles.ADMIN, content: i18n.t('admin') },
  { value: UsersRoles.STUDENT, content: i18n.t('student') },
  { value: UsersRoles.WORKER, content: i18n.t('worker') }
];
