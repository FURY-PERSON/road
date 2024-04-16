import { memo, FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';

import { FormAsync } from '../Form/Form.async';

import cls from './EditScientificWorkModal.module.scss';

interface EditScientificWorkModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  scientificWorkId: string;
  login?: string;
}

export const EditScientificWorkModal: FC<EditScientificWorkModalProps> = memo((props) => {
  const { className, onClose, open, login, scientificWorkId } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classNames(cls.EditScientificWorkModal, {}, [className])}>
        <Suspense fallback={<SvgLoader />}>
          <FormAsync onSuccess={onClose} scientificWorkId={scientificWorkId} login={login} />
        </Suspense>
      </div>
    </Modal>
  );
});
