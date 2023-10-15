import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button';
import { TextInput as TextInputDeprecated } from '@/shared/ui/deprecated/TextInput/TextInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import { addCommentFormLoading } from '../../model/selectors/addCommentFormLoading/addCommentFormLoading';
import { addCommentFormText } from '../../model/selectors/addCommentFormText/addCommentFormText';
import { addCommentFormError } from '../../model/selectors/addCommentFormError/addCommentFormError';
import { addCommentFormActions } from '../../model/slice/addCommentForm.slice';

import cls from './AddNewCommentForm.module.scss';
import clsR from './AddNewCommentForm.redesigned.module.scss';

export interface AddNewCommentFormProps {
  className?: string;
  onSendComment: () => void;
  testId?: string;
}

export const AddNewCommentForm: FC<AddNewCommentFormProps> = memo((props) => {
  const { onSendComment, testId, className } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const commentLoading = useSelector(addCommentFormLoading);
  const commentError = useSelector(addCommentFormError);
  const commentText = useSelector(addCommentFormText);

  const onCommentTextChange = useCallback(
    (comment: string) => {
      dispatch(addCommentFormActions.setCommentText(comment));
    },
    [dispatch]
  );

  const onSendClick = useCallback(() => {
    onSendComment();
  }, [onSendComment]);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <>
          <div className={cls.inner} data-testId={testId}>
            <TextInputDeprecated
              className={cls.input}
              value={commentText}
              onChange={onCommentTextChange}
              data-testId="AddNewCommentForm.commentInput"
            />
            <ButtonDeprecated
              className={cls.button}
              isLoading={commentLoading}
              onClick={onSendClick}
              data-testId="AddNewCommentForm.sendButton"
            >
              {t('send')}
            </ButtonDeprecated>
          </div>

          {commentError ? (
            <Text className={cls.error} variant={TextVariant.ERROR} text={commentError} />
          ) : null}
        </>
      }
      on={
        <Card padding="24" border="round" fullWidth>
          <HStack
            data-testid="AddNewCommentForm"
            justify="between"
            align="center"
            max
            gap={16}
            className={classNames(clsR.AddNewCommentForm, {}, [className])}
          >
            <Input
              className={clsR.input}
              placeholder={t('Введите текст комментария')}
              value={commentText}
              data-testid="AddNewCommentForm.commentInput"
              onChange={onCommentTextChange}
            />
            <Button
              data-testid="AddNewCommentForm.sendButton"
              onClick={onSendClick}
              variant="outline"
            >
              {t('Отправить')}
            </Button>
          </HStack>
        </Card>
      }
    />
  );
});
