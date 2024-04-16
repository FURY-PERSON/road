import { lazy } from 'react';

export const SettlementManagePageAsync = lazy(() =>
  import('./SettlementManagePage').then((module) => ({ default: module.SettlementManagePage }))
);
