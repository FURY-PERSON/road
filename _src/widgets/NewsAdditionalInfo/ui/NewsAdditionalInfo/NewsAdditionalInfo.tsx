import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { News } from '@/entities/News';
import { getDateWithTime } from '@/shared/lib/helpers/date/getDateWithTime';

import cls from './NewsAdditionalInfo.module.scss';

interface NewsAdditionalInfoProps {
  className?: string;
  onEdit: () => void;
  news: News;
  canEdit?: boolean;
}

export const NewsAdditionalInfo = memo((props: NewsAdditionalInfoProps) => {
  const { className, news, canEdit, onEdit } = props;
  const { t } = useTranslation();

  return (
    <VStack gap={32} className={classNames(cls.NewsAdditionalInfo, {}, [className])}>
      <VStack gap={8}>
        <Text text={news.author.login} bold />
        <Text text={getDateWithTime(news.createdAt)} />
      </VStack>

      {canEdit ? (
        <Button variant="outline" onClick={onEdit}>
          {t('edit')}
        </Button>
      ) : null}
    </VStack>
  );
});
