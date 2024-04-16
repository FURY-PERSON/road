import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/shared/ui/redesigned/Card';
import { NewsAdditionalInfo } from '@/widgets/NewsAdditionalInfo';
import { getNewsDetailsData } from '@/entities/News';

import { getCanEditNews } from '../../model/selectors/news';

import cls from './NewsAdditionalInfoContainer.module.scss';

export const NewsAdditionalInfoContainer = memo(() => {
  const navigate = useNavigate();

  const canEdit = useSelector(getCanEditNews);
  const news = useSelector(getNewsDetailsData);

  const onEditClick = useCallback(() => {
    if (!news) return;

    navigate('edit');
  }, [news?.id, navigate]);

  if (!news) {
    return null;
  }

  return (
    <Card padding="24" border="round" className={cls.card}>
      <NewsAdditionalInfo onEdit={onEditClick} news={news} canEdit={canEdit} />
    </Card>
  );
});
