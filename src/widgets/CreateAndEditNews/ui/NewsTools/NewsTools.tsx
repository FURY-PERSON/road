import { memo, FC, useMemo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { News, NewsBlockType } from 'entities/News';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { createAndEditNewsActions } from '../../model/slice/createAndEditNews.slice';
import cls from './NewsTools.module.scss';
import { NewsToolsItem } from '../NewsToolsItem/NewsToolsItem';
import { isEdit } from '../../model/selectors/createAdnEditNews';
import { saveChanges } from '../../model/services/saveChanges/saveChanges';

interface NewsToolsProps {
  className?: string;
  id?: string
}

export const NewsTools:FC<NewsToolsProps> = memo((props) => {
  const { className, id } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const edit = useSelector(isEdit);

  const tools = useMemo(() => {
    const tools: Array<{label: string, onClick: () => void}> = [
      {
        label: 'Add image block',
        onClick: () => dispatch(createAndEditNewsActions.addBlock(NewsBlockType.IMAGE)),
      },
      {
        label: 'Add text block',
        onClick: () => dispatch(createAndEditNewsActions.addBlock(NewsBlockType.TEXT)),
      },
      {
        label: 'Add code block',
        onClick: () => dispatch(createAndEditNewsActions.addBlock(NewsBlockType.CODE)),
      },
    ];

    if (edit) {
      tools.push({
        label: 'Cancel',
        onClick: () => {
          navigate(RoutePath[AppRoutes.NEWS_DETAILS] + id);
          dispatch(createAndEditNewsActions.cancelEdeting())
        },
      });
    } else {
      tools.push({
        label: 'Reset',
        onClick: () => dispatch(createAndEditNewsActions.resetForm()),
      });
    }

    tools.push({
      label: 'Save',
      onClick: async () => {
        const resposne = await dispatch(saveChanges(id));
    
        if (resposne.meta.requestStatus === 'fulfilled') {
          const savedNews = resposne.payload as News;
          navigate(RoutePath[AppRoutes.NEWS_DETAILS] + savedNews.id);
        }
      },
    });

    return tools;
  }, [dispatch, edit, id]);

  return (
    <div className={classNames(cls.NewsTools, {}, [className])}>
      {tools.map((tool) => <NewsToolsItem key={tool.label} className={cls.tool} onClick={tool.onClick} label={tool.label} />)}
    </div>
  );
});
