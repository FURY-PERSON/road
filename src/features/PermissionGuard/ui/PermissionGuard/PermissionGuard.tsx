import { PermissionName } from 'entities/Permission';
import { getUserPermissionsName } from 'entities/User/model/selectors/getUserPermissionsName/getUserPermissionsName';
import { useSelector } from 'react-redux';
import { ForbiddenView } from 'shared/ui/ForbiddenView/ForbiddenView';

interface PermissionGuardProps {
  children: JSX.Element, 
  permissionsNames?: PermissionName[]
}

export const PermissionGuard = (props: PermissionGuardProps) => {
  const { children, permissionsNames } = props;

  const userPermissions = useSelector(getUserPermissionsName);

  if (!permissionsNames) return children;

  if (!permissionsNames.every((permission) => userPermissions?.includes(permission))) {
    return <ForbiddenView />; 
  }
  
  return children;
};
