import { memo, FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TextInput as TextInputDeprecated } from '@/shared/ui/deprecated/TextInput/TextInput';
import { Button as ButtonDeprecated, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

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
    <ToggleFeatures
      feature="newDesign"
      off={
        <CardDeprecated className={classNames(cls.EditableTextBlock, {}, [className])}>
          <Select
            options={sequenceNumberOptions}
            value={String(item.sequenceNumber)}
            label={t('sequency number')}
            onChange={onSequenceChange}
          />

          <TextDeprecated size={TextSize.L} title={t('text block')} />

          <TextInputDeprecated className={cls.title} value={item.title} onChange={onTitleChange} />

          <TextDeprecated
            className={cls.paragraphsTitle}
            size={TextSize.M}
            title={t('paragraphs')}
          />

          <div className={cls.paragraphs}>
            {item.paragraphs?.map((paragraph) => (
              <TextInputDeprecated
                className={cls.paragraph}
                key={paragraph.localId}
                value={paragraph.text}
                onChange={changeParagraphHandler(paragraph.localId)}
              />
            ))}
          </div>

          <ButtonDeprecated
            className={cls.addParagraph}
            onClick={onAddParagraph}
            variant={ButtonVariant.CLEAR}
          >
            {t('add paragraph')}
          </ButtonDeprecated>
        </CardDeprecated>
      }
      on={
        <Card className={classNames('', {}, [className])} fullWidth>
          <VStack gap={8} max>
            <ListBox
              items={sequenceNumberOptions}
              value={String(item.sequenceNumber)}
              label={t('sequency number')}
              onChange={onSequenceChange}
              direction="top right"
            />

            <Text size="L" title={t('text block')} />

            <Input value={item.title} onChange={onTitleChange} />

            <Text size="M" title={t('paragraphs')} />

            <VStack gap={4}>
              {item.paragraphs?.map((paragraph) => (
                <Input
                  key={paragraph.localId}
                  value={paragraph.text}
                  onChange={changeParagraphHandler(paragraph.localId)}
                />
              ))}
            </VStack>

            <Button
              className={cls.addParagraph}
              onClick={onAddParagraph}
              variant={ButtonVariant.CLEAR}
            >
              {t('add paragraph')}
            </Button>
          </VStack>
        </Card>
      }
    />
  );
});
