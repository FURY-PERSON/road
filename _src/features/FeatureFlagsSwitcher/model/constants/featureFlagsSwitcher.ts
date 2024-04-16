import i18n from '@/shared/config/i18n/i18n';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

import { FeatureFlagValue } from '../types/featureFlagsSwitcher';

export const switcherItems: Array<ListBoxItem<FeatureFlagValue>> = [
  {
    content: i18n.t('on'),
    value: 'on'
  },
  {
    content: i18n.t('off'),
    value: 'off'
  }
];
