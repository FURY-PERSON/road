import { Story } from '@storybook/react';

import { FeatureFlagsEntity, setFeatureFlags } from '@/shared/lib/helpers/features';

export const FeaturesFlagsDecorator =
  (features: Pick<FeatureFlagsEntity, 'features'>) => (StoryComponent: Story) => {
    setFeatureFlags(features as FeatureFlagsEntity);
    return <StoryComponent />;
  };
