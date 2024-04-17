import { memo, FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated, TextSize, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { routes } from '@/shared/constant/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { getNewsDetailsLoading } from '../../model/selectors/getNewsDetailsLoading/getNewsDetailsLoading';
import { fetchNewsById } from '../../model/services/fetchNewsById/fetchNewsById';
import { getNewsDetailsError } from '../../model/selectors/getNewsDetailsError/getNewsDetailsError';
import { getNewsDetailsData } from '../../model/selectors/getNewsDetailsData/getNewsDetailsData';
import { NewsBlock, NewsBlockType } from '../../model/types/news';
import { NewsTextComponent } from '../NewsTextComponent/NewsTextComponent';
import { NewsCodeBlockComponent } from '../NewsCodeBlockComponent/NewsCodeBlockComponent';
import { NewsImageComponent } from '../NewsImageComponent/NewsImageComponent';

import cls from './NewsDetails.module.scss';
import clsR from './NewsDetails.redesigned.module.scss';

export interface NewsDetailsProps {
  className?: string;
  id: string;
}

const renderBlock = (block: NewsBlock) => {
  switch (block.type) {
    case NewsBlockType.TEXT:
      return <NewsTextComponent key={block.id} className={cls.block} block={block} />;
    case NewsBlockType.CODE:
      return <NewsCodeBlockComponent key={block.id} className={cls.block} block={block} />;
    case NewsBlockType.IMAGE:
      return <NewsImageComponent key={block.id} className={cls.block} block={block} />;
    default:
      return null;
  }
};

export const NewsDetails: FC<NewsDetailsProps> = memo((props) => {
  const { id, className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('news');

  const isLoading = useSelector(getNewsDetailsLoading);
  const error = useSelector(getNewsDetailsError);
  const news = useSelector(getNewsDetailsData);

  const sortedBlocks = useMemo(
    () => news?.blocks && [...news.blocks].sort((a, b) => a.sequenceNumber - b.sequenceNumber),
    [news?.blocks]
  );
  // TODO create sequence map to avoid sort
  useInitialEffect(() => {
    dispatch(fetchNewsById({ id }));
  });

  if (isLoading) {
    return (
      <div className={cls.loading}>
        <SkeletonDeprecated className={cls.image} width="100%" height={230} />
        <SkeletonDeprecated className={cls.skeleton} width={300} height={32} />
        <SkeletonDeprecated className={cls.skeleton} width={600} height={24} />
        <SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
        <SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
        <SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
        <SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cls.error}>
        <TextDeprecated variant={TextVariant.ERROR} title={error} />
      </div>
    );
  }

  if (!news) {
    return (
      <div className={cls.error}>
        <TextDeprecated variant={TextVariant.ERROR} title={t('can not find news')} />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <>
          <CardDeprecated className={cls.card}>
            {news.imageUrl ? (
              <AppImage
                src={`${__API__}/static/${news.imageUrl}`}
                className={cls.image}
                alt="news"
                fallback={<SkeletonDeprecated width="100%" height={230} />}
              />
            ) : null}

            <TextDeprecated
              className={cls.title}
              size={TextSize.XL}
              title={news.title}
              text={news.subTitle}
            />
            <TextDeprecated className={cls.mainText} size={TextSize.M} title={news.mainText} />

            <div className={cls.section}>
              <TextDeprecated className={cls.label} size={TextSize.M} title={t('author')} />
              <AppLink to={routes.profile(news.author.login)}>
                <TextDeprecated className={cls.title} size={TextSize.M} title={news.author.login} />
              </AppLink>
            </div>

            <div className={cls.section}>
              <TextDeprecated className={cls.label} size={TextSize.M} text={t('dorm')} />
              <TextDeprecated className={cls.title} size={TextSize.M} text={news.dorm.name} />
            </div>

            <div className={cls.section}>
              <TextDeprecated className={cls.label} size={TextSize.M} text={t('created at')} />
              <TextDeprecated className={cls.title} size={TextSize.M} text={news.createdAt} />
            </div>
          </CardDeprecated>

          {sortedBlocks?.map((block) => renderBlock(block))}
        </>
      }
      on={
        <VStack gap={16} max className={classNames(clsR.NewsDetails, {}, [className])}>
          <Text title={news?.title} size="L" bold />
          <Text title={news?.subTitle} size="M" />
          <AppImage
            fallback={<Skeleton width="100%" height={420} border="16px" />}
            src={news?.imageUrl}
            className={clsR.img}
          />
          {news?.blocks.map(renderBlock)}
        </VStack>
      }
    />
  );
});
