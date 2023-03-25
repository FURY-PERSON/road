import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { authRouteConfig } from '../config/authRouteConfig';

export const AuthRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <div className="page">
      <Routes>
        {authRouteConfig.map((route) => <Route {...route} />)}
      </Routes>
    </div>
  </Suspense>
);

export default AuthRouter;
