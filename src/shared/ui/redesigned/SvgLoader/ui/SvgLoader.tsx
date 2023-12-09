import { memo, FC, SVGProps } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import SvgLoaderIcon from '@/shared/assets/icons/catLoader.svg';

import cls from './SvgLoader.module.scss';

export type SvgLoaderType = 'cat_blue';

interface SvgLoaderProps extends SVGProps<SVGSVGElement> {
  className?: string;
  type?: SvgLoaderType;
}

const SvgLoaderMap: Record<SvgLoaderType, FC> = {
  cat_blue: SvgLoaderIcon
};

export const SvgLoader: FC<SvgLoaderProps> = memo((props) => {
  const { className, type = 'cat_blue', ...otherProps } = props;

  return (
    <div className={classNames(cls.SvgLoader, {}, [className])}>
      {SvgLoaderMap[type]({ ...otherProps })}
    </div>
  );
});
