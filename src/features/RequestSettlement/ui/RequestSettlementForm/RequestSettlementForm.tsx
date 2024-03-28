import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getDorms, getTargetDorm } from '../../model/selectors/selectors';
import { initRequestSettlement } from '../../model/services/initRequestSettlement/initRequestSettlement';
import { requestSettlementActions } from '../../model/slice/requestSettlement.slice';

export const RequestSettlementForm = memo(() => {
  const { t } = useTranslation('requests');
  const dispatch = useAppDispatch();

  const targetDorm = useSelector(getTargetDorm);
  const dorms = useSelector(getDorms);

  const selectItems: ListBoxItem<string>[] | undefined = useMemo(
    () => dorms?.map((dorm) => ({ value: dorm.id, content: dorm.name })),
    [dorms]
  );

  const onTargetDormChange = useCallback(
    (dormId?: string) => {
      if (dormId) {
        dispatch(requestSettlementActions.setTargetDorm(dormId));
      }
    },
    [dispatch]
  );

  useInitialEffect(() => {
    dispatch(initRequestSettlement());
  });

  return (
    <Card fullWidth>
      <VStack>
        <ListBox<string>
          value={targetDorm?.id}
          onChange={onTargetDormChange}
          label={t('target dorm')}
          items={selectItems}
        />
      </VStack>
    </Card>
  );
});
