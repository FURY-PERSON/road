import { RouteProps } from 'react-router-dom';

import { AboutPage } from '@/pages/AboutPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { NewsDetailsPage } from '@/pages/NewsDetailsPage';
import { NewsPage } from '@/pages/NewsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RegisterPage } from '@/pages/RegisterPage';
import { routes } from '@/shared/constant/router';
import { NewsEditPage } from '@/pages/NewsEditPage';
import { UsersPage } from '@/pages/UsersPage';
import { BlocksPage } from '@/pages/BlocksPage';
import { BlockInfoPage } from '@/pages/BlockInfoPage';
import { SettlementRequestPage } from '@/pages/SettlementRequestPage';
import { SettlementManagePage } from '@/pages/SettlementManagePage';
import { SettlementProcessPage } from '@/pages/SettlementProcessPage/ui/SettlementProcessPage/SettlementProcessPage';
import { DormsPage } from '@/pages/DormsPage';

import { RequireAuth } from '../ui/RequireAuth';

export const appRouteConfig: Array<RouteProps> = [
  {
    path: routes.register(),
    element: <RegisterPage />
  },
  {
    path: routes.login(),
    element: <LoginPage />
  },

  {
    path: routes.main(),
    element: (
      <RequireAuth>
        <MainPage />
      </RequireAuth>
    )
  },
  {
    path: routes.about(),
    element: <AboutPage />
  },
  {
    path: routes.users(),
    element: (
      <RequireAuth>
        <UsersPage />
      </RequireAuth>
    )
  },
  {
    path: routes.blocks(':dormId'),
    element: (
      <RequireAuth>
        <BlocksPage />
      </RequireAuth>
    )
  },
  {
    path: routes.dorms(),
    element: (
      <RequireAuth>
        <DormsPage />
      </RequireAuth>
    )
  },
  {
    path: routes.blocksInfo(':id'),
    element: (
      <RequireAuth>
        <BlockInfoPage />
      </RequireAuth>
    )
  },
  {
    path: routes.profile(':login'),
    element: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    )
  },
  {
    path: routes.news(),
    element: (
      <RequireAuth>
        <NewsPage />
      </RequireAuth>
    )
  },
  {
    path: routes.newsDetails(':id'),
    element: (
      <RequireAuth>
        <NewsDetailsPage />
      </RequireAuth>
    )
  },
  {
    path: routes.newsEdit(':id'),
    element: (
      <RequireAuth>
        <NewsEditPage />
      </RequireAuth>
    )
  },
  {
    path: routes.newsCreate(),
    element: (
      <RequireAuth>
        <NewsEditPage />
      </RequireAuth>
    )
  },
  {
    path: routes.settlementRequest(),
    element: (
      <RequireAuth>
        <SettlementRequestPage />
      </RequireAuth>
    )
  },
  {
    path: routes.settlementProcessesInfo(),
    element: (
      <RequireAuth>
        <SettlementManagePage />
      </RequireAuth>
    )
  },
  {
    path: routes.settlementProcess(':id'),
    element: (
      <RequireAuth>
        <SettlementProcessPage />
      </RequireAuth>
    )
  },
  {
    path: routes.notFound(),
    element: <NotFoundPage />
  }
];
