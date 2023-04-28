import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './EditableCodeBlock.module.scss';
import { EditableNewsBlockCode, EditableNewsBlockCodeHandlers } from '../../model/types/editableNewsBlock';
import { TextInput } from 'shared/ui/TextInput/TextInput';

interface EditableCodeBlockProps extends EditableNewsBlockCodeHandlers {
  className?: string;
  item?: EditableNewsBlockCode
}

export const EditableCodeBlock:FC<EditableCodeBlockProps> = memo((props) => {
  const { className, item, onCodeChange } = props;

  return (
    <div className={classNames(cls.EditableCodeBlock, {}, [className])}>
      <TextInput value={item?.code} onChange={onCodeChange} />
    </div>
  );
})