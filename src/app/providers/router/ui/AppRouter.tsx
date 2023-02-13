import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from '../config/routerConfig';

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routeConfig.map((route) => <Route {...route} />)}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;