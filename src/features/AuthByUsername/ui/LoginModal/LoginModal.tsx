import { memo, FC, Suspense } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { SvgLoader } from 'shared/ui/SvgLoader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
  className?: string;
  open: boolean,
  onClose: () => void
}

export const LoginModal:FC<LoginModalProps> = memo((props) => {
  const { className, onClose, open } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classNames(cls.LoginModal, {}, [className])}>
        <Suspense fallback={<SvgLoader />}>
          <LoginFormAsync />
        </Suspense>
      </div>
    </Modal>
  );
});
