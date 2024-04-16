import { ScientificWorkType } from '@/entities/ScientificWork';
import i18n from '@/shared/config/i18n/i18n';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

export const scentificWorksList: Array<ListBoxItem<ScientificWorkType>> = [
  { content: i18n.t('olympiad'), value: ScientificWorkType.OLYMPIAD },
  { content: i18n.t('publication'), value: ScientificWorkType.PUBLICATION }
];
