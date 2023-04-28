import { memo, FC } from 'react';
import {
  EditableNewsBlock, EditableNewsBlockCodeHandlers, EditableNewsBlockImageHandlers, EditableNewsBlockTextHandlers, 
} from '../../model/types/editableNewsBlock';
import { EditableTextBlock } from '../EditableTextBlock/EditableTextBlock';
import { EditableImageBlock } from '../EditableImageBlock/EditableImageBlock';
import { EditableCodeBlock } from '../EditableCodeBlock/EditableCodeBlock';
import { isTextBlock, isCodeBlock, isImageBlock } from '../../model/lib/editableNewsBlock';

export interface EditableNewsBlockComponentProps {
  item: EditableNewsBlock,
  textBlockHandlers?: EditableNewsBlockTextHandlers
  codeBlockHandlers?: EditableNewsBlockCodeHandlers
  imageBlockHandlers?: EditableNewsBlockImageHandlers
}

export const EditableNewsBlockComponent:FC<EditableNewsBlockComponentProps> = memo((props) => {
  const {
    item, codeBlockHandlers, imageBlockHandlers, textBlockHandlers, 
  } = props;

  if (isImageBlock(item)) {
    return <EditableImageBlock item={item} {...imageBlockHandlers} />;
  }

  if (isTextBlock(item)) {
    return <EditableTextBlock item={item} {...textBlockHandlers} />;
  }

  if (isCodeBlock(item)) {
    return <EditableCodeBlock item={item} {...codeBlockHandlers} />;
  }

  return <div>Errror</div>;
});
