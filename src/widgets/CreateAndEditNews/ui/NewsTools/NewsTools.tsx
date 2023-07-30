import { memo, FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { News, NewsBlockType } from '@/entities/News';
import { createAndEditNewsActions } from '../../model/slice/createAndEditNews.slice';
import cls from './NewsTools.module.scss';
import { NewsToolItem, NewsToolsItem } from '../NewsToolsItem/NewsToolsItem';
import { isEdit } from '../../model/selectors/createAdnEditNews';
import { saveChanges } from '../../model/services/saveChanges/saveChanges';
import { routes } from '@/shared/constant/router';

interface NewsToolsProps {
  className?: string;
  id?: string
}

export const NewsTools:FC<NewsToolsProps> = memo((props) => {
  const { className, id } = props;
  const { t, i18n } = useTranslation('news');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const edit = useSelector(isEdit);

  const tools = useMemo(() => {
    const tools: Array<NewsToolItem> = [
      {
        label: t('Add image block')!,
        onClick: () => dispatch(createAndEditNewsActions.addBlock(NewsBlockType.IMAGE)),
      },
      {
        label: t('Add text block')!,
        onClick: () => dispatch(createAndEditNewsActions.addBlock(NewsBlockType.TEXT)),
      },
      {
        label: t('Add code block')!,
        onClick: () => dispatch(createAndEditNewsActions.addBlock(NewsBlockType.CODE)),
      },
    ];

    if (edit) {
      tools.push({
        label: t('Cancel')!,
        onClick: () => {
          navigate(routes.newsDetails(id!));
          dispatch(createAndEditNewsActions.cancelEdeting());
        },
      });
    } else {
      tools.push({
        label: t('Reset')!,
        onClick: () => dispatch(createAndEditNewsActions.resetForm()),
      });
    }

    tools.push({
      label: t('Save')!,
      onClick: async () => {
        const resposne = await dispatch(saveChanges(id));
    
        if (resposne.meta.requestStatus === 'fulfilled') {
          const savedNews = resposne.payload as News;
          navigate(routes.newsDetails(savedNews.id));
        }
      },
    });

    return tools;
  }, [dispatch, edit, id, t]);

  return (
    <div className={classNames(cls.NewsTools, {}, [className])}>
      {tools.map((tool) => <NewsToolsItem key={tool.label} className={cls.tool} item={tool} />)}
    </div>
  );
});
