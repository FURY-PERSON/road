import { memo, FC } from 'react';

import { Button } from '@/shared/ui/redesigned/Button/Button';
import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';
import PenIcon from '@/shared/assets/icons/pen.svg';
import CrossIcon from '@/shared/assets/icons/cross.svg';

import cls from './ScientificWorkActionPanel.module.scss';

export interface ScientificWorkActionPanelProps {
  id: string;
  openEditScientificWork: (id: string) => () => void;
  deleteScientificWork: (id: string) => () => void;
}

export const ScientificWorkActionPanel: FC<ScientificWorkActionPanelProps> = memo((props) => {
  const { openEditScientificWork, deleteScientificWork, id } = props;

  return (
    <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
      <>
        <Button className={cls.editButton} onClick={openEditScientificWork(id)}>
          <PenIcon className={cls.editIcon} />
        </Button>

        <Button className={cls.deleteButton} onClick={deleteScientificWork(id)}>
          <CrossIcon className={cls.deleteIcon} />
        </Button>
      </>
    </RoleGuard>
  );
});
