export interface FeatureFlags {
  ratingCardOnMainPage?: boolean;
  newDesign?: boolean;
  counter?: boolean;
}

export interface FeatureFlagsEntity {
  updatedAt: string;
  createdAt: string;
  features: Array<{
    name: keyof FeatureFlags;
    active: boolean;
  }>;
}
