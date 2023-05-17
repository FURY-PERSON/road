import { FC, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { UsersList } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSearchParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { initUsersPage } from '../../model/services/initUsersPage/initUsersPage';
import { UsersPageFilter } from '../UsersPageFilter/UsersPageFilter';
import cls from './UsersPage.module.scss';
import { getUsers, usersPageReducer } from '../../model/slice/usersPage.slice';
import { getError, getLoading } from '../../model/selectors/usersPage';
import { fetchNextUsersPage } from '../../model/services/fetchNextUsersPage/fetchNextUsersPage';

interface UsersPageProps {
  className?: string;
}

const reducers: ReducersList = {
  usersPage: usersPageReducer,
};

export const UsersPage: FC<UsersPageProps> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initUsersPage(searchParams));
  });

  const news = useSelector(getUsers.selectAll);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);

  const loadNextPage = useCallback(() => {
    dispatch(fetchNextUsersPage());
  }, [dispatch]);

  if (error) {
    return <Text title={error} variant={TextVariant.ERROR} />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={loadNextPage} className={classNames(cls.UsersPage, {}, [className])}>
        <div className={cls.inner}>
          <UsersPageFilter className={cls.filter} />
  
          <UsersList className={cls.list} users={news} isLoading={isLoading} />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
};
