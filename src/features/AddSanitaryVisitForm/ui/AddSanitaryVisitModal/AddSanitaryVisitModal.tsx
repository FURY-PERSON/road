import { memo, FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';

import { FormAsync } from '../Form/Form.async';

import cls from './AddSanitaryVisitModal.module.scss';

interface AddSanitaryVisitModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  blockId?: string;
}

export const AddSanitaryVisitModal: FC<AddSanitaryVisitModalProps> = memo((props) => {
  const { className, onClose, open, blockId } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classNames(cls.AddSanitaryVisitModal, {}, [className])}>
        <Suspense fallback={<SvgLoader />}>
          <FormAsync onSuccess={onClose} blockId={blockId} />
        </Suspense>
      </div>
    </Modal>
  );
});
