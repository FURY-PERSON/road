import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { Card } from 'shared/ui/Card/Card';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './EditableCodeBlock.module.scss';
import { EditableNewsBlockCode, EditableNewsBlockCodeHandlers } from '../../model/types/editableNewsBlock';

interface EditableCodeBlockProps extends EditableNewsBlockCodeHandlers {
  className?: string;
  item?: EditableNewsBlockCode
}

export const EditableCodeBlock:FC<EditableCodeBlockProps> = memo((props) => {
  const { className, item, onCodeChange } = props;

  const { t } = useTranslation('news');

  return (
    <Card className={classNames(cls.EditableCodeBlock, {}, [className])}>
      <Text size={TextSize.Д} title={t('code block')} />

      <TextInput className={cls.code} value={item?.code} onChange={onCodeChange} />
    </Card>
  );
});
