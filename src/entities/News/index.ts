export { NewsDetailsContainer as NewsDetails } from './ui/NewsDetails/NewsDetails.container';
export { type News } from './model/types/news';
export { newsDetailsActions } from './model/slice/newsDetails.slice';
export { type NewsDetailsSchema } from './model/types/newsDetailsSchema';
export { NewsList } from './ui/NewsList/NewsList';
export { NewsListVariant, NewsType } from './model/types/news';
export { NewsSort } from './model/types/news';
export { getNewsDetailsData } from './model/selectors/getNewsDetailsData/getNewsDetailsData';
export {
  NewsBlockType,
  type NewsBlock,
  type NewsImageBlock,
  type NewsTextBlock,
  type NewsCodeBlock
} from './model/types/news';
