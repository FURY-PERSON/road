import { memo, FC, SVGProps } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import SvgLoaderIcon from 'shared/assets/icons/catLoader.svg';
import cls from './SvgLoader.module.scss';

export enum SvgLoaderType {
  CAT_BLUE='cat blue'
}

interface SvgLoaderProps extends SVGProps<SVGSVGElement> {
  className?: string;
  type?: SvgLoaderType
}

const SvgLoaderMap: Record<SvgLoaderType, FC> = {
  [SvgLoaderType.CAT_BLUE]: SvgLoaderIcon,
};

export const SvgLoader:FC<SvgLoaderProps> = memo((props) => {
  const { className, type = SvgLoaderType.CAT_BLUE, ...otherProps} = props;

  return (
    <div className={classNames(cls.SvgLoader, {}, [className])}>
      {SvgLoaderMap[type]({...otherProps})}
    </div>
  );
});
