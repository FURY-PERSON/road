import { memo, FC, HTMLAttributeAnchorTarget } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import { User } from '../../model/types/user';
import { UsersListItem } from '../UsersListItem/UsersListItem';
import { UsersListItemLoader } from '../UsersListItem/UsersListItem.loader';

import cls from './UsersList.module.scss';

interface UsersListProps {
  className?: string;
  users?: User[];
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export const UsersList: FC<UsersListProps> = memo((props) => {
  const { className, isLoading, users, target } = props;

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.UsersList, {}, [className])}>
          {users?.map((item) => (
            <UsersListItem key={item.id} target={target} user={item} className={cls.item} />
          ))}

          {isLoading ? new Array(8).fill(0).map((s, i) => <UsersListItemLoader key={i} />) : null}
        </div>
      }
      on={
        <VStack wrap="wrap" max gap={16} className={classNames('', {}, [className])}>
          {users?.map((item) => (
            <UsersListItem key={item.id} target={target} user={item} className={cls.item} />
          ))}

          {isLoading ? new Array(8).fill(0).map((s, i) => <UsersListItemLoader key={i} />) : null}
        </VStack>
      }
    />
  );
});
