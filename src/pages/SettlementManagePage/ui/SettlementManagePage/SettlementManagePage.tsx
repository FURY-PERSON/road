import { memo } from 'react';

import { SettlementProcesses } from '@/features/SettlementProcesses';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';
import { ManageSettlementProcessForm } from '@/features/ManageSettlementProcess';

import cls from './SettlementManagePage.module.scss';

export const SettlementManagePage = memo(() => {
  return (
    <StickyContentLayout
      right={<ManageSettlementProcessForm className={cls.ManageSettlementProcessForm} />}
      content={
        <Page testId="SettlementManagePage">
          <SettlementProcesses />
        </Page>
      }
    />
  );
});
