import { memo, FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { Button, ButtonVariant } from '../Button/Button';
import { Skeleton } from '../Skeleton/Skeleton';
import { AppImage } from '../AppImage/AppImage';

import cls from './ImageInput.module.scss';

interface ImageInputProps {
  className?: string;
  onImageChange?: (image: File | null) => void;
  omImageRemove?: () => void;
  image?: File | null | string;
}

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export const ImageInput: FC<ImageInputProps> = memo((props) => {
  const { className, onImageChange, image, omImageRemove } = props;

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
          <AppImage
            className={cls.img}
            alt="not found"
            fallback={<Skeleton width="100%" height={240} />}
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
          />

          <Button variant={ButtonVariant.OUTLINE} onClick={onImageRemove}>
            {t('remove')}
          </Button>
        </div>
      )}

      <input type="file" name="myImage" onChange={onInputChange} />
    </div>
  );
});
