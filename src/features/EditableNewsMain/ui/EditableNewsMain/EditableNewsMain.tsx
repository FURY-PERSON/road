import { memo, FC, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { ImageInput } from 'shared/ui/ImageInput/ImageInput';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import cls from './EditableNewsMain.module.scss';

interface EditableNewsMainProps {
  className?: string;
  title?: string,
  subTitle?: string,
  mainText?: string,
  image?: string,
  onImageChange?: (image?: string) => void,
  onRemoveImage?: () => void,
  onTitleChange?: (title: string) => void
  onSubTitleChange?: (subTitle: string) => void
  onMainTextChange?: (mainText: string) => void
}

export const EditableNewsMain:FC<EditableNewsMainProps> = memo((props) => {
  const {
    className, onImageChange, onMainTextChange, onRemoveImage, onSubTitleChange, onTitleChange, image, mainText, subTitle, title, 
  } = props;

  const { t } = useTranslation('news');

  const onImageChangeHandler = useCallback((image?: File | null) => {
    onImageChange?.(image ? URL.createObjectURL(image) : '');
  }, [onImageChange]);

  return (
    <Card className={classNames(cls.EditableNewsMain, {}, [className])}>
      <TextInput className={cls.title} value={title} onChange={onTitleChange} label={t('title')} />
      <TextInput className={cls.subTitle} value={subTitle} onChange={onSubTitleChange} label={t('subTitle')} />

      <ImageInput className={cls.image} onImageChange={onImageChangeHandler} image={image} omImageRemove={onRemoveImage} />

      <TextInput className={cls.mainText} value={mainText} onChange={onMainTextChange} label={t('mainText')} />
    </Card>
  );
});
