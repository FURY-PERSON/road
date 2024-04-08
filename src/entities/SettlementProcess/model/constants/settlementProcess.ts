import i18n from '@/shared/config/i18n/i18n';

export enum SettlementProcessState {
  STARTED = 'started',
  DORMS_ASSIGNED = 'dorms_assigned',
  ROOMS_ALLOCATED = 'rooms_allocated',
  FINISHED = 'finished'
}

export const settlementProcessTypeMap: Record<SettlementProcessState, string> = {
  [SettlementProcessState.DORMS_ASSIGNED]: i18n.t('dorms assigned'),
  [SettlementProcessState.FINISHED]: i18n.t('finished'),
  [SettlementProcessState.ROOMS_ALLOCATED]: i18n.t('rooms allocated'),
  [SettlementProcessState.STARTED]: i18n.t('started')
};
