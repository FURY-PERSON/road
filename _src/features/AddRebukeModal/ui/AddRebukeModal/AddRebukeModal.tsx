import { memo, FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';

import { FormAsync } from '../Form/Form.async';

import cls from './AddRebukeModal.module.scss';

interface AddRebukeModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  login?: string;
}

export const AddRebukeModal: FC<AddRebukeModalProps> = memo((props) => {
  const { className, onClose, open, login } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classNames(cls.AddRebukeModal, {}, [className])}>
        <Suspense fallback={<SvgLoader />}>
          <FormAsync onSuccess={onClose} login={login} />
        </Suspense>
      </div>
    </Modal>
  );
});
