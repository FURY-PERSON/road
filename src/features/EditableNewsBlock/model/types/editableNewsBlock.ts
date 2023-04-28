import {
  NewsBlock, NewsBlockType, NewsImageBlock, NewsCodeBlock, NewsTextBlock, 
} from 'entities/News';

export type EditableNewsBlock = Partial<Omit<NewsBlock, 'id'>> & {localId: string, type: NewsBlockType }

export type EditableNewsBlockImage = Partial<Omit<NewsImageBlock, 'id' | 'src'>> & {localId: string, type: NewsBlockType, image: string }
export type EditableNewsBlockText = Partial<Omit<NewsTextBlock, 'id'>> & {localId: string, type: NewsBlockType }
export type EditableNewsBlockCode = Partial<Omit<NewsCodeBlock, 'id'>> & {localId: string, type: NewsBlockType }

export interface EditableNewsBlockTextHandlers {
  onAddParagraph?: () => void
  onTitleChange?: (title: string) => void
  onParagraphChange?: (paragraphSequencyNum: number, text: string) => void
}

export interface EditableNewsBlockCodeHandlers {
  onCodeChange?: (code: string) => void
}

export interface EditableNewsBlockImageHandlers {
  onImageChange?: (image?: string) => void,
  onRemoveImage?: () => void,
  onTitleChange?: (title: string) => void
}