import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './NewsImageComponent.module.scss';

interface NewsImageComponentProps {
  className?: string;
}

export const NewsImageComponent:FC<NewsImageComponentProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.NewsImageComponent, {}, [className])}></div>
  );
});
