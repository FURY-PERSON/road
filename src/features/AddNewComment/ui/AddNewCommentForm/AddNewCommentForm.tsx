import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button/Button';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextVariant } from '@/shared/ui/Text/Text';
import { addCommentFormLoading } from '../../model/selectors/addCommentFormLoading/addCommentFormLoading';
import cls from './AddNewCommentForm.module.scss';
import { addCommentFormText } from '../../model/selectors/addCommentFormText/addCommentFormText';
import { addCommentFormError } from '../../model/selectors/addCommentFormError/addCommentFormError';
import { addCommentFormActions } from '../../model/slice/addCommentForm.slice';

export interface AddNewCommentFormProps {
  className?: string;
  onSendComment: () => void
}

export const AddNewCommentForm:FC<AddNewCommentFormProps> = memo((props) => {
  const { onSendComment } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const commentLoading = useSelector(addCommentFormLoading);
  const commentError = useSelector(addCommentFormError);
  const commentText = useSelector(addCommentFormText);

  const onCommentTextChange = useCallback((comment: string) => {
    dispatch(addCommentFormActions.setCommentText(comment));
  }, [dispatch]);

  const onSendClick = useCallback(() => {
    onSendComment();
  }, [onSendComment]);
  
  return (
    <>
      <div className={cls.inner}>
        <TextInput className={cls.input} value={commentText} onChange={onCommentTextChange} />
        <Button className={cls.button} isLoading={commentLoading} onClick={onSendClick}>{t('send')}</Button>
      </div>

      {commentError
        ? <Text className={cls.error} variant={TextVariant.ERROR} text={commentError} />
        : null}
    </>
  );
});
