import { lazy } from 'react';

export const SettlementProcessPageAsync = lazy(() =>
  import('./SettlementProcessPage').then((module) => ({ default: module.SettlementProcessPage }))
);
