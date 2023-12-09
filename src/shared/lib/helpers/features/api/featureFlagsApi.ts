import { rtkApi } from '@/shared/api/rtkApi';

import { FeatureFlags } from '../types/featuresFlags';

interface UpdateFeatureFlagsOptions {
  userLogin: string;
  active: boolean;
  featureName: keyof FeatureFlags;
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
      query: ({ active, featureName, userLogin }) => ({
        url: `/feature-flag/${featureName}`,
        method: 'PUT',
        body: {
          usersLogin: [userLogin],
          active
        }
      })
    })
  })
});

export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlags.initiate;
