import { AboutPage } from 'pages/AboutPage';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { Route, RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export const appRouteConfig: Array<RouteProps> = [
  {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
  {
    path: `${RoutePath[AppRoutes.PROFILE]}/:login`,
    element: <ProfilePage />,
  },

  {
    path: RoutePath[AppRoutes.LOGIN],
    element: <LoginPage />,
  },

  {
    path: RoutePath[AppRoutes.NOTFOUND],
    element: <NotFoundPage />,
  },
];
