import { News } from '@/entities/News';
import { EntityState } from '@reduxjs/toolkit';
import { EditableNewsBlock } from '@/features/EditableNewsBlock';
import { Dorm } from '@/entities/Dorm';

export interface CreateAndEditNewsSchema extends EntityState<EditableNewsBlock> {
  form: Partial<Omit<News, 'blocks' | 'imageName' | 'imageUrl'> & {image?: string, dorm: Dorm}>,
  item?: News // if edit
  isEdit: boolean
  isLoading?: boolean
  error?: string
  dorms?: Dorm[]
}
