import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { RebukeType } from '@/entities/Rebuke';

import { useForm } from '../../model/hooks/useForm';
import { rebukesList } from '../../model/constants/rebukesList';

import cls from './Form.module.scss';

interface FormProps {
  className?: string;
  onSuccess?: () => void;
  rebukeId: string;
  login?: string;
}

export const Form: FC<FormProps> = memo((props) => {
  const { className, onSuccess, login, rebukeId } = props;

  const { t } = useTranslation();

  const {
    note,
    setNote,
    type,
    setType,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    submit,
    loading,
    error
  } = useForm(rebukeId, login, onSuccess);

  return (
    <Card border="round" padding="24" max className={classNames(cls.Form, {}, [className])}>
      <VStack gap={16}>
        <Text variant="accent" title={t('Edit rebuke')} />

        <Input onChange={setNote} value={note} className={cls.input} label={t('rebuke note')} />

        <ListBox<RebukeType>
          onChange={setType}
          value={type}
          items={rebukesList}
          label={t('rebuke type')}
        />

        <Input
          label={t('rebuke start date')}
          type="date"
          onChange={setStartDate}
          value={startDate}
          className={cls.input}
        />

        <Input
          label={t('rebuke end date')}
          type="date"
          onChange={setEndDate}
          value={endDate}
          className={cls.input}
        />

        {error ? <Text title={error} variant="error" size="M" className={cls.error} /> : null}

        <Button onClick={submit} disabled={loading} className={cls.button} variant="outline">
          {t('apply')}
        </Button>
      </VStack>
    </Card>
  );
});
