import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { UsersList } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';

import { initUsersPage } from '../../model/services/initUsersPage/initUsersPage';
import { UsersPageFilter } from '../UsersPageFilter/UsersPageFilter';
import { getUsers, usersPageReducer } from '../../model/slice/usersPage.slice';
import { getError, getLoading } from '../../model/selectors/usersPage';
import { fetchNextUsersPage } from '../../model/services/fetchNextUsersPage/fetchNextUsersPage';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

import cls from './UsersPage.module.scss';
import clsR from './UsersPage.redesigned.module.scss';

interface UsersPageProps {
  className?: string;
}

const reducers: ReducersList = {
  usersPage: usersPageReducer
};

export const UsersPage: FC<UsersPageProps> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initUsersPage(searchParams));
  });

  const users = useSelector(getUsers.selectAll);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);

  const loadNextPage = useCallback(() => {
    dispatch(fetchNextUsersPage());
  }, [dispatch]);

  if (error) {
    return <Text title={error} variant={TextVariant.ERROR} />;
  }

  const content = (
    <ToggleFeatures
      feature="newDesign"
      off={
        <Page
          onScrollEnd={loadNextPage}
          className={classNames(cls.UsersPage, {}, [className])}
          testId="UsersPage"
        >
          <div className={cls.inner}>
            <UsersPageFilter className={cls.filter} />

            <UsersList className={cls.list} users={users} isLoading={isLoading} />
          </div>
        </Page>
      }
      on={
        <StickyContentLayout
          right={<FiltersContainer />}
          content={
            <Page testId="UsersPage" onScrollEnd={loadNextPage} className={clsR.main}>
              <UsersList className={clsR.list} users={users} isLoading={isLoading} />
            </Page>
          }
        />
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};
