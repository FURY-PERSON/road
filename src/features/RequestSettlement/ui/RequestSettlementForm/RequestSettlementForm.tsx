import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Benefit } from '@/entities/Benefit';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CheckBox } from '@/shared/ui/redesigned/popups/components/CheckBox/CheckBox';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { getUserData } from '@/entities/User';
import { RoleName } from '@/entities/Role';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import {
  useGetActiveSettlementProcess,
  useGetStudentInfoById,
  useGetStudentSettlementByStudentId
} from '@/entities/Settlement';

import { getDorms, getTargetDorm } from '../../model/selectors/selectors';
import { initRequestSettlement } from '../../model/services/initRequestSettlement/initRequestSettlement';
import { requestSettlementActions } from '../../model/slice/requestSettlement.slice';
import { requestSettlement } from '../../model/services/requestSettlement/requestSettlement';

import cls from './RequestSettlementForm.module.scss';

export interface RequestSettlementFormProps {
  className?: string;
}

export const RequestSettlementForm: FC<RequestSettlementFormProps> = memo((props) => {
  const { className } = props;

  const { t } = useTranslation('requests');
  const dispatch = useAppDispatch();

  const targetDorm = useSelector(getTargetDorm);
  const dorms = useSelector(getDorms);
  const user = useSelector(getUserData);

  const [isLoading, setIsLoading] = useState(false);

  const { data: studentSettlement, isLoading: studentSettlementLoading } =
    useGetStudentSettlementByStudentId({ studentId: user?.id! }, { skip: !user?.id });

  const { data: activeSettlementProcess, isLoading: activeSettlementProcessLoading } =
    useGetActiveSettlementProcess();

  const {
    data: studentInfo,
    isLoading: studentInfoLoading,
    isFetching: studentInfoError
  } = useGetStudentInfoById({ studentId: user?.id! }, { skip: !user?.id });

  const selectItems: ListBoxItem<string>[] | undefined = useMemo(
    () =>
      dorms
        ?.filter(
          (dorm) => studentInfo?.reputation && studentInfo?.reputation >= dorm.reputationBound
        )
        ?.map((dorm) => ({ value: dorm.id, content: dorm.name })),
    [dorms, studentInfo]
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
    setIsLoading(true);
    dispatch(requestSettlement());
    setIsLoading(false);
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initRequestSettlement());
  });

  const checkBoxItems = useMemo(
    () => Object.values(Benefit).map((value) => ({ value, content: t(value) })),
    [t]
  );

  if (user?.role.name !== RoleName.STUDENT) {
    return (
      <Text
        title={t('you can not send a requent to settlement, because you are not a student')}
        variant="accent"
      />
    );
  }

  const loading =
    isLoading || studentSettlementLoading || activeSettlementProcessLoading || studentInfoLoading;
  const error = studentInfoError;

  if (loading) {
    return <SvgLoader width={80} height={80} />;
  }

  if (studentSettlement) {
    return (
      <Text title={t('your settlement requent has been sent successfully')} variant="accent" />
    );
  }

  if (!activeSettlementProcess) {
    return <Text title={t('there is currently no active settlement process')} variant="accent" />;
  }

  if (error) {
    return <Text title={String(error)} variant="error" />;
  }

  return (
    <Card fullWidth padding="24" className={classNames(cls.RequestSettlementForm, {}, [className])}>
      <Text size="XL" title={t('settlement request')} variant="accent" className={cls.title} />

      <VStack gap={32}>
        <ListBox<string>
          value={targetDorm?.id}
          onChange={onTargetDormChange}
          label={t('select target dorm')}
          items={selectItems}
          labelClassName={cls.label}
        />
        <CheckBox
          items={checkBoxItems}
          onChange={onBenefitsSet}
          label={t('benefits')}
          className={cls.ckheckboxContainer}
        />
        <Button onClick={onApplyClick} variant="filled" size="medium" className={cls.button}>
          <Text text={t('save request')} textClassName={cls.buttonText} />
        </Button>
      </VStack>
    </Card>
  );
});
