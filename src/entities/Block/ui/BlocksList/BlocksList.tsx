import { memo, FC, HTMLAttributeAnchorTarget } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import { BlockListItemLoader } from '../BlockListItem/BlockListItem.loader';
import { Block } from '../../model/types/block';
import { BlockListItem } from '../BlockListItem/BlockListItem';

import cls from './BlocksList.module.scss';

interface BlocksListProps {
  className?: string;
  blocks?: Block[];
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export const BlocksList: FC<BlocksListProps> = memo((props) => {
  const { className, isLoading, blocks, target } = props;

  return (
    <VStack wrap="wrap" max gap={16} className={classNames('', {}, [className])}>
      {blocks?.map((item) => (
        <BlockListItem key={item.id} target={target} block={item} className={cls.item} />
      ))}

      {isLoading
        ? new Array(4).fill(0).map((_, index) => <BlockListItemLoader key={index} />)
        : null}
    </VStack>
  );
});
