import React, {
  FC, ReactNode, useState, useRef, useEffect, MutableRefObject, 
} from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
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
    className, children, open, onClose,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout> | undefined>;

  const closeHandler = () => {
    if (!onClose) return;

    setIsClosing(true);
    timerRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, ANIMATION_DELAY);
  }; 

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const wrapperMods: Mods = {
    [cls.open]: open,
    [cls.closing]: isClosing,
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };

    if (open) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <Portal>
      <div className={classNames(cls.Modal, wrapperMods, [className])}>
        <Overlay onClick={closeHandler} />

        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
