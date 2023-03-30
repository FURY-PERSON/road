export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  LOGIN = 'login',
  REGISTER = 'register',
  NEWS = 'news',
  NEWS_DETAILS = 'news_details',

  NOTFOUND = '404'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.NEWS]: '/news',
  [AppRoutes.NEWS_DETAILS]: '/news/', // also id

  [AppRoutes.NOTFOUND]: '*',
};
