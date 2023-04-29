import { memo, FC, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
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

  const { t } = useTranslation('news');

  const changeParagraphHandler = useCallback((paragraphId: string) => (text: string) => {
    onParagraphChange?.(paragraphId, text);
  }, [onParagraphChange]);

  return (
    <Card className={classNames(cls.EditableTextBlock, {}, [className])}>
      <Text size={TextSize.L} title={t('text block')} />

      <TextInput className={cls.title} value={item.title} onChange={onTitleChange} />

      <Text className={cls.paragraphsTitle} size={TextSize.M} title={t('paragraphs')}></Text>
      <div className={cls.paragraphs}>
        {item.paragraphs?.map((paragraph) => (
          <TextInput 
            className={cls.paragraph} 
            key={paragraph.localId} 
            value={paragraph.text} 
            onChange={changeParagraphHandler(paragraph.localId)} 
          />
        ))}
      </div>

      <Button className={cls.addParagraph} onClick={onAddParagraph} variant={ButtonVariant.CLEAR}>{t('add paragraph')}</Button>
    </Card>
  );
});
