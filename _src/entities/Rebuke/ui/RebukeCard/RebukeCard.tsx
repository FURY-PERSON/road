import { memo, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { getDate } from '@/shared/lib/helpers/date/getDate';

import { Rebuke } from '../../model/types/rebuke';
import { rebukeTypeMap } from '../../model/constants/rebuke';

import cls from './RebukeCard.module.scss';

interface RebukeCardProps {
  className?: string;
  item: Rebuke;
  children?: JSX.Element;
}

export const RebukeCard: FC<RebukeCardProps> = memo((props) => {
  const { className, item, children } = props;

  const { t } = useTranslation();

  const rebukeStartDate = useMemo(() => getDate(item.startDate), [item.startDate]);
  const rebukeEndDate = useMemo(() => getDate(item.endDate), [item.endDate]);

  return (
    <VStack gap={8} max className={classNames(cls.RebukeCard, {}, [className])}>
      <Text
        title={`${t('rebuke note')}:`}
        bold
        size="M"
        text={item.note}
        titleClassName={cls.title}
        variant="accent"
      />
      <Text
        title={`${t('rebuke type')}:`}
        bold
        size="M"
        text={rebukeTypeMap[item.type]}
        titleClassName={cls.title}
      />
      <Text
        title={`${t('rebuke start date')}:`}
        bold
        size="M"
        text={rebukeStartDate}
        titleClassName={cls.title}
      />

      <Text
        title={`${t('rebuke end date')}:`}
        bold
        size="M"
        text={rebukeEndDate}
        titleClassName={cls.title}
      />

      {children}
    </VStack>
  );
});
