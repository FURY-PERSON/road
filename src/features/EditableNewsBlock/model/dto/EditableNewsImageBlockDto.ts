import { NewsBlockType, NewsImageBlock } from 'entities/News';
import { EditableNewsBlockImage } from '../types/editableNewsBlock';

export class EditableNewsImageBlockDto implements EditableNewsBlockImage {
  type: NewsBlockType.IMAGE;

  title: string;

  localId: string;

  image: string;

  constructor(newsBlock: NewsImageBlock) {
    this.localId = newsBlock.id;
    this.type = NewsBlockType.IMAGE;
    this.title = newsBlock.title || '';
    this.image = newsBlock.image;
  }
}
