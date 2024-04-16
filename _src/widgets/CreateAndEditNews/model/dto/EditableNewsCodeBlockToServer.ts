import { NewsBlockType, NewsCodeBlock } from '@/entities/News';
import { EditableNewsBlockCode } from '@/features/EditableNewsBlock';

export class EditableNewsCodeBlockToServer implements Omit<NewsCodeBlock, 'id'> {
  type: NewsBlockType.CODE;

  code: string;

  sequenceNumber: number;

  constructor(block: EditableNewsBlockCode) {
    this.code = block.code;
    this.type = block.type;
    this.sequenceNumber = block.sequenceNumber;
  }
}
