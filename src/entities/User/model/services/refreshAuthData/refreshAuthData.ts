import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthTokens, User } from '@/entities/User';
import { setFeatureFlags } from '@/shared/constant/featureFlag';
import { FeatureFlagsEntity } from '@/shared/types/toggleFeaturesFlags';

interface RefreshResponse {
  user: User & { featureFlags: FeatureFlagsEntity };
  tokens: AuthTokens;
}

export const refreshAuthData = createAsyncThunk<
  { user: User; tokens: AuthTokens },
  void,
  ThunkConfig<string>
>('user/refreshAuthData', async (_, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;
  try {
    const userState = getState().user;

    if (!userState.authData?.refreshToken) {
      return rejectWithValue('User not authorized');
    }

    const response = await extra.api.post<RefreshResponse>('auth/refresh', {
      refreshToken: userState.authData.refreshToken,
      accessToken: userState.authData.accessToken
    });

    const { user, tokens } = response.data;

    if (!user) {
      return rejectWithValue('User not found');
    }

    if (!tokens) {
      return rejectWithValue('Tokens do not provided');
    }

    setFeatureFlags(user.featureFlags);

    return { user, tokens };
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || error.response?.statusText || error.message
      );
    }
    return thunkAPI.rejectWithValue('Unexpected login error');
  }
});
