import { lazy } from 'react';

export const SettlementRequestPageAsync = lazy(() =>
  import('./SettlementRequestPage').then((module) => ({ default: module.SettlementRequestPage }))
);
