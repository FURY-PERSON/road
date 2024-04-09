import { memo } from 'react';

import { SettlementProcesses } from '@/features/SettlementProcesses';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';
import { StartSettlementProcess } from '@/features/StartSettlementProcess';

import cls from './SettlementManagePage.module.scss';

export const SettlementManagePage = memo(() => {
  return (
    <StickyContentLayout
      right={<StartSettlementProcess className={cls.StartSettlementProcess} />}
      content={
        <Page testId="SettlementManagePage">
          <SettlementProcesses />
        </Page>
      }
    />
  );
});
