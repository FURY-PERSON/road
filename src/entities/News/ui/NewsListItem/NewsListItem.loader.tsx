import { memo, FC } from 'react';

import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';

import { NewsListVariant } from '../../model/types/news';

import { NewsListItemLoader as NewsListItemLoaderDeprecated } from './deprecated/NewsListItem.loader.deprecated';
import { NewsListItemLoader as NewsListItemLoaderRedesigned } from './redesidned/NewsListItem.loader.redesigned';

interface NewsListItemLoaderProps {
  className?: string;
  variant: NewsListVariant;
}

export const NewsListItemLoader: FC<NewsListItemLoaderProps> = memo((props) => {
  return (
    <ToggleFeatures
      feature="newDesign"
      off={<NewsListItemLoaderDeprecated {...props} />}
      on={<NewsListItemLoaderRedesigned {...props} />}
    />
  );
});
