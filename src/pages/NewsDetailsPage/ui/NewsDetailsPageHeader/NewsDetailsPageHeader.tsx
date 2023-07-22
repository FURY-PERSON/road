import { memo, FC, useCallback } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { AppRoutes, RoutePath } from '@/shared/constant/router';
import { useTranslation } from 'react-i18next';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNewsDetailsData } from '@/entities/News';
import cls from './NewsDetailsPageHeader.module.scss';
import { getCanEditNews } from '../../model/selectors/news';

interface NewsDetailsPageHeaderProps {
  className?: string;
}

export const NewsDetailsPageHeader:FC<NewsDetailsPageHeaderProps> = memo((props) => {
  const { className } = props;
  const { t } = useTranslation('news');
  const navigate = useNavigate();

  const canEdit = useSelector(getCanEditNews);
  const news = useSelector(getNewsDetailsData);

  const onEditClick = useCallback(() => {
    navigate('edit');
  }, [news?.id, navigate]);

  return (
    <div className={classNames(cls.NewsDetailsPageHeader, {}, [className])}>
      <AppLink to={RoutePath[AppRoutes.NEWS_DETAILS]} className={cls.back}>{t('back to list')}</AppLink>

      {canEdit
        ? <Button variant={ButtonVariant.OUTLINE} onClick={onEditClick}>{t('edit')}</Button>
        : null}
    </div>
  );
});
