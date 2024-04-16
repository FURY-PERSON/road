import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Button, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { getNewsDetailsData } from '@/entities/News';
import { routes } from '@/shared/constant/router';

import { getCanEditNews } from '../../model/selectors/news';

import cls from './NewsDetailsPageHeader.module.scss';

interface NewsDetailsPageHeaderProps {
  className?: string;
}

export const NewsDetailsPageHeader: FC<NewsDetailsPageHeaderProps> = memo((props) => {
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
      <AppLink to={routes.news()} className={cls.back}>
        {t('back to list')}
      </AppLink>

      {canEdit ? (
        <Button variant={ButtonVariant.OUTLINE} onClick={onEditClick}>
          {t('edit')}
        </Button>
      ) : null}
    </div>
  );
});
