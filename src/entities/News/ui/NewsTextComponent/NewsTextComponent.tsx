import { memo, FC } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { NewsTextBlock } from '../../model/types/news';
import cls from './NewsTextComponent.module.scss';

interface NewsTextComponentProps {
  className?: string;
  block: NewsTextBlock
}

export const NewsTextComponent:FC<NewsTextComponentProps> = memo((props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.NewsTextComponent, {}, [className])}>
      {block.title
        ? <Text className={cls.title} title={block.title} size={TextSize.L} />
        : null}

      {block.paragraphs.map((paragraph, i) => (
        <Text key={i} className={cls.paragraph} text={paragraph} />
      ))}
    </div>
  );
});
