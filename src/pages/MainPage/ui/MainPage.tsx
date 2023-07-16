import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/Counter';
import { PermissionName } from '@/entities/Permission';
import { PermissionGuard } from '@/features/PermissionGuard';
import { Page } from '@/widgets/Page/Page';
import styles from './styles.module.scss';
import { RatingCard } from '@/entities/Rating';
 
export const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page className={styles.main}>
      <div>{t('about page')}</div>
      <PermissionGuard permissionsNames={[PermissionName.ADMIN]}>
        <RatingCard hasFeedback />
      </PermissionGuard>
    </Page>
  );
};
