import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AppRouteByPathPattern, RouteName } from '../../../constant/router';

export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<RouteName>('main');

  useEffect(() => {
    Object.entries(AppRouteByPathPattern).forEach(([route, name]) => {
      if (matchPath(route, location.pathname)) {
        setAppRoute(name);
        return;
      }
    });
  }, [location.pathname]);

  return appRoute;
}
