import { memo, FC } from 'react';

import { getDate } from '@/shared/lib/helpers/date/getDate';

import cls from './DateCell.module.scss';

interface DateCellProps {
  dateString: string;
}

export const DateCell: FC<DateCellProps> = memo((props) => {
  const { dateString } = props;

  return <div className={cls.DateCell}>{getDate(dateString)}</div>;
});
