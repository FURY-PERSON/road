import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SettlementProcessCard } from '@/entities/Settlement';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { routes } from '@/shared/constant/router';

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
            <AppLink to={routes.settlementProcess(item.id)} className={cls.cardLink} key={item.id}>
              <SettlementProcessCard item={item} className={cls.card} />
            </AppLink>
          ))}
        </VStack>
      </VStack>
    </Card>
  );
};
