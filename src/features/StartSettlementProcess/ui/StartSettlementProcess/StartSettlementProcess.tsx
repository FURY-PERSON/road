import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import { useStartSettlementProcess } from '../../model/hooks/useStartSettlementProcess';

import cls from './StartSettlementProcess.module.scss';

interface StartSettlementProcessProps {
  className?: string;
}

export const StartSettlementProcess: FC<StartSettlementProcessProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation();
  const { activeProcess, startProcess, loading } = useStartSettlementProcess();

  if (activeProcess || loading) return null;

  return (
    <Button
      variant="filled"
      onClick={startProcess}
      className={classNames(cls.StartSettlementProcess, {}, [className])}
    >
      {t('create process')}
    </Button>
  );
};
