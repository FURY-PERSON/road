export interface FeatureFlags {
  ratingCardOnMainPage?: boolean;
}

export interface FeatureFlagsEntity {
  updatedAt: string;
  createdAt: string;
  features: Array<{
    name: keyof FeatureFlags;
    active: boolean;
  }>;
}
