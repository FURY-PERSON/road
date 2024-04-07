import { FeatureFlags, FeatureFlagsEntity } from '../types/featuresFlags';

let featureFlags: FeatureFlags = {
  newDesign: true
};

export function setFeatureFlags(newFeatureFlagsEntity?: FeatureFlagsEntity) {
  if (newFeatureFlagsEntity) {
    featureFlags = newFeatureFlagsEntity.features.reduce(
      (accum, feature) => ({ ...accum, [feature.name]: feature.active }),
      {}
    );
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag];
}

export function getAllFeatureFlags() {
  return { ...featureFlags };
}
