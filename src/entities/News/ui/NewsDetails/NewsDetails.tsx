import { memo, FC, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text, TextSize, TextVariant } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getNewsDetailsLoading } from '../../model/selectors/getNewsDetailsLoading/getNewsDetailsLoading';
import { fetchNewsById } from '../../model/services/fetchNewsById/fetchNewsById';
import cls from './NewsDetails.module.scss';
import { getNewsDetailsError } from '../../model/selectors/getNewsDetailsError/getNewsDetailsError';
import { getNewsDetailsData } from '../../model/selectors/getNewsDetailsData/getNewsDetailsData';
import { NewsBlock, NewsBlockType } from '../../model/types/news';
import { NewsTextComponent } from '../NewsTextComponent/NewsTextComponent';
import { NewsCodeBlockComponent } from '../NewsCodeBlockComponent/NewsCodeBlockComponent';
import { NewsImageComponent } from '../NewsImageComponent/NewsImageComponent';

export interface NewsDetailsProps {
  className?: string;
  id: string
}

const renderBlock = (block: NewsBlock) => {
  switch (block.type) {
  case NewsBlockType.TEXT:
    return <NewsTextComponent key={block.id} className={cls.block} block={block} />;
  case NewsBlockType.CODE:
    return <NewsCodeBlockComponent key={block.id} className={cls.block} block={block} />;
  case NewsBlockType.IMAGE:
    return <NewsImageComponent key={block.id} className={cls.block} block={block} />;
  default: return null;
  }
};

export const NewsDetails:FC<NewsDetailsProps> = memo((props) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const isLoading = useSelector(getNewsDetailsLoading);
  const error = useSelector(getNewsDetailsError);
  const news = useSelector(getNewsDetailsData);

  const sortedBlocks = useMemo(() => news?.blocks && [...news.blocks].sort((a, b) => a.sequenceNumber - b.sequenceNumber), [news?.blocks]);
  useInitialEffect(() => {
    dispatch(fetchNewsById({ id }));
  });

  if (isLoading) {
    return (
      <div className={cls.loading}>
        <Skeleton className={cls.image} width="100%" height={230} />
        <Skeleton className={cls.skeleton} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cls.error}>
        <Text variant={TextVariant.ERROR} title={error} />
      </div>
    );
  }

  return (
    <>
      {news?.imageUrl
        ? <img className={cls.image} src={news.imageUrl} alt="news" />
        : null}

      <Text className={cls.title} size={TextSize.XL} title={news?.title} text={news?.subTitle} />
      <Text className={cls.createdAt} text={news?.createdAt} />

      {sortedBlocks?.map((block) => renderBlock(block))}
    </>
  );
});
