import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ForbiddenView.module.scss';

interface ForbiddenViewProps {
  className?: string;
}

export const ForbiddenView:FC<ForbiddenViewProps> = memo((props) => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ForbiddenView, {}, [className])}>
      <div className={cls.title}>{t('you have not enough permissions')}</div>
      <div className={cls.subTitle}>{t('connect with your manager')}</div>
    </div>
  );
});
