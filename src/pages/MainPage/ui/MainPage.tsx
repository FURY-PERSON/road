import { Counter } from 'entities/Counter';
import { PermissionName } from 'entities/Permission';
import { PermissionGuard } from 'features/PermissionGuard';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';
import styles from './styles.module.scss';
 
export const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page className={styles.main}>
      <div>{t('about page')}</div>
      <PermissionGuard permissionsNames={[PermissionName.ADMIN]}>
        <Counter />
      </PermissionGuard>
    </Page>
  );
};
