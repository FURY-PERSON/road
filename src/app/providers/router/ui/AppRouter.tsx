import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { PageLoader } from '@/widgets/PageLoader/ui/PageLoader';
import { appRouteConfig } from '../config/appRouterConfig';

export const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {appRouteConfig.map((route) => <Route {...route} />)}
    </Routes>
  </Suspense>
);

export default AppRouter;
