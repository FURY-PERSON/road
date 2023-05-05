import { NewsBlockType, NewsTextBlock } from 'entities/News';
import { EditableNewsBlockText } from 'features/EditableNewsBlock';

export class EditableNewsTextBlockToServer implements Omit<NewsTextBlock, 'id'> {
  type: NewsBlockType.TEXT;

  title?: string;

  paragraphs: Array<string>;

  constructor(block: EditableNewsBlockText) {
    this.paragraphs = block.paragraphs.map((paragraph) => paragraph.text);
    this.title = block.title;
    this.type = block.type;
  }
}
