const getRouteMain = () => '/';
const getRouteAbout = () => '/about';
const getRouteUsers = () => '/user';
const getRouteBlock = () => '/block';
const getRouteBlockInfo = (blockId: string) => `/block/${blockId}`;
const getRouteProfile = (login: string) => `/user/${login}`;
const getRouteLogin = () => '/login';
const getRouteRegister = () => '/register';
const getRouteNews = () => '/news';
const getRouteNewsDetails = (id: string) => `/news/${id}`;
const getRouteNewsCreate = () => '/news/create';
const getRouteNewsEdit = (id: string) => `/news/${id}/edit`;
const getRouteNotFound = () => '*';

export const routes = {
  main: getRouteMain,
  about: getRouteAbout,
  users: getRouteUsers,
  blocks: getRouteBlock,
  blocksInfo: getRouteBlockInfo,
  profile: getRouteProfile,
  login: getRouteLogin,
  register: getRouteRegister,
  news: getRouteNews,
  newsDetails: getRouteNewsDetails,
  newsCreate: getRouteNewsCreate,
  newsEdit: getRouteNewsEdit,
  notFound: getRouteNotFound
};
