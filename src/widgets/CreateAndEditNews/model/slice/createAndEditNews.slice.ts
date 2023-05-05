import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { NewsBlock, NewsBlockType } from 'entities/News';
import { getUniqueId } from 'shared/lib/helpers/getUniqueId/getUniqueId';
import { StateSchema } from 'app/providers/StoreProvider';
import { EditableNewsBlock } from 'features/EditableNewsBlock';
import { EditableNewsBlockCode, EditableNewsBlockImage, EditableNewsBlockText } from 'features/EditableNewsBlock/model/types/editableNewsBlock';
import { Dorm } from 'entities/Dorm';
import { CreateAndEditNewsSchema } from '../types/createAndEditNewsSchema';
import { initCreateAndEditNews } from '../services/initCreateAndEditNews/initCreateAndEditNews';
import { blockToState } from '../lib/createAndEditNews';

const createAndEditNewsBlockAdapter = createEntityAdapter<EditableNewsBlock>({
  selectId: (block) => block.localId,
});

export const getCreateAndEditNews = createAndEditNewsBlockAdapter.getSelectors<StateSchema>(
  (state) => state.createAndEditNews || createAndEditNewsBlockAdapter.getInitialState(),
);

const initialState = createAndEditNewsBlockAdapter.getInitialState<CreateAndEditNewsSchema>({
  entities: {},
  ids: [],
  form: {
    title: '',
    subTitle: '',
    mainText: '',
    image: '',
  },
  isEdit: false,
});

export const createAndEditNewsSlice = createSlice({
  name: 'createAndEditNewsSlice',
  initialState: initialState,
  reducers: {
    setNewsTitle(state, action: PayloadAction<string | undefined>) {
      state.form.title = action.payload;
    },
    setNewsSubTitle(state, action: PayloadAction<string | undefined>) {
      state.form.subTitle = action.payload;
    },
    setNewsMainText(state, action: PayloadAction<string | undefined>) {
      state.form.mainText = action.payload;
    },
    setNewsMainImage(state, action: PayloadAction<string | undefined>) {
      state.form.image = action.payload;
    },
    setSelectedDorm(state, action: PayloadAction<string>) {
      const dorm = state.dorms?.find((dorm) => dorm.id === action.payload);

      if (dorm) {
        state.form.dorm = dorm;
      }
    },
    cancelEdeting(state) {
      state.error = '';
      state.isLoading = false;
      state.form = state.item || {};
      state.form.image = state.item?.imageUrl;
      state.isEdit = true;

      if (state.item) {
        createAndEditNewsBlockAdapter.setAll(state, blockToState(state.item?.blocks));
      } else {
        createAndEditNewsBlockAdapter.removeAll(state);
      }
    },
    resetForm() {
      return initialState;
    },
    addBlock(state, action: PayloadAction<NewsBlockType>) {
      const blocksAmount = state.ids.length || 0;
      createAndEditNewsBlockAdapter.addOne(state, { localId: getUniqueId(), type: action.payload, sequenceNumber: blocksAmount });
    },
    updateBlockCode(state, { payload }: PayloadAction<{localBlockId: string, code: string}>) {
      createAndEditNewsBlockAdapter.updateOne(state, { 
        id: payload.localBlockId, 
        changes: { code: payload.code } as EditableNewsBlockCode, 
      });
    },
    updateBlockSequenceNum(state, { payload }: PayloadAction<{localBlockId: string, num: number}>) {
      const currentPosition = state.entities[payload.localBlockId]!.sequenceNumber;
      const futurePosition = payload.num;

      const maxBorder = Math.max(currentPosition, futurePosition); // sequence number changed just inside this sequence borders
      const minBorder = Math.min(currentPosition, futurePosition);

      const isPositionIncrease = currentPosition < futurePosition;

      state.ids.forEach((id) => {
        const sequenceNumber = state.entities[id]?.sequenceNumber;

        if (sequenceNumber === undefined
          || sequenceNumber < minBorder 
          || sequenceNumber > maxBorder
        ) return;

        if (sequenceNumber === currentPosition) {
          createAndEditNewsBlockAdapter.updateOne(state, { 
            id: id, 
            changes: { sequenceNumber: futurePosition } as EditableNewsBlockImage, 
          });
          return;
        }

        createAndEditNewsBlockAdapter.updateOne(state, { 
          id: id, 
          changes: { sequenceNumber: isPositionIncrease ? sequenceNumber - 1 : sequenceNumber + 1 } as EditableNewsBlockImage, 
        });
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
          changes: { 
            paragraphs: updatedBlock.paragraphs 
              ? [...updatedBlock.paragraphs, { localId: getUniqueId(), text: '' }] 
              : [{ localId: getUniqueId(), text: '' }], 
          } as EditableNewsBlockText, 
        });
      }
    },
    updateTextBlockTitle(state, { payload }: PayloadAction<{localBlockId: string, title: string}>) {
      createAndEditNewsBlockAdapter.updateOne(state, { 
        id: payload.localBlockId, 
        changes: { title: payload.title } as EditableNewsBlockText, 
      });
    },
    updateTextBlockParagraphText(state, { payload }: PayloadAction<{localBlockId: string, paragraphId: string, text: string}>) {
      const updatedBlock = state.entities[payload.localBlockId] as EditableNewsBlockText | undefined;

      if (updatedBlock) {
        createAndEditNewsBlockAdapter.updateOne(state, { 
          id: payload.localBlockId, 
          changes: {
            paragraphs: updatedBlock.paragraphs?.map((paragraph) => {
              if (paragraph.localId === payload.paragraphId) {
                return { ...paragraph, text: payload.text };
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
        state.dorms = action.payload.dorms;
        state.isEdit = true;
        
        if (action.payload.news) {
          createAndEditNewsBlockAdapter.setAll(state, blockToState(action.payload.news?.blocks));
          state.item = action.payload.news;
          state.form.image = action.payload.news.imageUrl;
          state.form = action.payload.news;
        }
      })
      .addCase(initCreateAndEditNews.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: createAndEditNewsActions } = createAndEditNewsSlice;
export const { reducer: createAndEditNewsReducer } = createAndEditNewsSlice;
