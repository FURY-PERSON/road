import { useSelector } from 'react-redux';

import { RoleName } from '@/entities/Role';
import { getUserRoleName } from '@/entities/User';
import { ForbiddenView } from '@/shared/ui/deprecated/ForbiddenView/ForbiddenView';

interface RoleGuardProps {
  children: JSX.Element | null;
  roleNames?: RoleName[];
  showForbidden?: boolean;
}

export const RoleGuard = (props: RoleGuardProps) => {
  const { children, roleNames, showForbidden = false } = props;

  const userRoleName = useSelector(getUserRoleName);

  if (!roleNames) return children;

  if (!userRoleName || !roleNames.includes(userRoleName)) {
    return showForbidden ? <ForbiddenView /> : null;
  }

  return children;
};
