import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Button as ButtonDeprecated, ButtonSize } from '@/shared/ui/deprecated/Button/Button';
import { TextInput as TextInputDeprecated } from '@/shared/ui/deprecated/TextInput/TextInput';
import { VStack as VStackDeprecated } from '@/shared/ui/deprecated/Stack/VStack/VStack';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { HStack as HStackDeprecated } from '@/shared/ui/deprecated/Stack/HStack/HStack';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Card } from '@/shared/ui/redesigned/Card';

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
    <ToggleFeatures
      feature="newDesign"
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <TextInputDeprecated
            value={feedback}
            onChange={setFeedback}
            placeholder={t('your rating')}
          />
        </>
      }
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
          />
        </>
      }
    />
  );

  const content = (
    <ToggleFeatures
      feature="newDesign"
      off={
        <>
          <VStackDeprecated align="center" gap={8}>
            <TextDeprecated title={title} />
            <StarRatingDeprecated selectedStars={starsCount} size={40} onSelect={onSelectStars} />
          </VStackDeprecated>

          <BrowserView>
            <Modal open={isModalOpen}>
              <VStackDeprecated gap={32}>
                {modalContent}
                <HStackDeprecated gap={16} justify="end">
                  <ButtonDeprecated onClick={cancelHandle}>{t('close')}</ButtonDeprecated>
                  <ButtonDeprecated onClick={acceptHandle}>{t('send')}</ButtonDeprecated>
                </HStackDeprecated>
              </VStackDeprecated>
            </Modal>
          </BrowserView>

          <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
              <VStackDeprecated gap={32}>
                {modalContent}
                <ButtonDeprecated onClick={acceptHandle} size={ButtonSize.MEDIUM}>
                  {t('send')}
                </ButtonDeprecated>
              </VStackDeprecated>
            </Drawer>
          </MobileView>
        </>
      }
      on={
        <>
          <VStack align="center" gap={8}>
            <Text title={title} />
            <StarRatingDeprecated selectedStars={starsCount} size={40} onSelect={onSelectStars} />
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
        </>
      }
    />
  );

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <CardDeprecated className={classNames(cls.RatingCard, {}, [className])}>
          {content}
        </CardDeprecated>
      }
      on={
        <Card fullWidth border="round" padding="24">
          {content}
        </Card>
      }
    />
  );
});
