import { DormsList } from '@/features/DormsList';

import cls from './DormsPage.module.scss';

export const DormsPage = () => {
  return <DormsList className={cls.list} />;
};
