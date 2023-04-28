import { News, NewsBlock } from 'entities/News';
import { EditableNewsBlock } from 'features/EditableNewsBlock';

export type EditableNews = Partial<Omit<News, 'id' | 'author' | 'blocks'> & { blocks: Array<EditableNewsBlock> }>
