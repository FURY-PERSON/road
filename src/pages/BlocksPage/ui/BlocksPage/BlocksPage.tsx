import { useCallback, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { StickyContentLayout } from '@/shared/ui/redesigned/layouts/StickyContentLayout';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { BlocksList } from '@/entities/Block';

import { initPage } from '../../model/services/initPage/initPage';
import { getError, getLoading } from '../../model/selectors/blocksPage';
import { fetchNextPage } from '../../model/services/fetchNextPage/fetchNextPage';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import {
  blocksPageActions,
  blocksPageReducer,
  getBlocks
} from '../../model/slice/blocksPage.slice';
import { BlocksPageParam } from '../../model/types/params';

import clsR from './BlocksPage.module.scss';

const reducers: ReducersList = {
  blocksPage: blocksPageReducer
};

export const BlocksPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { dormId } = useParams<BlocksPageParam>();

  useEffect(() => {
    dispatch(initPage({ dormId, searchParams }));

    return () => {
      dispatch(blocksPageActions.reset());
    };
  }, []);

  const blocks = useSelector(getBlocks.selectAll);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);

  const loadNextPage = useCallback(() => {
    dispatch(fetchNextPage({ dormId }));
  }, [dispatch, dormId]);

  if (error) {
    return <Text title={error} variant="error" size="M" />;
  }

  if (!dormId) {
    return <Text title={t('unexpected error')} variant="error" size="M" />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <StickyContentLayout
        right={<FiltersContainer dormId={dormId} />}
        content={
          <Page testId="BlocksPage" onScrollEnd={loadNextPage} className={clsR.main}>
            <BlocksList className={clsR.list} blocks={blocks} isLoading={isLoading} />
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};
