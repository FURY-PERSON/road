import { memo, FC, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { EditableNewsMain } from 'features/EditableNewsMain';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getForm } from '../../model/selectors/createAdnEditNews';
import cls from './NewsMainSection.module.scss';
import { createAndEditNewsActions } from '../../model/slice/createAndEditNews.slice';

interface NewsMainSectionProps {
  className?: string;
}

export const NewsMainSection:FC<NewsMainSectionProps> = memo((props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const form = useSelector(getForm);

  const onTitleChange = useCallback((title: string) => {
    dispatch(createAndEditNewsActions.setNewsTitle(title));
  }, [dispatch]);

  const onSubTitleChange = useCallback((subTitle: string) => {
    dispatch(createAndEditNewsActions.setNewsSubTitle(subTitle));
  }, [dispatch]);

  const onMainTextChange = useCallback((text: string) => {
    dispatch(createAndEditNewsActions.setNewsMainText(text));
  }, [dispatch]);

  const onImageChange = useCallback((image?: string) => {
    dispatch(createAndEditNewsActions.setNewsMainImage(image));
  }, [dispatch]);

  const onImageRemove = useCallback(() => {
    dispatch(createAndEditNewsActions.setNewsMainImage(undefined));
  }, [dispatch]);

  return (
    <div className={classNames(cls.NewsMainSection, {}, [className])}>
      <EditableNewsMain 
        title={form?.title || ''} 
        subTitle={form?.subTitle || ''}
        image={form?.image || ''} 
        mainText={form?.mainText || ''}
        onImageChange={onImageChange}
        onMainTextChange={onMainTextChange}
        onSubTitleChange={onSubTitleChange}
        onTitleChange={onTitleChange}
        onRemoveImage={onImageRemove}
      />
    </div>
  );
});
