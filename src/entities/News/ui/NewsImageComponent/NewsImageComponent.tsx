import { NewsImageBlock } from 'entities/News/model/types/news';
import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import cls from './NewsImageComponent.module.scss';

interface NewsImageComponentProps {
  className?: string;
  block: NewsImageBlock
}

export const NewsImageComponent:FC<NewsImageComponentProps> = memo((props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.NewsImageComponent, {}, [className])}>
      <img src={block.image} alt="news" />

      {block.title
        ? <Text title={block.title} size={TextSize.M} />
        : null}
    </div>
  );
});
