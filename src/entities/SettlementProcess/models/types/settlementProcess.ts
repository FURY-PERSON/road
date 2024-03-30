export enum SettlementProcessState {
  STARTED = 'started',
  DORMS_ASSIGNED = 'dorms_assigned',
  ROOMS_ALLOCATED = 'rooms_allocated',
  FINISHED = 'finished'
}

export interface SettlementProcess {
  id: string;
  state: SettlementProcessState;
  startDate: Date;
  finishDate?: Date | null;
}
