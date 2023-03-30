import { AboutPage } from 'pages/AboutPage';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { NewsDetailsPage } from 'pages/NewsDetailsPage';
import { NewsPage } from 'pages/NewsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RegisterPage } from 'pages/RegisterPage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { RequireAuth } from '../ui/RequireAuth';

export const appRouteConfig: Array<RouteProps> = [
  {
    path: RoutePath[AppRoutes.REGISTER],
    element: <RegisterPage />,
  },
  {
    path: RoutePath[AppRoutes.LOGIN],
    element: <LoginPage />,
  },

  {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
  {
    path: `${RoutePath[AppRoutes.PROFILE]}:login`,
    element: <RequireAuth><ProfilePage /></RequireAuth>,
  },
  {
    path: RoutePath[AppRoutes.NEWS],
    element: <RequireAuth><NewsPage /></RequireAuth>,
  },
  {
    path: `${RoutePath[AppRoutes.NEWS_DETAILS]}:id`,
    element: <RequireAuth><NewsDetailsPage /></RequireAuth>,
  },

  {
    path: RoutePath[AppRoutes.NOTFOUND],
    element: <NotFoundPage />,
  },
];
