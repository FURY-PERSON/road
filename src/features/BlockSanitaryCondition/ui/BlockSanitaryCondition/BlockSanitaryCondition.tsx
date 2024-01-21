import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useGetBlockSanitaryVisits } from '@/entities/Block';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import { Skeleton } from '../Skeleton/Skeleton';
import { MarkCell } from '../MarkCell/MarkCell';
import { DateCell } from '../DateCell/DateCell';
import { FieldNameCell } from '../FieldNameCell/FieldNameCell';

import cls from './BlockSanitaryCondition.module.scss';

interface BlockSanitaryConditionProps {
  className?: string;
  blockId: string;
}

export const BlockSanitaryCondition: FC<BlockSanitaryConditionProps> = memo((props) => {
  const { className, blockId } = props;

  const { data, isLoading, error } = useGetBlockSanitaryVisits({ blockId: blockId });

  const loading = isLoading;

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Text variant="error" title={String(error)} />;
  }

  return (
    <HStack className={classNames(cls.BlockSanitaryCondition, {}, [className])}>
      <VStack>
        <div className={cls.emptyCell} />

        {data?.[0]?.marks.map((mark) => <FieldNameCell key={mark.type} name={mark.name} />)}
      </VStack>

      {data?.map((visit) => (
        <VStack key={visit.id}>
          <DateCell dateString={visit.date} />

          <VStack>
            {visit.marks.map((mark) => (
              <MarkCell key={mark.id} mark={mark} editable />
            ))}
          </VStack>
        </VStack>
      ))}
    </HStack>
  );
});
