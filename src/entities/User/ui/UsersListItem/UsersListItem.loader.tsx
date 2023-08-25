import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import cls from './UsersListItem.module.scss';

interface UsersListItemLoaderProps {
  className?: string;
}

export const UsersListItemLoader: FC<UsersListItemLoaderProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.UsersListItem, {}, [className])}>
      <Card className={cls.card}>
        <div className={cls.header}>
          <Skeleton width={160} height={16} className={cls.author} />
          <Skeleton width={70} height={14} className={cls.title} />
        </div>

        <Skeleton width="100%" height={260} className={cls.image} />

        <Skeleton height={16} width={70} className={cls.tags} />

        <Skeleton width="100%" height={130} className={cls.mainText} />

        <div className={cls.footer}>
          <Skeleton width={120} height={64} className={cls.button} />
        </div>
      </Card>
    </div>
  );
});
