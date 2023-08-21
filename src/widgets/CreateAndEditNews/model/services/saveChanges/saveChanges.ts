import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { News, NewsType } from '@/entities/News';
import { getForm, getItem } from '../../selectors/createAdnEditNews';
import { getCreateAndEditNews } from '../../slice/createAndEditNews.slice';
import { stateBlocksToServer } from '../../lib/createAndEditNews';

export const saveChanges = createAsyncThunk<News, string | undefined, ThunkConfig<string>>(
  'news/saveChanges',
  async (newsId, thunkAPI) => {
    const {
      extra, rejectWithValue, getState,
    } = thunkAPI;
    
    try {
      const form = getForm(getState());
      const item = getItem(getState());
      const blocks = getCreateAndEditNews.selectAll(getState());
      
      const formData = new FormData();

      formData.append('type', NewsType.WARNING);

      if (form?.title) formData.append('title', form?.title);
      if (form?.subTitle) formData.append('subTitle', form?.subTitle);
      if (form?.mainText) formData.append('mainText', form?.mainText);
      if (form?.dorm?.id && item?.dorm.id !== form?.dorm?.id) formData.append('dormId', form.dorm.id);
      if (blocks) {
        formData.append('blocks', JSON.stringify(stateBlocksToServer(blocks)));
      }

      if (form?.image) {
        const imageFetch = await fetch(form.image);
        const blobFile = await imageFetch.blob();
        formData.append('image', new Blob([blobFile]));
      }

      if (newsId) {
        return (await extra.api.put<News>(`news/${newsId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })).data;
      } 

      return (await extra.api.post<News>('news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })).data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
