import { memo, FC } from 'react';

import { NewsCodeBlock } from '@/entities/News/model/types/news';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code/Code';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Code } from '@/shared/ui/redesigned/Code/Code';

import cls from './NewsCodeBlockComponent.module.scss';

interface NewsCodeBlockComponentProps {
  className?: string;
  block: NewsCodeBlock;
}

export const NewsCodeBlockComponent: FC<NewsCodeBlockComponentProps> = memo((props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.NewsCodeBlockComponent, {}, [className])}>
      <ToggleFeatures
        feature="newDesign"
        off={<CodeDeprecated>{block.code}</CodeDeprecated>}
        on={<Code>{block.code}</Code>}
      />
    </div>
  );
});
