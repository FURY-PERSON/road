import ListIcon from '@/shared/assets/icons/list.svg';
import GridIcon from '@/shared/assets/icons/grid.svg';
import { NewsListVariant } from '@/entities/News';

export const viewTypes = [
  {
    view: NewsListVariant.BLOCK,
    Icon: GridIcon,
  },
  {
    view: NewsListVariant.LIST,
    Icon: ListIcon,
  },
];