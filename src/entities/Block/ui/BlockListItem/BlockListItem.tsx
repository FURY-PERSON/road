import { memo, FC, HTMLAttributeAnchorTarget } from 'react';

import { routes } from '@/shared/constant/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { Block } from '../../model/types/block';

import cls from './BlockListItem.module.scss';

interface BlockListItemProps {
  className?: string;
  block: Block;
  target?: HTMLAttributeAnchorTarget;
}

export const BlockListItem: FC<BlockListItemProps> = memo((props) => {
  const { className, block, target = '_self' } = props;

  return (
    <AppLink
      target={target}
      to={routes.blocksInfo(block.id)}
      className={classNames(cls.BlockListItem, {}, [className])}
    >
      <Card border="round" padding="16">
        <VStack gap={4} max>
          <HStack align="center" gap={24}>
            <div className={cls.floor}>
              <Text text={block.floor} size="L" />
            </div>

            <Text title={block.number} size="L" />
          </HStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
