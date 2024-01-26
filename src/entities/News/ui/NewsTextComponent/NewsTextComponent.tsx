import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { NewsTextBlock } from '../../model/types/news';

import cls from './NewsTextComponent.module.scss';

interface NewsTextComponentProps {
  className?: string;
  block: NewsTextBlock;
}

export const NewsTextComponent: FC<NewsTextComponentProps> = memo((props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.NewsTextComponent, {}, [className])}>
      {block.title ? (
        <ToggleFeatures
          feature="newDesign"
          off={<TextDeprecated className={cls.title} title={block.title} size={TextSize.L} />}
          on={<Text className={cls.title} title={block.title} size="L" />}
        />
      ) : null}

      {block.paragraphs?.map((paragraph, i) => (
        <ToggleFeatures
          feature="newDesign"
          off={<TextDeprecated key={i} className={cls.paragraph} text={paragraph} />}
          on={<Text key={i} className={cls.paragraph} text={paragraph} />}
        />
      ))}
    </div>
  );
});
