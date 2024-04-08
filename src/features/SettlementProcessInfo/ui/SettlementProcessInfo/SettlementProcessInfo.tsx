import { FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SettlementProcessCard } from '@/entities/SettlementProcess';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { useSettlementProcessInfo } from '../../model/hooks/useSettlementProcessInfo';

import cls from './SettlementProcessInfo.module.scss';

interface SettlementProcessInfoProps {
  className?: string;
  id: string;
}

export const SettlementProcessInfo: FC<SettlementProcessInfoProps> = (props) => {
  const { className, id } = props;

  const { settlementProcess, loading, error } = useSettlementProcessInfo(id);

  if (!settlementProcess || loading) {
    return <SvgLoader />;
  }

  if (error) {
    return <Text variant="error" text={String(error)} />;
  }

  return (
    <SettlementProcessCard
      item={settlementProcess}
      className={classNames(cls.SettlementProcessInfo, {}, [className])}
    />
  );
};
