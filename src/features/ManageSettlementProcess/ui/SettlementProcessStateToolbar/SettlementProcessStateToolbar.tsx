import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  SettlementProcess,
  useUpdateSettlementProcessState,
  SettlementProcessState
} from '@/entities/SettlementProcess';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './SettlementProcessStateToolbar.module.scss';

interface SettlementProcessStateToolbarProps {
  className?: string;
  process: SettlementProcess;
}

export const SettlementProcessStateToolbar: FC<SettlementProcessStateToolbarProps> = memo(
  (props) => {
    const { process, className } = props;

    const { t } = useTranslation('process');

    const [setProcessState] = useUpdateSettlementProcessState();

    const onStateChanged = useCallback(
      (newState: SettlementProcessState) => () =>
        setProcessState({ processId: process.id, state: newState }),
      [process.id, setProcessState]
    );

    return (
      <Card className={classNames(cls.SettlementProcessStateToolbar, {}, [className])}>
        <VStack gap={24}>
          <Text text={t('settlement process management')} />
          <VStack gap={16}>
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
          </VStack>
        </VStack>
      </Card>
    );
  }
);
