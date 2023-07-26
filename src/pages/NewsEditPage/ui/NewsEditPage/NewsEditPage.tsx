import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { CreateAndEditNews } from '@/widgets/CreateAndEditNews';
import { Text } from '@/shared/ui/Text/Text';
import cls from './NewsEditPage.module.scss';

interface NewsEditPageProps {
  className?: string;
}

export const NewsEditPage:FC<NewsEditPageProps> = memo((props) => {
  const { className } = props;
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('news');

  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.NewsEditPage, {}, [className])}>
      <Text title={isEdit ? t('edit news') : t('create new')} />

      <CreateAndEditNews id={id} />
    </Page>
  );
});
