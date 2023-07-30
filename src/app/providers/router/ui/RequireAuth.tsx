import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, getUserData } from '@/entities/User';
import { routes } from '@/shared/constant/router';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector(getUserAuthData);
  const user = useSelector(getUserData);
  const location = useLocation();

  if (!auth || !user) {
    return <Navigate to={routes.login()} state={{ from: location }} replace />;
  }

  return children;
}
