import { useTranslation } from 'react-i18next';
import styles from './NewsPage.module.scss';

export const NewsPage = () => {
  const { t } = useTranslation('news');
  return (
    <div className={styles.main}>

    </div>
  );
};
