import { memo, FC, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import cls from './EditableTextBlock.module.scss';
import { EditableNewsBlockText, EditableNewsBlockTextHandlers } from '../../model/types/editableNewsBlock';

interface EditableTextBlockProps extends EditableNewsBlockTextHandlers {
  className?: string;
  item: EditableNewsBlockText
}

export const EditableTextBlock:FC<EditableTextBlockProps> = memo((props) => {
  const {
    className, item, onAddParagraph, onParagraphChange, onTitleChange, 
  } = props;

  const changeParagraphHandler = useCallback((paragraphSequencyNum: number) => (text: string) => {
    onParagraphChange?.(paragraphSequencyNum, text);
  }, [onParagraphChange]);

  return (
    <div className={classNames(cls.EditableTextBlock, {}, [className])}>
      <TextInput value={item.title} onChange={onTitleChange} />

      {item.paragraphs?.map((paragraph, index) => (
        <TextInput key={paragraph.localId} value={paragraph.text} onChange={changeParagraphHandler(index)} />
      ))}

      <Button onClick={onAddParagraph} variant={ButtonVariant.CLEAR}>Add paragraph</Button>
    </div>
  );
});
