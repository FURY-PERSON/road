import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { getFormattedDate } from '@/shared/lib/helpers/date/getFormattedDate';

import { SettlementProcess } from '../../model/types/settlementProcess';
import { SettlementProcessState } from '../../model/constants/settlementProcess';

import cls from './SettlementProcessCard.module.scss';

interface SettlementProcessCardProps {
  className?: string;
  item: SettlementProcess;
}

export const SettlementProcessCard: FC<SettlementProcessCardProps> = (props) => {
  const { className, item } = props;

  const { t } = useTranslation();

  const settlementProcessTypeMap: Record<SettlementProcessState, string> = useMemo(() => {
    return {
      [SettlementProcessState.DORMS_ASSIGNED]: t('dorms assigned'),
      [SettlementProcessState.FINISHED]: t('finished'),
      [SettlementProcessState.ROOMS_ALLOCATED]: t('rooms allocated'),
      [SettlementProcessState.STARTED]: t('started')
    };
  }, [t]);

  return (
    <VStack gap={8} max className={classNames(cls.SettlementProcessCard, {}, [className])}>
      <Text
        size="M"
        title={`${t('process state')}:`}
        text={settlementProcessTypeMap[item.state]}
        variant="accent"
        titleClassName={cls.title}
        textClassName={cls.title}
      />
      <Text
        size="M"
        title={`${t('process start date')}:`}
        text={getFormattedDate(item.startDate)}
        titleClassName={cls.title}
      />
      {item.finishDate ? (
        <Text
          size="M"
          title={`${t('process finish date')}:`}
          text={getFormattedDate(item.finishDate)}
          titleClassName={cls.title}
        />
      ) : null}
    </VStack>
  );
};
