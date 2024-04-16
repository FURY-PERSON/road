import { memo, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { getDate } from '@/shared/lib/helpers/date/getDate';

import { ScientificWork } from '../../model/types/scientificWork';
import { scientificWorkTypeMap } from '../../model/constants/scientificWork';

import cls from './ScientificWorkCard.module.scss';

export interface ScientificWorkCardProps {
  className?: string;
  item: ScientificWork;
  children?: JSX.Element;
}

export const ScientificWorkCard: FC<ScientificWorkCardProps> = memo((props) => {
  const { className, item, children } = props;

  const { t } = useTranslation();

  const scientificWorkDate = useMemo(() => getDate(item.date), [item.date]);

  return (
    <VStack gap={8} max className={classNames(cls.ScientificWorkCard, {}, [className])}>
      <Text
        title={`${t('work title')}:`}
        bold
        size="M"
        text={item.title}
        titleClassName={cls.title}
        variant="accent"
      />
      <Text
        title={`${t('work type')}:`}
        bold
        size="M"
        text={scientificWorkTypeMap[item.type]}
        titleClassName={cls.title}
      />
      <Text
        title={`${t('date of work')}:`}
        bold
        size="M"
        text={scientificWorkDate}
        titleClassName={cls.title}
      />

      {children}
    </VStack>
  );
});
