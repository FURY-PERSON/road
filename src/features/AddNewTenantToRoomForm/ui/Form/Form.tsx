import { memo, FC, useCallback } from 'react';
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
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { getError, getLoading, getSelectedUserLogin } from '../../model/selectors/selectors';
import {
  addNewTenantToRoomActions,
  addNewTenantToRoomReducer
} from '../../model/slice/addNewTenantToRoom.slice';
import { addNewTenantToRoom } from '../../model/services/addNewTenantToRoom/addNewTenantToRoom';

import cls from './Form.module.scss';

interface FormProps {
  className?: string;
  onSuccess?: () => void;
  roomId?: string;
}

const initialReducers: ReducersList = {
  addNewTenantToRoom: addNewTenantToRoomReducer
};

export const Form: FC<FormProps> = memo((props) => {
  const { className, onSuccess, roomId: roomExternalId } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const userLogin = useSelector(getSelectedUserLogin);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const onChangeUserLogin = useCallback(
    (value: string) => {
      dispatch(addNewTenantToRoomActions.setUserLogin(value));
    },
    [dispatch]
  );

  const onApplyClick = useCallback(async () => {
    if (!roomExternalId) return;

    const result = await dispatch(addNewTenantToRoom({ roomId: roomExternalId }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.();
    }
  }, [dispatch, onSuccess, roomExternalId]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Card border="round" padding="24" className={classNames(cls.Form, {}, [className])}>
        <VStack gap={16}>
          <Input
            label={t('tenant login')}
            onChange={onChangeUserLogin}
            value={userLogin}
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
