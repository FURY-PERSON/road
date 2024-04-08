import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SettlementProcessCard } from '@/entities/SettlementProcess';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';

import { useSettlementProcesses } from '../../model/hooks/useSettlementProcesses';

import cls from './SettlementProcesses.module.scss';

interface SettlementProcessesProps {
  className?: string;
}

export const SettlementProcesses: FC<SettlementProcessesProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation();

  const { settlementProcesses, loading, error } = useSettlementProcesses();

  if (loading) {
    return (
      <div className={classNames(cls.loader, {}, [className])}>
        <SvgLoader />
      </div>
    );
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  return (
    <Card padding="24" max className={classNames(cls.SettlementProcesses, {}, [className])}>
      <VStack gap={24} max>
        <Text title={t('settlement processes')} />

        <VStack gap={16} max>
          {settlementProcesses?.map((item) => (
            <SettlementProcessCard key={item.id} item={item} className={cls.card} />
          ))}
        </VStack>
      </VStack>
    </Card>
  );
};
