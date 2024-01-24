import { memo, FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import {
  getSelectedBlockId,
  getSelectedVisitDate,
  getError,
  getLoading,
  getBlockIdEditable
} from '../../model/selectors/selectors';
import { createSanitaryVisit } from '../../model/services/createSanitaryVisit/createSanitaryVisit';
import {
  addSanitaryVisitActions,
  addSanitaryVisitReducer
} from '../../model/slice/addSanitaryVisit.slice';

import cls from './Form.module.scss';

interface FormProps {
  className?: string;
  onSuccess?: () => void;
  blockId?: string;
}

const initialReducers: ReducersList = {
  addSanitaryVisit: addSanitaryVisitReducer
};

export const Form: FC<FormProps> = memo((props) => {
  const { className, onSuccess, blockId: blockExternalId } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addSanitaryVisitActions.init({ blockId: blockExternalId }));
  }, []);

  const blockId = useSelector(getSelectedBlockId);
  const date = useSelector(getSelectedVisitDate);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const blockIdEditable = useSelector(getBlockIdEditable);

  const onChangeBlockId = useCallback(
    (value: string) => {
      dispatch(addSanitaryVisitActions.setBlockId(value));
    },
    [dispatch]
  );

  const onChangeVisitDate = useCallback(
    (value: string) => {
      dispatch(addSanitaryVisitActions.setVisitDate(value));
    },
    [dispatch]
  );

  const onApplyClick = useCallback(async () => {
    const result = await dispatch(createSanitaryVisit());
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.();
    }
  }, [dispatch, onSuccess]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Card border="round" padding="24" className={cls.Form}>
        <VStack gap={16}>
          <Input
            onChange={onChangeBlockId}
            value={blockId}
            className={cls.input}
            label={t('block id')}
            disabled={!blockIdEditable}
          />

          <Input
            label={t('visit date')}
            type="date"
            onChange={onChangeVisitDate}
            value={date}
            className={cls.input}
          />
          {error ? <Text title={error} variant="error" size="M" className={cls.error} /> : null}

          <Button
            onClick={onApplyClick}
            disabled={loading}
            className={cls.button}
            variant="outline"
          >
            {t('apply')}
          </Button>
        </VStack>
      </Card>
    </DynamicModuleLoader>
  );
});
