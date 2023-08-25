import { memo, FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { ImageInput } from '@/shared/ui/ImageInput/ImageInput';
import { Card } from '@/shared/ui/Card/Card';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Select, SelectOption } from '@/shared/ui/Select/Select';

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
    <Card className={classNames(cls.EditableImageBlock, {}, [className])}>
      <Select
        options={sequenceNumberOptions}
        value={String(item.sequenceNumber)}
        label={t('sequency number')}
        onChange={onSequenceChange}
      />

      <Text size={TextSize.L} title={t('image block')} />

      <ImageInput
        className={cls.image}
        onImageChange={onImageChangeHandler}
        image={item.image}
        omImageRemove={onRemoveImage}
      />

      <TextInput
        className={cls.title}
        value={item.title}
        onChange={onTitleChange}
        label={t('image subtitle')}
      />
    </Card>
  );
});
