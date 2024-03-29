import { memo, FC, useMemo, HTMLAttributeAnchorTarget } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';

import { News, NewsListVariant } from '../../model/types/news';
import { NewsListItem } from '../NewsListItem/NewsListItem';
import { NewsListItemLoader } from '../NewsListItem/NewsListItem.loader';

import cls from './NewsList.module.scss';

interface NewsListProps {
  className?: string;
  news?: News[];
  isLoading?: boolean;
  variant: NewsListVariant;
  target?: HTMLAttributeAnchorTarget;
  testId?: string;
}

export const NewsList: FC<NewsListProps> = memo((props) => {
  const { className, isLoading, news, variant, target, testId } = props;

  const skeletonAmount = useMemo(() => (variant === NewsListVariant.LIST ? 3 : 12), [variant]);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.NewsList, {}, [className])} data-testId={testId}>
          {news?.map((item) => (
            <NewsListItem key={item.id} target={target} variant={variant} news={item} />
          ))}

          {isLoading
            ? new Array(skeletonAmount)
                .fill(0)
                .map((s, i) => <NewsListItemLoader key={i} variant={variant} />)
            : null}
        </div>
      }
      on={
        <HStack
          gap={16}
          className={classNames(cls.NewsListRedesigned, {}, [className])}
          data-testId={testId}
          wrap="wrap"
        >
          {news?.map((item) => (
            <NewsListItem key={item.id} target={target} variant={variant} news={item} />
          ))}

          {isLoading
            ? new Array(skeletonAmount)
                .fill(0)
                .map((s, i) => <NewsListItemLoader key={i} variant={variant} />)
            : null}
        </HStack>
      }
    />
  );
});
