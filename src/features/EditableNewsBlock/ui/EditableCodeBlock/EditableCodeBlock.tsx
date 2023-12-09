import { memo, FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TextInput as TextInputDeprecated } from '@/shared/ui/deprecated/TextInput/TextInput';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import {
  EditableNewsBlockCode,
  EditableNewsBlockCodeHandlers
} from '../../model/types/editableNewsBlock';

import cls from './EditableCodeBlock.module.scss';

interface EditableCodeBlockProps extends EditableNewsBlockCodeHandlers {
  className?: string;
  item: EditableNewsBlockCode;
  maxSequenceNumber: number;
}

export const EditableCodeBlock: FC<EditableCodeBlockProps> = memo((props) => {
  const { className, item, onCodeChange, maxSequenceNumber, onSequenceNumberChange } = props;

  const { t } = useTranslation('news');

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
    <ToggleFeatures
      feature="newDesign"
      off={
        <CardDeprecated className={classNames(cls.EditableCodeBlock, {}, [className])}>
          <Select
            options={sequenceNumberOptions}
            value={String(item.sequenceNumber)}
            label={t('sequency number')}
            onChange={onSequenceChange}
          />

          <TextDeprecated size={TextSize.L} title={t('code block')} />

          <TextInputDeprecated
            multiline
            className={cls.code}
            value={item?.code}
            onChange={onCodeChange}
          />
        </CardDeprecated>
      }
      on={
        <Card fullWidth>
          <VStack gap={4} max>
            <ListBox
              items={sequenceNumberOptions}
              value={String(item.sequenceNumber)}
              label={t('sequency number')}
              onChange={onSequenceChange}
              direction="top right"
            />

            <Text size="M" title={t('code block')} />

            <Input value={item?.code} onChange={onCodeChange} />
          </VStack>
        </Card>
      }
    />
  );
});
