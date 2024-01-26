import { memo, FC, useState } from 'react';

import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { SanitaryVisitMark, useBlockSanitaryVisitMarkMutation } from '@/entities/Block';

import cls from './MarkCell.module.scss';

interface MarkCellProps {
  mark: SanitaryVisitMark;
  editable?: boolean;
}

export const MarkCell: FC<MarkCellProps> = memo((props) => {
  const { editable, mark } = props;

  const [value, setValue] = useState(mark.mark);

  const [changeMark] = useBlockSanitaryVisitMarkMutation();

  const onChange = (newValue: string) => {
    if (Number.isNaN(Number(newValue))) {
      return;
    }

    if (newValue === '') {
      setValue(null);
      return;
    }

    setValue(Number(newValue));
  };

  const onBlur = () => {
    changeMark({ markId: mark.id, mark: value });
  };

  if (editable) {
    return (
      <div className={cls.MarkCell}>
        <Input
          className={cls.input}
          value={value || ''}
          onChange={onChange}
          placeholder="-"
          onBlur={onBlur}
          size="s"
        />
      </div>
    );
  }

  return <Text size="M" className={cls.MarkCell} text={value || '-'} />;
});
