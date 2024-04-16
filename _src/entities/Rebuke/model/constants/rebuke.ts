import i18n from '@/shared/config/i18n/i18n';

export enum RebukeType {
  STRONG = 'strong',
  NORMAL = 'normal'
}

export const rebukeTypeMap: Record<RebukeType, string> = {
  [RebukeType.NORMAL]: i18n.t('normal'),
  [RebukeType.STRONG]: i18n.t('strong')
};
