import { NewsBlockType, NewsImageBlock } from 'entities/News';
import { EditableNewsBlockImage } from 'features/EditableNewsBlock';

export class EditableNewsImageBlockToServer implements Omit<NewsImageBlock, 'id'> {
  type: NewsBlockType.IMAGE;

  title?: string;

  image: string;

  constructor(block: EditableNewsBlockImage) {
    this.image = block.image;
    this.title = block.title;
    this.type = block.type;
  }
}
