import { useTranslation } from 'react-i18next';

import { PermissionName } from '@/entities/Permission';
import { PermissionGuard } from '@/features/PermissionGuard';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entities/Feedback';

import styles from './styles.module.scss';

export const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page className={styles.main} testId="MainPage">
      <div>{t('about page')}</div>
      <PermissionGuard permissionsNames={[PermissionName.ADMIN]}>
        <RatingCard hasFeedback />
      </PermissionGuard>
    </Page>
  );
};
