import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { Route, RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export const authRouteConfig: Array<RouteProps> = [
  {
    path: RoutePath[AppRoutes.NOTFOUND],
    element: <NotFoundPage />,
  },
  {
    path: RoutePath[AppRoutes.LOGIN],
    element: <LoginPage />,
  },

];
