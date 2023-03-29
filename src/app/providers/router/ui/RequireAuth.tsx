import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath[AppRoutes.LOGIN]} state={{ from: location }} replace />;
  }

  return children;
}
