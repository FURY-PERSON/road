import { memo, FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';

import { FormAsync } from '../Form/Form.async';

import cls from './EditRebukeModal.module.scss';

interface EditRebukeModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  rebukeId: string;
  login?: string;
}

export const EditRebukeModal: FC<EditRebukeModalProps> = memo((props) => {
  const { className, onClose, open, login, rebukeId } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classNames(cls.EditRebukeModal, {}, [className])}>
        <Suspense fallback={<SvgLoader />}>
          <FormAsync onSuccess={onClose} rebukeId={rebukeId} login={login} />
        </Suspense>
      </div>
    </Modal>
  );
});
