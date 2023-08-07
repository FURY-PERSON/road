import {
  memo, FC, useState, ImgHTMLAttributes, useLayoutEffect, 
} from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './AppImage.module.scss';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: JSX.Element
  errorFallback?: JSX.Element
}

export const AppImage:FC<AppImageProps> = memo((props) => {
  const {
    className, src, alt, fallback, errorFallback, ...otherProps 
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return (
    <img className={classNames(cls.AppImage, {}, [className])} src={src} alt={alt} {...otherProps} />
  );
});
