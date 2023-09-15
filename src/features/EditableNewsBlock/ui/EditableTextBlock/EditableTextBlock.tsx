import { memo, FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { Button, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';

import {
  EditableNewsBlockText,
  EditableNewsBlockTextHandlers
} from '../../model/types/editableNewsBlock';

import cls from './EditableTextBlock.module.scss';

interface EditableTextBlockProps extends EditableNewsBlockTextHandlers {
  className?: string;
  item: EditableNewsBlockText;
  maxSequenceNumber: number;
}

export const EditableTextBlock: FC<EditableTextBlockProps> = memo((props) => {
  const {
    className,
    item,
    onAddParagraph,
    onParagraphChange,
    onTitleChange,
    maxSequenceNumber,
    onSequenceNumberChange
  } = props;

  const { t } = useTranslation('news');

  const changeParagraphHandler = useCallback(
    (paragraphId: string) => (text: string) => {
      onParagraphChange?.(paragraphId, text);
    },
    [onParagraphChange]
  );

  const onSequenceChange = useCallback(
    (num: string) => {
      onSequenceNumberChange?.(+num);
    },
    [onSequenceNumberChange]
  );

  const sequenceNumberOptions: SelectOption<string>[] = useMemo(
    () =>
      new Array(maxSequenceNumber).fill(0).map((item, index) => ({
        value: String(index),
        content: String(index + 1)
      })),
    [maxSequenceNumber]
  );

  return (
    <Card className={classNames(cls.EditableTextBlock, {}, [className])}>
      <Select
        options={sequenceNumberOptions}
        value={String(item.sequenceNumber)}
        label={t('sequency number')}
        onChange={onSequenceChange}
      />

      <Text size={TextSize.L} title={t('text block')} />

      <TextInput className={cls.title} value={item.title} onChange={onTitleChange} />

      <Text className={cls.paragraphsTitle} size={TextSize.M} title={t('paragraphs')} />

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

      <Button className={cls.addParagraph} onClick={onAddParagraph} variant={ButtonVariant.CLEAR}>
        {t('add paragraph')}
      </Button>
    </Card>
  );
});
