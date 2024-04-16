import { NewsBlock, NewsBlockType } from '@/entities/News';
import {
  EditableNewsBlock,
  EditableNewsCodeBlockDto,
  EditableNewsImageBlockDto,
  EditableNewsTextBlockDto,
  isEditableNewsBlockCode,
  isEditableNewsBlockImage,
  isEditableNewsBlockText
} from '@/features/EditableNewsBlock';

import { EditableNewsTextBlockToServer } from '../dto/EditableNewsTextBlockToServer';
import { EditableNewsImageBlockToServer } from '../dto/EditableNewsImageBlockToServer';
import { EditableNewsCodeBlockToServer } from '../dto/EditableNewsCodeBlockToServer';

export function blockToState(blocks: NewsBlock[]): EditableNewsBlock[] {
  return blocks.map((block) => {
    if (block.type === NewsBlockType.TEXT) {
      return { ...new EditableNewsTextBlockDto(block) };
    }
    if (block.type === NewsBlockType.IMAGE) {
      return { ...new EditableNewsImageBlockDto(block) };
    }

    return { ...new EditableNewsCodeBlockDto(block) };
  });
}

export function stateBlocksToServer(blocks: EditableNewsBlock[]): Array<Omit<NewsBlock, 'id'>> {
  return blocks.map((block) => {
    if (isEditableNewsBlockText(block)) {
      return { ...new EditableNewsTextBlockToServer(block) };
    }

    if (isEditableNewsBlockImage(block)) {
      return { ...new EditableNewsImageBlockToServer(block) };
    }

    if (isEditableNewsBlockCode(block)) {
      return { ...new EditableNewsCodeBlockToServer(block) };
    }

    return {
      ...block,
      type: block.type,
      localId: undefined,
      id: undefined
    };
  });
}
