import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { SettlementProcessState } from '@/entities/Settlement';

import { useSettlementProcessStateToolbar } from '../../model/hooks/useSettlementProcessStateToolbar';

import cls from './SettlementProcessStateToolbar.module.scss';

interface SettlementProcessStateToolbarProps {
  className?: string;
  processId: string;
}

export const SettlementProcessStateToolbar: FC<SettlementProcessStateToolbarProps> = memo(
  (props) => {
    const { className, processId } = props;

    const { t } = useTranslation('process');
    const { activeProcess, changeProcessState, showToolbar } =
      useSettlementProcessStateToolbar(processId);

    const onAssignDormsClick = useCallback(() => {
      changeProcessState(SettlementProcessState.DORMS_ASSIGNED);
    }, [changeProcessState]);

    const onAllocatRoomsClick = useCallback(() => {
      changeProcessState(SettlementProcessState.ROOMS_ALLOCATED);
    }, [changeProcessState]);

    const onFinishClick = useCallback(() => {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const isChangeStatus = confirm(
        t('are you sure you want to finish the settlement process?') || ''
      );

      if (isChangeStatus) {
        changeProcessState(SettlementProcessState.FINISHED);
      }
    }, [changeProcessState, t]);

    if (!showToolbar) {
      return null;
    }

    return (
      <Card className={classNames(cls.SettlementProcessStateToolbar, {}, [className])}>
        <VStack gap={24} max justify="center" align="center">
          <Text size="M" title={t('settlement process management')} />
          <HStack gap={16}>
            <Button
              disabled={activeProcess?.state !== SettlementProcessState.STARTED}
              onClick={onAssignDormsClick}
              variant="outline"
            >
              {t('assign dorms')}
            </Button>
            <Button
              disabled={activeProcess?.state !== SettlementProcessState.DORMS_ASSIGNED}
              onClick={onAllocatRoomsClick}
              variant="outline"
            >
              {t('allocate rooms')}
            </Button>
            <Button onClick={onFinishClick} variant="outline">
              {t('finish')}
            </Button>
          </HStack>
        </VStack>
      </Card>
    );
  }
);
