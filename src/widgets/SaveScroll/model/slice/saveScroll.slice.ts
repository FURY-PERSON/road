import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveScrollSchema } from '../types/saveScroll';

const initialState: SaveScrollSchema = {
  scroll: {},
};

export const saveScrollSchema = createSlice({
  name: 'saveScroll',
  initialState,
  reducers: {
    setScrollPosition(state, {payload}: PayloadAction<{path: string, position: number}>) {
      state.scroll[payload.path] = payload.position;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: saveScrollActions } = saveScrollSchema;
export const { reducer: saveScrollReducer } = saveScrollSchema;
