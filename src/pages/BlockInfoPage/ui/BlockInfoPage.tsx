import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { BlockInfoPageParam } from '../model/types';

import cls from './BlockInfoPage.module.scss';

interface BlockInfoPageProps {
  className?: string;
}

export const BlockInfoPage: FC<BlockInfoPageProps> = memo((props) => {
  const { className } = props;

  const { id } = useParams<BlockInfoPageParam>();

  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])} testId="BlockInfoPage">
      <Text title={id} />
    </Page>
  );
});
