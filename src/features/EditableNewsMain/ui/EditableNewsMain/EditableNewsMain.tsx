import { memo, FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { ImageInput } from '@/shared/ui/deprecated/ImageInput/ImageInput';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Dorm } from '@/entities/Dorm';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';

import cls from './EditableNewsMain.module.scss';

interface EditableNewsMainProps {
  className?: string;
  title?: string;
  subTitle?: string;
  mainText?: string;
  image?: string;
  dorms?: Dorm[];
  selectedDorm?: Dorm;
  onDormChange?: (dormId?: string) => void;
  onImageChange?: (image?: string) => void;
  onRemoveImage?: () => void;
  onTitleChange?: (title: string) => void;
  onSubTitleChange?: (subTitle: string) => void;
  onMainTextChange?: (mainText: string) => void;
}

export const EditableNewsMain: FC<EditableNewsMainProps> = memo((props) => {
  const {
    className,
    onImageChange,
    onMainTextChange,
    onRemoveImage,
    onSubTitleChange,
    onTitleChange,
    image,
    mainText,
    subTitle,
    title,
    dorms,
    onDormChange,
    selectedDorm
  } = props;

  const { t } = useTranslation('news');

  const onImageChangeHandler = useCallback(
    (image?: File | null) => {
      onImageChange?.(image ? URL.createObjectURL(image) : '');
    },
    [onImageChange]
  );

  const selectItems: SelectOption<string>[] | undefined = useMemo(
    () => dorms?.map((dorm) => ({ value: dorm.id, content: dorm.name })),
    [dorms]
  );

  return (
    <Card className={classNames(cls.EditableNewsMain, {}, [className])}>
      <TextInput className={cls.title} value={title} onChange={onTitleChange} label={t('title')} />
      <TextInput
        className={cls.subTitle}
        value={subTitle}
        onChange={onSubTitleChange}
        label={t('subTitle')}
      />

      <Select
        className={cls.dorm}
        value={selectedDorm?.id}
        onChange={onDormChange}
        label={t('select dorm')}
        options={selectItems}
      />

      <ImageInput
        className={cls.image}
        onImageChange={onImageChangeHandler}
        image={image}
        omImageRemove={onRemoveImage}
      />

      <TextInput
        className={cls.mainText}
        value={mainText}
        onChange={onMainTextChange}
        label={t('mainText')}
      />
    </Card>
  );
});
