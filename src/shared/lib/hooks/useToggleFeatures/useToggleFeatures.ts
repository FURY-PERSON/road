import { useMemo } from 'react';

import { FeatureFlags } from '@/shared/lib/helpers/features';

import { toggleFeatures } from '../../helpers/features/helpers/toggleFeatureFlag';

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
