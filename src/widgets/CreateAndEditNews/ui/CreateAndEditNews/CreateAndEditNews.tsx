import { memo, FC } from 'react';
import { useSelector } from 'react-redux';

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SvgLoader } from '@/shared/ui/deprecated/SvgLoader';

import { NewsTools } from '../NewsTools/NewsTools';
import { initCreateAndEditNews } from '../../model/services/initCreateAndEditNews/initCreateAndEditNews';
import { getLoading } from '../../model/selectors/createAdnEditNews';
import { NewsBlocks } from '../NewsBlocks/NewsBlocks';
import { NewsMainSection } from '../NewsMainSection/NewsMainSection';

import cls from './CreateAndEditNews.module.scss';

export interface CreateAndEditNewsProps {
  id?: string;
}

export const CreateAndEditNews: FC<CreateAndEditNewsProps> = memo((props) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const loading = useSelector(getLoading);

  useInitialEffect(() => {
    dispatch(initCreateAndEditNews(id));
  });

  if (loading) {
    return <SvgLoader />;
  }

  return (
    <>
      <NewsTools id={id} />

      <NewsMainSection className={cls.mainInputs} />

      <NewsBlocks className={cls.blocks} blockClassName={cls.block} />
    </>
  );
});
