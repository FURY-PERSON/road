import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Page } from '@/widgets/Page/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { BlocksList } from '@/entities/Block';

import { initPage } from '../../model/services/initPage/initPage';
import { getError, getLoading } from '../../model/selectors/blocksPAge';
import { fetchNextPage } from '../../model/services/fetchNextPage/fetchNextPage';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { blocksPageReducer, getBlocks } from '../../model/slice/blocksPage.slice';

import clsR from './BlocksPage.module.scss';

const reducers: ReducersList = {
  blocksPage: blocksPageReducer
};

export const BlocksPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initPage(searchParams));
  });

  const blocks = useSelector(getBlocks.selectAll);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);

  const loadNextPage = useCallback(() => {
    dispatch(fetchNextPage());
  }, [dispatch]);

  if (error) {
    return <Text title={error} variant="error" size="M" />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <StickyContentLayout
        right={<FiltersContainer />}
        content={
          <Page testId="BlocksPage" onScrollEnd={loadNextPage} className={clsR.main}>
            <BlocksList className={clsR.list} blocks={blocks} isLoading={isLoading} />
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};
