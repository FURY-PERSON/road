import { NewsDetails } from 'entities/News';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cls from './NewsDetailsPage.module.scss';

export const NewsDetailsPage = () => {
  const { t } = useTranslation('news');
  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <div className={cls.notFound}>
        <div className={cls.notFound__text}>{t('news not found')}</div>
      </div>
    );
  }

  return (
    <div className={cls.main}>
      <NewsDetails id={id} />
    </div>
  );
};
