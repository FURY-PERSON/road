import ListIconDeprecated from '@/shared/assets/icons/list.svg';
import GridIcon from '@/shared/assets/icons/grid.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import { NewsListVariant } from '@/entities/News';
import { toggleFeatures } from '@/shared/lib/helpers/toggleFeatureFlag/toggleFeatureFlag';

export const viewTypes = [
  {
    view: NewsListVariant.BLOCK,
    Icon: toggleFeatures({
      name: 'newDesign',
      on: () => TiledIcon,
      off: () => GridIcon
    })
  },
  {
    view: NewsListVariant.LIST,
    Icon: toggleFeatures({
      name: 'newDesign',
      on: () => ListIcon,
      off: () => ListIconDeprecated
    })
  }
];
