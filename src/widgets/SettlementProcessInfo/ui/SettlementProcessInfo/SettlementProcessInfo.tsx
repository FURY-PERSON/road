import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SettlementProcessCard, SettlementProcessState } from '@/entities/Settlement';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { SettlementProcessStateToolbar } from '@/features/SettlementProcessStateToolbar';

import { useSettlementProcessInfo } from '../../model/hooks/useSettlementProcessInfo';

import cls from './SettlementProcessInfo.module.scss';

interface SettlementProcessInfoProps {
  className?: string;
  processId: string;
}

export const SettlementProcessInfo: FC<SettlementProcessInfoProps> = (props) => {
  const { className, processId } = props;

  const { t } = useTranslation();
  const { settlementProcess, loading, error } = useSettlementProcessInfo(processId);

  if (!settlementProcess || loading) {
    return <SvgLoader />;
  }

  if (error) {
    return <Text variant="error" text={String(error)} />;
  }

  return (
    <VStack gap={16} max className={classNames(cls.SettlementProcessInfo, {}, [className])}>
      <Text title={t('settlement process')} variant="accent" />

      <SettlementProcessCard item={settlementProcess} className={cls.card} />

      {settlementProcess.state !== SettlementProcessState.FINISHED ? (
        <SettlementProcessStateToolbar processId={settlementProcess.id} />
      ) : null}
    </VStack>
  );
};
