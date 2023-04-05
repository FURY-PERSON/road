import { User } from "entities/User";

export enum NewsBlockType {
  IMAGE = 'NewsImageBlock',
  TEXT = 'NewsTextBlock',
  CODE = 'NewsCodeBlock'
}

export interface NewsBlockBase {
  id: string
  type: NewsBlockType 
}

export interface NewsImageBlock extends NewsBlockBase {
  type: NewsBlockType.IMAGE;
  src: string;
  title?: string
}
export interface NewsTextBlock extends NewsBlockBase {
  type: NewsBlockType.TEXT;
  title?: string,
  paragraphs: Array<string>
}
export interface NewsCodeBlock extends NewsBlockBase {
  type: NewsBlockType.CODE;
  code: string
}

export type NewsBlock = NewsImageBlock | NewsTextBlock | NewsCodeBlock

export enum NewsType {
  WARNING = 'warning'
}

export interface News {
  id: string;
  title: string,
  subTitle: string,
  mainText: string,
  imageName?: string,
  imageUrl?: string,
  author: Omit<User, 'permissions' | 'role'>
  type: NewsType,
  createdAt: string,
  blocks: Array<NewsBlock>
}
