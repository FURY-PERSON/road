export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  LOGIN = 'login',
  REGISTER = 'register',
  USERS = 'users',
  USER_DETAILS = 'user_details',
  NEWS = 'news',
  NEWS_DETAILS = 'news_details',
  NEWS_CREATE = 'news_create',
  NEWS_EDIT = 'news_edit',

  NOTFOUND = '404'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.USERS]: '/user/',
  [AppRoutes.USER_DETAILS]: '/user/', // +id
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.NEWS]: '/news',
  [AppRoutes.NEWS_DETAILS]: '/news/', // + id
  [AppRoutes.NEWS_CREATE]: '/news/create',
  [AppRoutes.NEWS_EDIT]: '/news/:id/edit',

  [AppRoutes.NOTFOUND]: '*',
};
