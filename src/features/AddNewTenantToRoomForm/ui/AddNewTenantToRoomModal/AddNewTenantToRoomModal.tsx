import { memo, FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { SvgLoader } from '@/shared/ui/redesigned/SvgLoader';

import { FormAsync } from '../Form/Form.async';

import cls from './AddNewTenantToRoomModal.module.scss';

interface AddNewTenantToRoomModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  roomId?: string;
}

export const AddNewTenantToRoomModal: FC<AddNewTenantToRoomModalProps> = memo((props) => {
  const { className, onClose, open, roomId } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classNames(cls.AddNewTenantToRoomModal, {}, [className])}>
        <Suspense fallback={<SvgLoader />}>
          <FormAsync onSuccess={onClose} roomId={roomId} />
        </Suspense>
      </div>
    </Modal>
  );
});
