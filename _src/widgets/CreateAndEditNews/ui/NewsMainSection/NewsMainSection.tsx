import { memo, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { EditableNewsMain } from '@/features/EditableNewsMain';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Card } from '@/shared/ui/redesigned/Card';

import { getDorms, getForm, getSelectedDorm } from '../../model/selectors/createAdnEditNews';
import { createAndEditNewsActions } from '../../model/slice/createAndEditNews.slice';

import cls from './NewsMainSection.module.scss';

interface NewsMainSectionProps {
  className?: string;
}

export const NewsMainSection: FC<NewsMainSectionProps> = memo((props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const form = useSelector(getForm);
  const dorms = useSelector(getDorms);
  const selectedDorm = useSelector(getSelectedDorm);

  const onTitleChange = useCallback(
    (title: string) => {
      dispatch(createAndEditNewsActions.setNewsTitle(title));
    },
    [dispatch]
  );

  const onSubTitleChange = useCallback(
    (subTitle: string) => {
      dispatch(createAndEditNewsActions.setNewsSubTitle(subTitle));
    },
    [dispatch]
  );

  const onMainTextChange = useCallback(
    (text: string) => {
      dispatch(createAndEditNewsActions.setNewsMainText(text));
    },
    [dispatch]
  );

  const onImageChange = useCallback(
    (image?: string) => {
      dispatch(createAndEditNewsActions.setNewsMainImage(image));
    },
    [dispatch]
  );

  const onImageRemove = useCallback(() => {
    dispatch(createAndEditNewsActions.setNewsMainImage(undefined));
  }, [dispatch]);

  const onDormChange = useCallback(
    (dormId?: string) => {
      if (dormId) {
        dispatch(createAndEditNewsActions.setSelectedDorm(dormId));
      }
    },
    [dispatch]
  );

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.NewsMainSection, {}, [className])}>
          <EditableNewsMain
            title={form?.title}
            subTitle={form?.subTitle}
            image={form?.image}
            mainText={form?.mainText}
            dorms={dorms}
            selectedDorm={selectedDorm}
            onDormChange={onDormChange}
            onImageChange={onImageChange}
            onMainTextChange={onMainTextChange}
            onSubTitleChange={onSubTitleChange}
            onTitleChange={onTitleChange}
            onRemoveImage={onImageRemove}
          />
        </div>
      }
      on={
        <Card fullWidth>
          <EditableNewsMain
            title={form?.title}
            subTitle={form?.subTitle}
            image={form?.image}
            mainText={form?.mainText}
            dorms={dorms}
            selectedDorm={selectedDorm}
            onDormChange={onDormChange}
            onImageChange={onImageChange}
            onMainTextChange={onMainTextChange}
            onSubTitleChange={onSubTitleChange}
            onTitleChange={onTitleChange}
            onRemoveImage={onImageRemove}
          />
        </Card>
      }
    />
  );
});
