import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getLoading = (state: StateSchema) => state.createAndEditNews?.isLoading

export const getForm = (state: StateSchema) => state.createAndEditNews?.form

export const isEdit = (state: StateSchema) => state.createAndEditNews?.isEdit
