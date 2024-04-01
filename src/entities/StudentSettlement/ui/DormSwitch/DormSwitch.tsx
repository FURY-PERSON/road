import { FC, memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ListBox } from '@/shared/ui/redesigned/popups';
import { SettlementProcessState } from '@/entities/SettlementProcess/models/types/settlementProcess';

import { getDorms } from '../../model/selectors/selectors';

interface DormSwitchProps {
  settlementProcessState: SettlementProcessState;
  initialDormId: string | null;
  onChange: (dormId: string) => void;
}

export const DormSwitch: FC<DormSwitchProps> = memo((props) => {
  const { settlementProcessState, initialDormId, onChange } = props;

  const { t } = useTranslation('process');

  const dorms = useSelector(getDorms);

  const initialDorm = useMemo(
    () => dorms?.find((dorm) => dorm.id === initialDormId),
    [dorms, initialDormId]
  );

  const [currentDorm, setCurrentDorm] = useState(initialDorm);

  const selectItems = useMemo(
    () => dorms?.map((dorm) => ({ value: dorm.id, content: dorm.name })),
    [dorms]
  );

  return (
    <ListBox<string>
      readonly={settlementProcessState !== SettlementProcessState.DORMS_ASSIGNED}
      value={currentDorm?.id}
      items={selectItems}
      onChange={(dormId) => {
        setCurrentDorm(dorms?.find((dorm) => dorm.id === dormId));
        onChange(dormId);
      }}
      label={t('dorm')}
    />
  );
});
