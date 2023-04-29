import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { SvgLoader } from 'shared/ui/SvgLoader';
import cls from './CreateAndEditNews.module.scss';
import { NewsTools } from '../NewsTools/NewsTools';
import { createAndEditNewsReducer } from '../../model/slice/createAndEditNews.slice';
import { initCreateAndEditNews } from '../../model/services/initCreateAndEditNews/initCreateAndEditNews';
import { getLoading } from '../../model/selectors/createAdnEditNews';
import { NewsBlocks } from '../NewsBlocks/NewsBlocks';
import { NewsMainSection } from '../NewsMainSection/NewsMainSection';

interface CreateAndEditNewsProps {
  className?: string;
  id?: string
}

const reducers: ReducersList = {
  createAndEditNews: createAndEditNewsReducer,
};

export const CreateAndEditNews:FC<CreateAndEditNewsProps> = memo((props) => {
  const { className, id } = props;
  const dispatch = useAppDispatch();

  const loading = useSelector(getLoading);

  useInitialEffect(() => {
    if (id) {
      dispatch(initCreateAndEditNews(id));
    }
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.CreateAndEditNews, {}, [className])}>
        {loading
          ? <SvgLoader />
          : (
            <>
              <NewsTools id={id} />

              <NewsMainSection className={cls.mainInputs} />

              <NewsBlocks className={cls.blocks} blockClassName={cls.block} />
            </>
          )}
      </div>
    </DynamicModuleLoader>
  );
});
