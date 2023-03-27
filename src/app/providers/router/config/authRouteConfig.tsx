import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RegisterPage } from 'pages/RegisterPage';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export const authRouteConfig: Array<RouteProps> = [
  {
    path: RoutePath[AppRoutes.REGISTER],
    element: <RegisterPage />,
  },
  {
    path: RoutePath[AppRoutes.LOGIN],
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to={RoutePath[AppRoutes.LOGIN]} />,
  },
  {
    path: RoutePath[AppRoutes.NOTFOUND],
    element: <NotFoundPage />,
  },
];
