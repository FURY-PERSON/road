export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  LOGIN = 'login',
  REGISTER = 'register',
  NEWS = 'news',
  NEWS_DETAILS = 'news_details',
  NEWS_CREATE = 'news_create',
  NEWS_EDIT = 'news_edit',

  NOTFOUND = '404'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.NEWS]: '/news',
  [AppRoutes.NEWS_DETAILS]: '/news/', // + id
  [AppRoutes.NEWS_CREATE]: '/news/create',
  [AppRoutes.NEWS_EDIT]: '/news/:id/edit',

  [AppRoutes.NOTFOUND]: '*',
};
