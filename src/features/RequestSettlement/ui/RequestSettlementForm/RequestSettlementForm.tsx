import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CheckBox } from '@/shared/ui/redesigned/popups/components/CheckBox/CheckBox';
import { Benefit } from '@/entities/Benefit';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { getDorms, getTargetDorm } from '../../model/selectors/selectors';
import { initRequestSettlement } from '../../model/services/initRequestSettlement/initRequestSettlement';
import { requestSettlementActions } from '../../model/slice/requestSettlement.slice';
import { requestSettlement } from '../../model/services/requestSettlement/requestSettlement';

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

  const onBenefitsSet = useCallback(
    (checkedBenefits?: Benefit[]) => {
      if (checkedBenefits) {
        dispatch(requestSettlementActions.setBenefits(checkedBenefits));
      }
    },
    [dispatch]
  );

  const onApplyClick = useCallback(() => {
    dispatch(requestSettlement());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initRequestSettlement());
  });

  return (
    <Card fullWidth padding="24">
      <VStack gap={16}>
        <Text size="XL" text={t('settlement request')} />
        <ListBox<string>
          value={targetDorm?.id}
          onChange={onTargetDormChange}
          label={t('target dorm')}
          items={selectItems}
        />
        <CheckBox
          items={Object.values(Benefit).map((value) => ({ value, content: t(value) }))}
          onChange={onBenefitsSet}
          label={t('benefits')}
        />
        <Button onClick={onApplyClick} variant="filled">
          {t('save request')}
        </Button>
      </VStack>
    </Card>
  );
});
