import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './EditableNewsMain.module.scss';

interface EditableNewsMainProps {
  className?: string;
}

export const EditableNewsMain:FC<EditableNewsMainProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.EditableNewsMain, {}, [className])}></div>
  );
})