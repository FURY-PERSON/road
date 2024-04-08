import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetActiveSettlementProcess,
  useCreateSettlementProcess
} from '@/entities/SettlementProcess';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { SettlementProcessStateToolbar } from '../SettlementProcessStateToolbar/SettlementProcessStateToolbar';

import cls from './ManageSettlementProcessForm.module.scss';

interface ManageSettlementProcessFormProps {
  className?: string;
}

export const ManageSettlementProcessForm: FC<ManageSettlementProcessFormProps> = memo((props) => {
  const { className } = props;

  const { t } = useTranslation('process');

  const { data: activeProcess, isError } = useGetActiveSettlementProcess();
  const [startProcess] = useCreateSettlementProcess();

  if (!activeProcess || isError) {
    return (
      <VStack gap={32} className={classNames(cls.ManageSettlementProcessForm, {}, [className])}>
        <Button
          variant="filled"
          onClick={() => startProcess()}
          className={classNames(cls.ManageSettlementProcessForm, {}, [className])}
        >
          {t('create process')}
        </Button>
      </VStack>
    );
  }

  return (
    <SettlementProcessStateToolbar
      process={activeProcess}
      className={classNames(cls.ManageSettlementProcessForm, {}, [className])}
    />
  );
});
