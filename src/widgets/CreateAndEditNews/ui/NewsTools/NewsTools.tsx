import { memo, FC, useMemo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createAndEditNewsActions } from 'widgets/CreateAndEditNews/model/slice/createAndEditNews.slice';
import { NewsBlockType } from 'entities/News';
import cls from './NewsTools.module.scss';
import { NewsToolsItem } from '../NewsToolsItem/NewsToolsItem';

interface NewsToolsProps {
  className?: string;
}

export const NewsTools:FC<NewsToolsProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const tools = useMemo(() => ([
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
  ]), [dispatch]);

  return (
    <div className={classNames(cls.NewsTools, {}, [className])}>
      {tools.map((tool) => <NewsToolsItem key={tool.label} className={cls.tool} onClick={tool.onClick} label={tool.label} />)}
    </div>
  );
});
