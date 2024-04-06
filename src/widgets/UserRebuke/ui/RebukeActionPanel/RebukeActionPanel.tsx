import { memo, FC } from 'react';

import { Button } from '@/shared/ui/redesigned/Button/Button';
import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';
import PenIcon from '@/shared/assets/icons/pen.svg';
import CrossIcon from '@/shared/assets/icons/cross.svg';

import cls from './RebukeActionPanel.module.scss';

interface RebukeActionPanelProps {
  id: string;
  openEditRebuke: (id: string) => () => void;
  deleteRebuke: (id: string) => () => void;
}

export const RebukeActionPanel: FC<RebukeActionPanelProps> = memo((props) => {
  const { openEditRebuke, deleteRebuke, id } = props;

  return (
    <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
      <>
        <Button className={cls.editButton} onClick={openEditRebuke(id)}>
          <PenIcon className={cls.editIcon} />
        </Button>

        <Button className={cls.deleteButton} onClick={deleteRebuke(id)}>
          <CrossIcon className={cls.deleteIcon} />
        </Button>
      </>
    </RoleGuard>
  );
});
