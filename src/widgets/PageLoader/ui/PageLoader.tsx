import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader, SvgLoaderType } from '@/shared/ui/SvgLoader';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PageLoaderProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.PageLoader, {}, [className])}>
      <SvgLoader width={80} height={80} type={SvgLoaderType.CAT_BLUE} />
    </div>
  );
});
