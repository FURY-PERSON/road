import { memo, FC } from 'react';

import cls from './FieldNameCell.module.scss';

interface FieldNameCellProps {
  name: string;
}

export const FieldNameCell: FC<FieldNameCellProps> = memo((props) => {
  const { name } = props;

  return <div className={cls.FieldNameCell}>{name}</div>;
});
