import { memo, FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TextInput as TextInputDeprecated } from '@/shared/ui/deprecated/TextInput/TextInput';
import { ImageInput as ImageInputDeprecated } from '@/shared/ui/deprecated/ImageInput/ImageInput';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ImageInput } from '@/shared/ui/redesigned/ImageInput/ImageInput';

import {
  EditableNewsBlockImage,
  EditableNewsBlockImageHandlers
} from '../../model/types/editableNewsBlock';

import cls from './EditableImageBlock.module.scss';

interface EditableImageBlockProps extends EditableNewsBlockImageHandlers {
  className?: string;
  item: EditableNewsBlockImage;
  maxSequenceNumber: number;
}

export const EditableImageBlock: FC<EditableImageBlockProps> = memo((props) => {
  const {
    className,
    item,
    onImageChange,
    onRemoveImage,
    onTitleChange,
    maxSequenceNumber,
    onSequenceNumberChange
  } = props;

  const { t } = useTranslation('news');
  const onImageChangeHandler = useCallback(
    (image?: File | null) => {
      onImageChange?.(image ? URL.createObjectURL(image) : '');
    },
    [onImageChange]
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
        <CardDeprecated className={classNames(cls.EditableImageBlock, {}, [className])}>
          <Select
            options={sequenceNumberOptions}
            value={String(item.sequenceNumber)}
            label={t('sequency number')}
            onChange={onSequenceChange}
          />

          <TextDeprecated size={TextSize.L} title={t('image block')} />

          <ImageInputDeprecated
            className={cls.image}
            onImageChange={onImageChangeHandler}
            image={item.image}
            omImageRemove={onRemoveImage}
          />

          <TextInputDeprecated
            className={cls.title}
            value={item.title}
            onChange={onTitleChange}
            label={t('image subtitle')}
          />
        </CardDeprecated>
      }
      on={
        <Card className={classNames('', {}, [className])} fullWidth>
          <VStack gap={8}>
            <ListBox
              items={sequenceNumberOptions}
              value={String(item.sequenceNumber)}
              label={t('sequency number')}
              onChange={onSequenceChange}
              direction="top right"
            />

            <Text size="L" title={t('image block')} />

            <ImageInput
              onImageChange={onImageChangeHandler}
              image={item.image}
              omImageRemove={onRemoveImage}
            />

            <Input value={item.title} onChange={onTitleChange} label={t('image subtitle')} />
          </VStack>
        </Card>
      }
    />
  );
});
