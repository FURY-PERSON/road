import { ReactElement } from 'react';

import { getFeatureFlag } from '@/shared/lib/helpers/features/lib/featureFlag';
import { FeatureFlags } from '@/shared/lib/helpers/features';

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
