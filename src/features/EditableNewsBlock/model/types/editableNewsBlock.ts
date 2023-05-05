import {
  NewsBlock, NewsBlockType, NewsImageBlock, NewsCodeBlock, NewsTextBlock, 
} from 'entities/News';

export type EditableNewsBlock = Partial<Omit<NewsBlock, 'id'>> & {localId: string, type: NewsBlockType, sequenceNumber: number }

export type EditableNewsBlockImage = Partial<Omit<NewsImageBlock, 'id' | 'src'>> & EditableNewsBlock & {image: string }

export interface EditableNewsBlockTextParagraph {localId: string, text: string}
export type EditableNewsBlockText = Partial<Omit<NewsTextBlock, 'id' | 'paragraphs'>> & EditableNewsBlock & { paragraphs: Array<EditableNewsBlockTextParagraph> }

export type EditableNewsBlockCode = Partial<Omit<NewsCodeBlock, 'id'>> & EditableNewsBlock & { code: string }

export interface EditableNewsBlockTextHandlers {
  onAddParagraph?: () => void
  onTitleChange?: (title: string) => void
  onParagraphChange?: (paragraphId: string, text: string) => void
}

export interface EditableNewsBlockCodeHandlers {
  onCodeChange?: (code: string) => void
}

export interface EditableNewsBlockImageHandlers {
  onImageChange?: (image?: string) => void,
  onRemoveImage?: () => void,
  onTitleChange?: (title: string) => void
}

export function isEditableNewsBlockText(block: EditableNewsBlock): block is EditableNewsBlockText {
  return block.type === NewsBlockType.TEXT;
}

export function isEditableNewsBlockImage(block: EditableNewsBlock): block is EditableNewsBlockImage {
  return block.type === NewsBlockType.IMAGE;
}

export function isEditableNewsBlockCode(block: EditableNewsBlock): block is EditableNewsBlockCode {
  return block.type === NewsBlockType.CODE;
}
