import { memo, FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './ImageInput.module.scss';
import { Button, ButtonVariant } from '../Button/Button';

interface ImageInputProps {
  className?: string;
  onImageChange?: (image: File | null) => void,
  omImageRemove?: () => void
  image?: File | null | string
}

export const ImageInput:FC<ImageInputProps> = memo((props) => {
  const {
    className, onImageChange, image, omImageRemove, 
  } = props;

  const { t } = useTranslation();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onImageChange?.(event.target.files[0]);
    }
  };

  const onImageRemove = () => {
    omImageRemove?.();
  };
  
  return (
    <div className={classNames(cls.ImageInput, {}, [className])}>
      {image && (
        <div className={cls.imageWrapper}>
          <img
            className={cls.img}
            alt="not found"
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
          />

          <Button variant={ButtonVariant.OUTLINE} onClick={onImageRemove}>{t('remove')}</Button>
        </div>
      )}

      <input
        type="file"
        name="myImage"
        onChange={onInputChange}
      />
    </div>
  );
});
