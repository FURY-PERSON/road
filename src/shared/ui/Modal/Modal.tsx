import React, {
  memo, FC, ReactNode, useState, useRef, useEffect, useCallback, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const wrapperMods: Record<string, boolean> = {
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
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
