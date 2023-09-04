import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { PermissionName } from '@/entities/Permission';
import { PermissionGuard } from '@/features/PermissionGuard';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entities/Feedback';
import { useToggleFeatures } from '@/shared/lib/hooks/useToggleFeatures/useToggleFeatures';
import { Counter } from '@/entities/Counter';

import styles from './styles.module.scss';

export const MainPage = () => {
  const { t } = useTranslation('main');

  const ratingCard = useToggleFeatures({
    name: 'ratingCardOnMainPage',
    on: useCallback(() => <RatingCard hasFeedback />, []),
    off: () => null
  });

  return (
    <Page className={styles.main} testId="MainPage">
      <div>{t('about page')}</div>
      <PermissionGuard permissionsNames={[PermissionName.ADMIN]}>
        <Counter />
      </PermissionGuard>

      {ratingCard}
    </Page>
  );
};
