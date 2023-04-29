import { NewsBlock, NewsBlockType, NewsTextBlock } from 'entities/News';
import { EditableNewsBlock, isEditableNewsBlockText } from 'features/EditableNewsBlock/model/types/editableNewsBlock';
import { getUniqueId } from 'shared/lib/helpers/getUniqueId/getUniqueId';

export function blockToState(blocks: NewsBlock[]): EditableNewsBlock[] {
  return blocks.map((block) => {
    if (block.type === NewsBlockType.TEXT) {
      return { 
        ...block, 
        localId: block.id, 
        paragraphs: block.paragraphs.map((paragraph) => ({ localId: getUniqueId(), text: paragraph })), 
      };
    }
    return { ...block, localId: block.id };
  });
}

export function stateBlocksToServer(blocks: EditableNewsBlock[]): Array<Omit<NewsBlock, 'id'>> {
  return blocks.map((block) => {
    if (isEditableNewsBlockText(block)) {
      return {
        paragraphs: block.paragraphs.map((paragraph) => paragraph.text),
        title: block.title,
        type: block.type,
        id: undefined
      };
    }

    return {
      ...block,
      type: block.type,
      localId: undefined,
      id: undefined
    };
  });
}
