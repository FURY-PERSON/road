import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { ScientificWorkType } from '@/entities/ScientificWork';

import { useForm } from '../../model/hooks/useForm';
import { scentificWorksList } from '../../model/constants/scientificWorksList';

import cls from './Form.module.scss';

interface FormProps {
  className?: string;
  onSuccess?: () => void;
  login?: string;
}

export const Form: FC<FormProps> = memo((props) => {
  const { className, onSuccess, login } = props;

  const { t } = useTranslation();

  const { title, setTitle, type, setType, date, setDate, submit, loading, error } = useForm(
    login,
    onSuccess
  );

  return (
    <Card border="round" padding="24" max className={classNames(cls.Form, {}, [className])}>
      <VStack gap={16}>
        <Input onChange={setTitle} value={title} className={cls.input} label={t('work title')} />

        <ListBox<ScientificWorkType>
          onChange={setType}
          value={type}
          items={scentificWorksList}
          label={t('work type')}
        />

        <Input
          label={t('date of work')}
          type="date"
          onChange={setDate}
          value={date}
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
