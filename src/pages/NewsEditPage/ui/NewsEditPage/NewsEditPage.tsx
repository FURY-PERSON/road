import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { CreateAndEditNews, NewsTools } from '@/widgets/CreateAndEditNews';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';

import cls from './NewsEditPage.module.scss';
import clsR from './NewsEditPage.redesigned.module.scss';

interface NewsEditPageProps {
  className?: string;
}

export const NewsEditPage: FC<NewsEditPageProps> = memo((props) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('news');

  const isEdit = Boolean(id);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <Page className={classNames(cls.NewsEditPage, {}, [className])}>
          <Text title={isEdit ? t('edit news') : t('create new')} />

          <CreateAndEditNews id={id} />
        </Page>
      }
      on={
        <StickyContentLayout
          right={<NewsTools />}
          content={
            <Page className={classNames(clsR.NewsEditPage, {}, [className])}>
              <CreateAndEditNews id={id} />
            </Page>
          }
        />
      }
    />
  );
});
