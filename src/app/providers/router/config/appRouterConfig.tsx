import { AboutPage } from '@/pages/AboutPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { NewsDetailsPage } from '@/pages/NewsDetailsPage';
import { NewsPage } from '@/pages/NewsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RegisterPage } from '@/pages/RegisterPage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { NewsEditPage } from '@/pages/NewsEditPage';
import { UsersPage } from '@/pages/UsersPage';
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
    element: <RequireAuth><MainPage /></RequireAuth>,
  },
  {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
  {
    path: `${RoutePath[AppRoutes.USERS]}`,
    element: <RequireAuth><UsersPage /></RequireAuth>,
  },
  {
    path: `${RoutePath[AppRoutes.USER_DETAILS]}:login`,
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
    path: `${RoutePath[AppRoutes.NEWS_CREATE]}`,
    element: <RequireAuth><NewsEditPage /></RequireAuth>,
  },
  {
    path: `${RoutePath[AppRoutes.NEWS_EDIT]}`,
    element: <RequireAuth><NewsEditPage /></RequireAuth>,
  },

  {
    path: RoutePath[AppRoutes.NOTFOUND],
    element: <NotFoundPage />,
  },
];
