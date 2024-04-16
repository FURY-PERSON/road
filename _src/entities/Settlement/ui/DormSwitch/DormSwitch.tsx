import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ListBox } from '@/shared/ui/redesigned/popups';

import { getDorms } from '../../model/selectors/selectors';
import { SettlementProcessState } from '../../model/constants/settlementProcess';

interface DormSwitchProps {
  settlementProcessState: SettlementProcessState;
  initialDormId: string | null;
  onChange: (dormId: string) => void;
}

export const DormSwitch: FC<DormSwitchProps> = memo((props) => {
  const { settlementProcessState, initialDormId, onChange } = props;

  const { t } = useTranslation('process');

  const dorms = useSelector(getDorms);

  const getDormById = useCallback(
    (dormId: string | null) => dorms?.find((dorm) => dorm.id === dormId),
    [dorms]
  );

  const initialDorm = useMemo(() => getDormById(initialDormId), [getDormById, initialDormId]);

  const [currentDorm, setCurrentDorm] = useState(initialDorm);

  const selectItems = useMemo(
    () => dorms?.map((dorm) => ({ value: dorm.id, content: dorm.name })),
    [dorms]
  );

  useEffect(() => setCurrentDorm(getDormById(initialDormId)), [getDormById, initialDormId]);

  return (
    <ListBox<string>
      readonly={settlementProcessState !== SettlementProcessState.DORMS_ASSIGNED}
      value={currentDorm?.id}
      items={selectItems}
      onChange={(dormId) => {
        setCurrentDorm(getDormById(dormId));
        onChange(dormId);
      }}
      label={t('dorm')}
    />
  );
});
