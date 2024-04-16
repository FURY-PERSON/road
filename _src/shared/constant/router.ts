const getRouteMain = () => '/';
const getRouteAbout = () => '/about';
const getRouteUsers = () => '/user';
const getRouteBlock = (dormId: string) => `/dorm/${dormId}/block`;
const getRouteDorms = () => '/dorms';
const getRouteBlockInfo = (blockId: string) => `/block/${blockId}`;
const getRouteProfile = (login: string) => `/user/${login}`;
const getRouteLogin = () => '/login';
const getRouteRegister = () => '/register';
const getRouteNews = () => '/news';
const getRouteNewsDetails = (id: string) => `/news/${id}`;
const getRouteNewsCreate = () => '/news/create';
const getRouteNewsEdit = (id: string) => `/news/${id}/edit`;
const getRouteSettlementRequest = () => '/settlement/request';
const getRouteSettlementProcessesInfo = () => '/settlement/processes';
const getRouteSettlementProcess = (id: string) => `/settlement/process/${id}`;
const getRouteNotFound = () => '*';

export const routes = {
  main: getRouteMain,
  about: getRouteAbout,
  users: getRouteUsers,
  blocks: getRouteBlock,
  dorms: getRouteDorms,
  blocksInfo: getRouteBlockInfo,
  profile: getRouteProfile,
  login: getRouteLogin,
  register: getRouteRegister,
  news: getRouteNews,
  newsDetails: getRouteNewsDetails,
  newsCreate: getRouteNewsCreate,
  newsEdit: getRouteNewsEdit,
  settlementRequest: getRouteSettlementRequest,
  settlementProcessesInfo: getRouteSettlementProcessesInfo,
  settlementProcess: getRouteSettlementProcess,
  notFound: getRouteNotFound
};

export type RouteName = keyof typeof routes;

export const AppRouteByPathPattern: Record<string, RouteName> = {
  [routes.main()]: 'main',
  [routes.about()]: 'about',
  [routes.users()]: 'users',
  [routes.blocks(':dormId')]: 'blocks',
  [routes.dorms()]: 'dorms',
  [routes.blocksInfo(':id')]: 'blocksInfo',
  [routes.profile(':login')]: 'profile',
  [routes.register()]: 'register',
  [routes.news()]: 'news',
  [routes.newsDetails(':id')]: 'newsDetails',
  [routes.newsCreate()]: 'newsCreate',
  [routes.settlementRequest()]: 'settlementRequest',
  [routes.settlementProcessesInfo()]: 'settlementProcessesInfo',
  [routes.settlementProcess(':id')]: 'settlementProcess',
  [routes.newsEdit(':id')]: 'newsEdit'
};
