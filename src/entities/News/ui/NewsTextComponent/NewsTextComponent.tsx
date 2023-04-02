import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './NewsTextComponent.module.scss';

interface NewsTextComponentProps {
  className?: string;
}

export const NewsTextComponent:FC<NewsTextComponentProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.NewsTextComponent, {}, [className])}></div>
  );
});
