import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Button, ButtonSize } from '@/shared/ui/deprecated/Button/Button';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { VStack } from '@/shared/ui/deprecated/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { HStack } from '@/shared/ui/deprecated/Stack/HStack/HStack';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';

import cls from './RatingCard.module.scss';

interface RatingCardProps {
  className?: string;
  title?: string | null;
  feedbackTitle?: string | null;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const { className, onAccept, feedbackTitle, hasFeedback, onCancel, title, rate } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate || 0);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <TextInput value={feedback} onChange={setFeedback} placeholder={t('your rating')} />
    </>
  );

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack align="center" gap={8}>
        <Text title={title} />
        <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
      </VStack>

      <BrowserView>
        <Modal open={isModalOpen}>
          <VStack gap={32}>
            {modalContent}
            <HStack gap={16} justify="end">
              <Button onClick={cancelHandle}>{t('close')}</Button>
              <Button onClick={acceptHandle}>{t('send')}</Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap={32}>
            {modalContent}
            <Button onClick={acceptHandle} size={ButtonSize.MEDIUM}>
              {t('send')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
});
