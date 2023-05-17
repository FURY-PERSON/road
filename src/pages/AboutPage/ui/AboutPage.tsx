import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';

export const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <Page>
      <Text title={t('dorm system')} />
    </Page>
  );
};
