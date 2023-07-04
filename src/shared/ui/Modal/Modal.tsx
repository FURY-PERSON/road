import React, { FC, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  open: boolean;
  onClose?: () => void,
}

const ANIMATION_DELAY = 300;

export const Modal:FC<ModalProps> = (props) => {
  const {
    className, children, open, onClose
  } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose: onClose,
  });

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const wrapperMods: Mods = {
    [cls.open]: open,
    [cls.closing]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(cls.Modal, wrapperMods, [className])}>
        <Overlay onClick={close} />

        <div className={cls.overlay} onClick={close}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
