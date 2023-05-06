import { NewsBlockType } from 'entities/News';
import {
  EditableNewsBlock, EditableNewsBlockCode, EditableNewsBlockImage, EditableNewsBlockText, 
} from '../types/editableNewsBlock';

export function isImageBlock(block: EditableNewsBlock): block is EditableNewsBlockImage {
  return block.type === NewsBlockType.IMAGE;
}

export function isCodeBlock(block: EditableNewsBlock): block is EditableNewsBlockCode {
  return block.type === NewsBlockType.CODE;
}

export function isTextBlock(block: EditableNewsBlock): block is EditableNewsBlockText {
  return block.type === NewsBlockType.TEXT;
}
