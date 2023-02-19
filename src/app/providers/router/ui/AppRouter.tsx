import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from '../config/routerConfig';

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='page'>
        <Routes>
          {routeConfig.map((route) => <Route {...route} />)}
        </Routes>
      </div>
    </Suspense>
  );
};

export default AppRouter;