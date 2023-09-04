import { useMemo } from 'react';

import { FeatureFlags } from '@/shared/types/toggleFeaturesFlags';

import { toggleFeatures } from '../../helpers/toggleFeatureFlag/toggleFeatureFlag';

interface UseToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function useToggleFeatures<T>(options: UseToggleFeaturesOptions<T>): T {
  const feature = useMemo(() => {
    return toggleFeatures({
      name: options.name,
      off: options.off,
      on: options.on
    });
  }, [options]);

  return feature;
}
