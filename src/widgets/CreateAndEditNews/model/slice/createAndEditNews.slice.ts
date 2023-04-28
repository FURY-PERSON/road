import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { NewsBlockType } from 'entities/News';
import { getUniqueId } from 'shared/lib/helpers/getUniqueId/getUniqueId';
import { StateSchema } from 'app/providers/StoreProvider';
import { EditableNewsBlock } from 'features/EditableNewsBlock';
import { EditableNewsBlockCode, EditableNewsBlockImage, EditableNewsBlockText } from 'features/EditableNewsBlock/model/types/editableNewsBlock';
import { CreateAndEditNewsSchema } from '../types/createAndEditNewsSchema';
import { initCreateAndEditNews } from '../services/initCreateAndEditNews/initCreateAndEditNews';

const createAndEditNewsBlockAdapter = createEntityAdapter<EditableNewsBlock>({
  selectId: (block) => block.localId,
});

export const getCreateAndEditNews = createAndEditNewsBlockAdapter.getSelectors<StateSchema>(
  (state) => state.createAndEditNews || createAndEditNewsBlockAdapter.getInitialState(),
);

export const createAndEditNewsSlice = createSlice({
  name: 'createAndEditNewsSlice',
  initialState: createAndEditNewsBlockAdapter.getInitialState<CreateAndEditNewsSchema>({
    entities: {},
    ids: [],
    form: {},
    isEdit: false,
  }),
  reducers: {
    addBlock(state, action: PayloadAction<NewsBlockType>) {
      createAndEditNewsBlockAdapter.addOne(state, { localId: getUniqueId(), type: action.payload });
    },
    updateBlockCode(state, { payload }: PayloadAction<{localBlockId: string, code: string}>) {
      createAndEditNewsBlockAdapter.updateOne(state, { 
        id: payload.localBlockId, 
        changes: { code: payload.code } as EditableNewsBlockCode, 
      });
    },
    updateImageBlockImage(state, { payload }: PayloadAction<{localBlockId: string, image: string}>) {
      createAndEditNewsBlockAdapter.updateOne(state, { 
        id: payload.localBlockId, 
        changes: { image: payload.image } as EditableNewsBlockImage, 
      });
    },
    updateImageBlockTitle(state, { payload }: PayloadAction<{localBlockId: string, title: string}>) {
      createAndEditNewsBlockAdapter.updateOne(state, { 
        id: payload.localBlockId, 
        changes: { title: payload.title } as EditableNewsBlockImage, 
      });
    },

    addParagraphToParagraphsBlock(state, { payload }: PayloadAction<{localBlockId: string}>) {
      const updatedBlock = state.entities[payload.localBlockId] as EditableNewsBlockText | undefined;

      if (updatedBlock) {
        createAndEditNewsBlockAdapter.updateOne(state, { 
          id: payload.localBlockId, 
          changes: { paragraphs: updatedBlock.paragraphs ? [...updatedBlock.paragraphs, {localId: getUniqueId(), text: ''}] : [{localId: getUniqueId(), text: ''}] } as EditableNewsBlockText, 
        });
      }
    },
    updateTextBlockTitle(state, { payload }: PayloadAction<{localBlockId: string, title: string}>) {
      createAndEditNewsBlockAdapter.updateOne(state, { 
        id: payload.localBlockId, 
        changes: { title: payload.title } as EditableNewsBlockText, 
      });
    },
    updateTextBlockParagraphText(state, { payload }: PayloadAction<{localBlockId: string, sequenceNum: number, text: string}>) {
      const updatedBlock = state.entities[payload.localBlockId] as EditableNewsBlockText | undefined;

      if (updatedBlock) {
        createAndEditNewsBlockAdapter.updateOne(state, { 
          id: payload.localBlockId, 
          changes: {
            paragraphs: updatedBlock.paragraphs?.map((paragraph, index) => {
              if (index === payload.sequenceNum) {
                return payload.text;
              }
              return paragraph;
            }), 
          } as EditableNewsBlockText, 
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initCreateAndEditNews.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(initCreateAndEditNews.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.item = action.payload;
        state.isEdit = true;
        createAndEditNewsBlockAdapter.setAll(state, action.payload.blocks.map((block) => ({ ...block, localId: block.id })));
      })
      .addCase(initCreateAndEditNews.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: createAndEditNewsActions } = createAndEditNewsSlice;
export const { reducer: createAndEditNewsReducer } = createAndEditNewsSlice;
