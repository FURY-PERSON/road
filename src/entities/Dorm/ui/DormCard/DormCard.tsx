import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import DormIcon from '@/shared/assets/icons/home.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';

import { Dorm } from '../../model/types/dorm';

import cls from './DormCard.module.scss';

interface DormCardProps {
  className?: string;
  item: Dorm;
}

export const DormCard: FC<DormCardProps> = memo((props) => {
  const { className, item } = props;

  const { t } = useTranslation();

  return (
    <Card border="round" padding="16" max className={classNames(cls.DormCard, {}, [className])}>
      <VStack gap={4} max>
        <HStack align="center" gap={24}>
          <div className={cls.dormIconContainer}>
            <DormIcon className={cls.dormIcon} />
          </div>

          <VStack>
            <Text title={`${t('dorm')}: ${item.name}`} variant="accent" className={cls.dormTitle} />

            <Text text={`${t('address')}: ${item.address}`} size="M" />
            <Text text={`${t('phone')}: ${item.phone}`} size="M" />
            <Text text={`${t('email')}: ${item.email}`} size="M" />

            <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
              <Text text={`${t('Reputation bound')}: ${item.reputationBound}`} size="M" />
            </RoleGuard>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
