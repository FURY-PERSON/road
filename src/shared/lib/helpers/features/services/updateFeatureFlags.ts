import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { FeatureFlags } from '../types/featuresFlags';

interface UpdateFeatureFlagOptions {
  userLogin: string;
  active: boolean;
  featureName: keyof FeatureFlags;

  needReloadPage?: boolean;
}

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
>('featureFlag/update', async ({ active, featureName, userLogin, needReloadPage }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        active,
        featureName,
        userLogin
      })
    );

    if (needReloadPage) {
      window.location.reload();
    }

    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
