import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import cls from './NewsEditPage.module.scss';

interface NewsEditPageProps {
  className?: string;
}

export const NewsEditPage:FC<NewsEditPageProps> = memo((props) => {
  const { className } = props;
  const { id } = useParams<{id: string}>();

  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.NewsEditPage, {}, [className])}>{isEdit ? 'News Edit page' : 'New'}</Page>
  );
});
