import { memo, FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';

import { FormAsync } from '../Form/Form.async';

import cls from './AddScientificWorkModal.module.scss';

interface AddScientificWorkModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  login?: string;
}

export const AddScientificWorkModal: FC<AddScientificWorkModalProps> = memo((props) => {
  const { className, onClose, open, login } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classNames(cls.AddScientificWorkModal, {}, [className])}>
        <Suspense fallback={<SvgLoader />}>
          <FormAsync onSuccess={onClose} login={login} />
        </Suspense>
      </div>
    </Modal>
  );
});
