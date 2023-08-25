import { memo, FC } from 'react';

import { Text } from '@/shared/ui/Text/Text';

import {
  EditableNewsBlock,
  EditableNewsBlockCodeHandlers,
  EditableNewsBlockImageHandlers,
  EditableNewsBlockTextHandlers
} from '../../model/types/editableNewsBlock';
import { EditableTextBlock } from '../EditableTextBlock/EditableTextBlock';
import { EditableImageBlock } from '../EditableImageBlock/EditableImageBlock';
import { EditableCodeBlock } from '../EditableCodeBlock/EditableCodeBlock';
import { isTextBlock, isCodeBlock, isImageBlock } from '../../model/lib/editableNewsBlock';

export interface EditableNewsBlockComponentProps {
  item: EditableNewsBlock;
  className?: string;
  textBlockHandlers?: EditableNewsBlockTextHandlers;
  codeBlockHandlers?: EditableNewsBlockCodeHandlers;
  imageBlockHandlers?: EditableNewsBlockImageHandlers;
  maxSequenceNumber: number;
}

export const EditableNewsBlockComponent: FC<EditableNewsBlockComponentProps> = memo((props) => {
  const {
    item,
    codeBlockHandlers,
    imageBlockHandlers,
    textBlockHandlers,
    className,
    maxSequenceNumber
  } = props;

  if (isImageBlock(item)) {
    return (
      <EditableImageBlock
        item={item}
        {...imageBlockHandlers}
        maxSequenceNumber={maxSequenceNumber}
        className={className}
      />
    );
  }

  if (isTextBlock(item)) {
    return (
      <EditableTextBlock
        item={item}
        {...textBlockHandlers}
        maxSequenceNumber={maxSequenceNumber}
        className={className}
      />
    );
  }

  if (isCodeBlock(item)) {
    return (
      <EditableCodeBlock
        item={item}
        {...codeBlockHandlers}
        maxSequenceNumber={maxSequenceNumber}
        className={className}
      />
    );
  }

  if (__IS__DEV__) {
    return <Text title={`Unexpected block item ${JSON.stringify(item)}`} />;
  }

  return null;
});
