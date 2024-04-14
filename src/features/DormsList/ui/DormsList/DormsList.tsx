import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { DormCard } from '@/entities/Dorm';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { routes } from '@/shared/constant/router';

import { useDormsList } from '../../model/hooks/useDormsList';

import cls from './DormsList.module.scss';

interface DormsListProps {
  className?: string;
}

export const DormsList: FC<DormsListProps> = (props) => {
  const { className } = props;

  const { dorms, isLoading, error } = useDormsList();
  const { t } = useTranslation();

  if (isLoading) {
    return <SvgLoader />;
  }

  if (error) {
    return <Text text={String(error)} variant="error" />;
  }

  if (!dorms?.length) {
    return <Text text={t('no items')} variant="error" />;
  }

  return (
    <VStack gap={16} className={classNames(cls.DormsList, {}, [className])}>
      {dorms?.map((item) => (
        <AppLink to={routes.blocks(item.id)} className={cls.cardLink}>
          <DormCard item={item} />
        </AppLink>
      ))}
    </VStack>
  );
};
