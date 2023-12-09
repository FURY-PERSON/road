import { memo, FC } from 'react';

import { NewsImageBlock } from '@/entities/News/model/types/news';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

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
        fallback={
          <ToggleFeatures
            feature="newDesign"
            off={<SkeletonDeprecated width="100%" height={230} />}
            on={<Skeleton width="100%" height={230} />}
          />
        }
      />

      {block.title ? (
        <ToggleFeatures
          feature="newDesign"
          off={<TextDeprecated title={block.title} size={TextSize.M} />}
          on={<Text title={block.title} size="M" />}
        />
      ) : null}
    </div>
  );
});
