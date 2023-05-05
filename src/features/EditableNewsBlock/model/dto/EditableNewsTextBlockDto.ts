import { NewsBlockType, NewsTextBlock } from 'entities/News';
import { getUniqueId } from 'shared/lib/helpers/getUniqueId/getUniqueId';
import { EditableNewsBlockText, EditableNewsBlockTextParagraph } from '../types/editableNewsBlock';
 
export class EditableNewsTextBlockDto implements EditableNewsBlockText {
  localId: string;

  type: NewsBlockType.TEXT;

  title: string;

  paragraphs: Array<EditableNewsBlockTextParagraph>;

  constructor(newsBlock: NewsTextBlock) {
    this.localId = newsBlock.id;
    this.type = NewsBlockType.TEXT;
    this.title = newsBlock.title || '';
    this.paragraphs = newsBlock.paragraphs.map((paragraph) => ({
      localId: getUniqueId(), 
      text: paragraph,
    }));
  }
}
