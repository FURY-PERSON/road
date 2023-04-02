import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './NewsCodeBlockComponent.module.scss';

interface NewsCodeBlockComponentProps {
  className?: string;
}

export const NewsCodeBlockComponent:FC<NewsCodeBlockComponentProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.NewsCodeBlockComponent, {}, [className])}></div>
  );
});
