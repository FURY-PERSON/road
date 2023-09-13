import { ReactElement } from 'react';

import { getFeatureFlag } from '@/shared/constant/featureFlag';
import { FeatureFlags } from '@/shared/types/toggleFeaturesFlags';

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { on, off, feature } = props;

  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
};
