import { FeatureFlags } from '../types/featuresFlags';

export const featuresNameMap: Record<keyof FeatureFlags, string> = {
  newDesign: 'new design',
  ratingCardOnMainPage: 'rating card on main page',
  counter: 'counter'
};
