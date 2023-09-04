import { getFeatureFlag } from '@/shared/constant/featureFlag';
import { FeatureFlags } from '@/shared/types/toggleFeaturesFlags';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function toggleFeatures<T>({ off, on, name }: ToggleFeaturesOptions<T>): T {
  if (getFeatureFlag(name)) {
    return on();
  }

  return off();
}
