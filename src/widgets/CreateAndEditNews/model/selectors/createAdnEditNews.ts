import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoading = (state: StateSchema) => state.createAndEditNews?.isLoading;

export const getForm = (state: StateSchema) => state.createAndEditNews?.form;

export const getItem = (state: StateSchema) => state.createAndEditNews?.item;

export const isEdit = (state: StateSchema) => state.createAndEditNews?.isEdit;

export const getBlockAmount = (state: StateSchema) => state.createAndEditNews?.ids.length;

export const getDorms = (state: StateSchema) => state.createAndEditNews?.dorms;

export const getSelectedDorm = (state: StateSchema) => state.createAndEditNews?.form.dorm;
