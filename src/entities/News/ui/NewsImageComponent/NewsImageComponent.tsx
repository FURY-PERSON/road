import { memo, FC } from 'react';

import { NewsImageBlock } from '@/entities/News/model/types/news';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { AppImage } from '@/shared/ui/deprecated/AppImage/AppImage';

import cls from './NewsImageComponent.module.scss';

interface NewsImageComponentProps {
  className?: string;
  block: NewsImageBlock;
}

export const NewsImageComponent: FC<NewsImageComponentProps> = memo((props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.NewsImageComponent, {}, [className])}>
      <AppImage
        className={cls.img}
        src={block.image}
        alt="news"
        fallback={<Skeleton width="100%" height={230} />}
      />

      {block.title ? <Text title={block.title} size={TextSize.M} /> : null}
    </div>
  );
});
