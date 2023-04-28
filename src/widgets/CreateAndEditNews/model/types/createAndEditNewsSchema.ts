import { News } from 'entities/News';
import { EntityState } from '@reduxjs/toolkit';
import { EditableNewsBlock } from 'features/EditableNewsBlock';

export interface CreateAndEditNewsSchema extends EntityState<EditableNewsBlock> {
  form: Partial<Omit<News, 'blocks'>>,
  item?: News // if edit
  isEdit: boolean
  isLoading?: boolean
  error?: string
}
