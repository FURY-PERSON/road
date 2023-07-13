import {
  memo, FC, HTMLAttributeAnchorTarget, 
} from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './UsersList.module.scss';
import { User } from '../../model/types/user';
import { UsersListItem } from '../UsersListItem/UsersListItem';
import { UsersListItemLoader } from '../UsersListItem/UsersListItem.loader';

interface UsersListProps {
  className?: string;
  users?: User[],
  isLoading?: boolean,
  target?: HTMLAttributeAnchorTarget
}

export const UsersList:FC<UsersListProps> = memo((props) => {
  const {
    className, isLoading, users, target,
  } = props;

  return (
    <div className={classNames(cls.usersList, {}, [className])}>
      {users?.map((item) => <UsersListItem key={item.id} target={target} user={item} className={cls.item} />)}

      {isLoading
        ? new Array(8).fill(0).map((s, i) => <UsersListItemLoader key={i} />)
        : null }
    </div>
  );
});
