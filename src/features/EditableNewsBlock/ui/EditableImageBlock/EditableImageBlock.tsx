import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { ImageInput } from 'shared/ui/ImageInput/ImageInput';
import { Card } from 'shared/ui/Card/Card';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './EditableImageBlock.module.scss';
import { EditableNewsBlockImage, EditableNewsBlockImageHandlers } from '../../model/types/editableNewsBlock';

interface EditableImageBlockProps extends EditableNewsBlockImageHandlers {
  className?: string;
  item: EditableNewsBlockImage
}

export const EditableImageBlock:FC<EditableImageBlockProps> = memo((props) => {
  const {
    className, item, onImageChange, onRemoveImage, onTitleChange, 
  } = props;

  const { t } = useTranslation('news');

  const onImageChangeHandler = (image?: File | null) => {
    onImageChange?.(image ? URL.createObjectURL(image) : '');
  };

  return (
    <Card className={classNames(cls.EditableImageBlock, {}, [className])}>
      <Text size={TextSize.L} title={t('image block')} />

      <ImageInput className={cls.image} onImageChange={onImageChangeHandler} image={item.image} omImageRemove={onRemoveImage} />

      <TextInput className={cls.title} value={item.title} onChange={onTitleChange} label={t('image subtitle')} />
    </Card>
  );
});
