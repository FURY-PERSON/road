import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { BlocksFilters } from '@/widgets/BlocksFilters';

import { getOrder, getFloor, getNumber } from '../../model/selectors/blocksPAge';
import { fetchList } from '../../model/services/fetchList/fetchList';
import { blocksPageActions } from '../../model/slice/blocksPage.slice';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const order = useSelector(getOrder);
  const number = useSelector(getNumber);
  const floor = useSelector(getFloor);

  const refetchBlocks = useCallback(() => {
    dispatch(fetchList({ replace: true }));
  }, [dispatch]);

  const debouncedRefetchBlocks = useDebounce(refetchBlocks, 500);

  const onChangeOrder = useCallback(
    (value: SortOrder) => {
      dispatch(blocksPageActions.setOrder(value));
      dispatch(blocksPageActions.setPage(1));
      refetchBlocks();
    },
    [dispatch, refetchBlocks]
  );

  const onChangeNumber = useCallback(
    (value: string) => {
      dispatch(blocksPageActions.setNumber(value));
      dispatch(blocksPageActions.setPage(1));
      debouncedRefetchBlocks();
    },
    [dispatch, debouncedRefetchBlocks]
  );

  const onChangeFloor = useCallback(
    (value: string | 'none') => {
      dispatch(blocksPageActions.setFloor(value));

      dispatch(blocksPageActions.setPage(1));
      refetchBlocks();
    },
    [dispatch, refetchBlocks]
  );

  return (
    <BlocksFilters
      order={order}
      onChangeOrder={onChangeOrder}
      floor={floor}
      onChangeFloor={onChangeFloor}
      number={number}
      onChangeNumber={onChangeNumber}
      className={className}
    />
  );
});
