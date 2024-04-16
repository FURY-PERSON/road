import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/lib/helpers/features';

interface GetUserFeatureFlagsProps {
  userLogin: string;
}

export const getUserFeatureFlags = createAsyncThunk<
  FeatureFlags,
  GetUserFeatureFlagsProps,
  ThunkConfig<string>
>('user/getUserFeatureFlags', async ({ userLogin }, thunkAPI) => {
  const { extra } = thunkAPI;

  try {
    const response = await extra.api.get<{
      createdAt: string;
      updatedAt: string;
      features: Array<{
        name: string;
        active: boolean;
      }>;
    } | null>('feature-flag', {
      params: {
        login: userLogin
      }
    });

    return (
      response.data?.features.reduce(
        (accum, feature) => ({ ...accum, [feature.name]: feature.active }),
        {}
      ) || {}
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || error.response?.statusText || error.message
      );
    }
    return thunkAPI.rejectWithValue('Unexpected fetch user feature flags error');
  }
});
