import { memo, FC, HTMLAttributeAnchorTarget } from 'react';

import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';

import { News, NewsListVariant } from '../../model/types/news';

import { NewsListItem as NewsListItemDeprecated } from './deprecated/NewsListItem.deprecated';
import { NewsListItem as NewsListItemRedesigned } from './redesidned/NewsListItem.redesigned';

interface NewsListItemProps {
  className?: string;
  news: News;
  variant: NewsListVariant;
  target?: HTMLAttributeAnchorTarget;
}

export const NewsListItem: FC<NewsListItemProps> = memo((props) => {
  return (
    <ToggleFeatures
      feature="newDesign"
      off={<NewsListItemDeprecated {...props} />}
      on={<NewsListItemRedesigned {...props} />}
    />
  );
});
