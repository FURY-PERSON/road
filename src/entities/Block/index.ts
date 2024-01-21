export type { Block } from './model/types/block';
export { BlocksList } from './ui/BlocksList/BlocksList';
export {
  refetchBlockInfo,
  useGetBlockInfo,
  refetchBlockSAnitaryVisits,
  useGetBlockSanitaryVisits,
  useBlockSanitaryVisitMarkMutation
} from './api/blockApi';
export type { SanitaryVisit, SanitaryVisitMark } from './model/types/sanitaryVisit';
export { BlockSanitaryEntity } from './model/constants/sanitaryVisit';
