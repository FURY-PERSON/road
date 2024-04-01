import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  SettlementProcess,
  useSetSettlementProcessStateMutation
} from '@/entities/SettlementProcess';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { SettlementProcessState } from '@/entities/SettlementProcess/models/types/settlementProcess';

interface SettlementProcessStateToolbarProps {
  process: SettlementProcess;
}

export const SettlementProcessStateToolbar: FC<SettlementProcessStateToolbarProps> = memo(
  (props) => {
    const { process } = props;

    const { t } = useTranslation('process');

    const [setProcessState] = useSetSettlementProcessStateMutation();

    const onStateChanged = useCallback(
      (newState: SettlementProcessState) => () =>
        setProcessState({ processId: process.id, state: newState }),
      [process.id, setProcessState]
    );

    return (
      <Card>
        <VStack gap={24}>
          <Text text={t('settlement process management')} />
          <HStack gap={16}>
            <Button
              disabled={process.state !== SettlementProcessState.STARTED}
              onClick={onStateChanged(SettlementProcessState.DORMS_ASSIGNED)}
              variant="outline"
            >
              {t('assign dorms')}
            </Button>
            <Button
              disabled={process.state !== SettlementProcessState.DORMS_ASSIGNED}
              onClick={onStateChanged(SettlementProcessState.ROOMS_ALLOCATED)}
              variant="outline"
            >
              {t('allocate rooms')}
            </Button>
            <Button onClick={onStateChanged(SettlementProcessState.FINISHED)} variant="outline">
              {t('finish')}
            </Button>
          </HStack>
        </VStack>
      </Card>
    );
  }
);
