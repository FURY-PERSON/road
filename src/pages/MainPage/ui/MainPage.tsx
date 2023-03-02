import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <div className={styles.main}>{t('about page')}</div>
  );
};
