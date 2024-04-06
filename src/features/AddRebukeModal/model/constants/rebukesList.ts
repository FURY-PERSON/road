import { RebukeType } from '@/entities/Rebuke';
import i18n from '@/shared/config/i18n/i18n';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

export const rebukesList: Array<ListBoxItem<RebukeType>> = [
  { content: i18n.t('normal'), value: RebukeType.NORMAL },
  { content: i18n.t('strong'), value: RebukeType.STRONG }
];
