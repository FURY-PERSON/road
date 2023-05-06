import { NewsBlockType, NewsCodeBlock } from 'entities/News';
import { EditableNewsBlockCode } from '../types/editableNewsBlock';

export class EditableNewsCodeBlockDto implements EditableNewsBlockCode {
  type: NewsBlockType.CODE;

  localId: string;

  code: string;

  sequenceNumber: number;

  constructor(newsBlock: NewsCodeBlock) {
    this.localId = newsBlock.id;
    this.type = NewsBlockType.CODE;
    this.code = newsBlock.code || '';
    this.sequenceNumber = newsBlock.sequenceNumber;
  }
}
