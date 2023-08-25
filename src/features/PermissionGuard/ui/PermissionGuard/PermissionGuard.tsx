import { useSelector } from 'react-redux';

import { PermissionName } from '@/entities/Permission';
import { getUserPermissionsName } from '@/entities/User/model/selectors/getUserPermissionsName/getUserPermissionsName';
import { ForbiddenView } from '@/shared/ui/ForbiddenView/ForbiddenView';

interface PermissionGuardProps {
  children: JSX.Element;
  permissionsNames?: PermissionName[];
  showForbidden?: boolean;
}

export const PermissionGuard = (props: PermissionGuardProps) => {
  const { children, permissionsNames, showForbidden = false } = props;

  const userPermissions = useSelector(getUserPermissionsName);

  if (!permissionsNames) return children;

  if (!permissionsNames.every((permission) => userPermissions?.includes(permission))) {
    return showForbidden ? <ForbiddenView /> : null;
  }

  return children;
};
