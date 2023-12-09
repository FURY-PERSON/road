import { memo, FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TextInput as TextInputDeprecated } from '@/shared/ui/deprecated/TextInput/TextInput';
import { ImageInput as ImageInputDeprecated } from '@/shared/ui/deprecated/ImageInput/ImageInput';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Dorm } from '@/entities/Dorm';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ImageInput } from '@/shared/ui/redesigned/ImageInput/ImageInput';

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

  const selectItemsDeprecated: SelectOption<string>[] | undefined = useMemo(
    () => dorms?.map((dorm) => ({ value: dorm.id, content: dorm.name })),
    [dorms]
  );

  const selectItems: ListBoxItem<string>[] | undefined = useMemo(
    () => dorms?.map((dorm) => ({ value: dorm.id, content: dorm.name })),
    [dorms]
  );

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <CardDeprecated className={classNames(cls.EditableNewsMain, {}, [className])}>
          <TextInputDeprecated
            className={cls.title}
            value={title}
            onChange={onTitleChange}
            label={t('title')}
          />
          <TextInputDeprecated
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
            options={selectItemsDeprecated}
          />

          <ImageInputDeprecated
            className={cls.image}
            onImageChange={onImageChangeHandler}
            image={image}
            omImageRemove={onRemoveImage}
          />

          <TextInputDeprecated
            className={cls.mainText}
            value={mainText}
            onChange={onMainTextChange}
            label={t('mainText')}
          />
        </CardDeprecated>
      }
      on={
        <Card fullWidth>
          <VStack gap={16}>
            <Input value={title} onChange={onTitleChange} label={t('title')} />
            <Input value={subTitle} onChange={onSubTitleChange} label={t('subTitle')} />

            <ListBox<string>
              value={selectedDorm?.id}
              onChange={onDormChange}
              label={t('select dorm')}
              items={selectItems}
            />

            <ImageInput
              onImageChange={onImageChangeHandler}
              image={image}
              omImageRemove={onRemoveImage}
            />

            <Input value={mainText} onChange={onMainTextChange} label={t('mainText')} />
          </VStack>
        </Card>
      }
    />
  );
});
