export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOTFOUND = '404'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.NOTFOUND]: '*',
};
