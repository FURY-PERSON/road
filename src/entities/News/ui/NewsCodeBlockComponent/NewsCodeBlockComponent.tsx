import { memo, FC } from 'react';

import { NewsCodeBlock } from '@/entities/News/model/types/news';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Code } from '@/shared/ui/deprecated/Code/Code';

import cls from './NewsCodeBlockComponent.module.scss';

interface NewsCodeBlockComponentProps {
  className?: string;
  block: NewsCodeBlock;
}

export const NewsCodeBlockComponent: FC<NewsCodeBlockComponentProps> = memo((props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.NewsCodeBlockComponent, {}, [className])}>
      <Code>{block.code}</Code>
    </div>
  );
});
