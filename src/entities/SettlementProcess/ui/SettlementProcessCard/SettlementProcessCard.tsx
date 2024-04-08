import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { SettlementProcess } from '../../model/types/settlementProcess';
import { settlementProcessTypeMap } from '../../model/constants/settlementProcess';

import cls from './SettlementProcessCard.module.scss';

interface SettlementProcessCardProps {
  className?: string;
  item: SettlementProcess;
}

export const SettlementProcessCard: FC<SettlementProcessCardProps> = (props) => {
  const { className, item } = props;

  const { t } = useTranslation();

  return (
    <VStack gap={8} max className={classNames(cls.SettlementProcessCard, {}, [className])}>
      <Text
        size="M"
        title={`${t('process state')}:`}
        text={settlementProcessTypeMap[item.state]}
        variant="accent"
        titleClassName={cls.title}
      />
      <Text
        size="M"
        title={`${t('process start date')}:`}
        text={String(item.startDate)}
        titleClassName={cls.title}
      />
      {item.finishDate ? (
        <Text
          size="M"
          title={`${t('process finish date')}:`}
          text={String(item.finishDate)}
          titleClassName={cls.title}
        />
      ) : null}
    </VStack>
  );
};
