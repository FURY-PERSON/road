import { memo, FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { Button } from '../Button/Button';
import { Skeleton } from '../Skeleton/Skeleton';
import { AppImage } from '../../redesigned/AppImage/AppImage';
import { Card } from '../Card';
import { VStack } from '../Stack/VStack/VStack';

import cls from './ImageInput.module.scss';

interface ImageInputProps {
  className?: string;
  onImageChange?: (image: File | null) => void;
  omImageRemove?: () => void;
  image?: File | null | string;
}

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
    <Card className={classNames(cls.ImageInput, {}, [className])}>
      {image && (
        <VStack max gap={16}>
          <AppImage
            className={cls.img}
            alt="not found"
            fallback={<Skeleton width="100%" height={240} />}
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
          />

          <Button variant="outline" onClick={onImageRemove}>
            {t('remove')}
          </Button>
        </VStack>
      )}

      {!image ? (
        <input className={cls.input} type="file" name="myImage" onChange={onInputChange} />
      ) : null}
    </Card>
  );
});
