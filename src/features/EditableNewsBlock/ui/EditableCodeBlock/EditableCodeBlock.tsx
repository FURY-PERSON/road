import {
  memo, FC, useCallback, useMemo, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { Card } from 'shared/ui/Card/Card';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import cls from './EditableCodeBlock.module.scss';
import { EditableNewsBlockCode, EditableNewsBlockCodeHandlers } from '../../model/types/editableNewsBlock';

interface EditableCodeBlockProps extends EditableNewsBlockCodeHandlers {
  className?: string;
  item: EditableNewsBlockCode
  maxSequenceNumber: number
}

export const EditableCodeBlock:FC<EditableCodeBlockProps> = memo((props) => {
  const {
    className, item, onCodeChange, maxSequenceNumber, onSequenceNumberChange, 
  } = props;

  const { t } = useTranslation('news');

  const onSequenceChange = useCallback((num: string) => {
    onSequenceNumberChange?.(+num);
  }, [onSequenceNumberChange]);

  const sequenceNumberOptions: SelectOption<string>[] = useMemo(
    () => new Array(maxSequenceNumber)
      .fill(0).map(
        (item, index) => ({
          value: String(index),
          content: String(index + 1), 
        }),
      ),
    [maxSequenceNumber],
  );

  return (
    <Card className={classNames(cls.EditableCodeBlock, {}, [className])}>
      <Select options={sequenceNumberOptions} value={String(item.sequenceNumber)} label={t('sequency number')} onChange={onSequenceChange} />

      <Text size={TextSize.L} title={t('code block')} />

      <TextInput multiline className={cls.code} value={item?.code} onChange={onCodeChange} />
    </Card>
  );
});
