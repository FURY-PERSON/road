import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { routeConfig } from '../config/routerConfig';

export const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <div className="page">
      <Routes>
        {routeConfig.map((route) => <Route {...route} />)}
      </Routes>
    </div>
  </Suspense>
);

export default AppRouter;
