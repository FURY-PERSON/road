import i18n from '@/shared/config/i18n/i18n';

export enum ScientificWorkType {
  PUBLICATION = 'publication',
  OLYMPIAD = 'olympiad'
}

export const scientificWorkTypeMap: Record<ScientificWorkType, string> = {
  [ScientificWorkType.OLYMPIAD]: i18n.t('olympiad'),
  [ScientificWorkType.PUBLICATION]: i18n.t('publication')
};
