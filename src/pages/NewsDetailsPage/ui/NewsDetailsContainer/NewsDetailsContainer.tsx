import { memo, FC } from 'react';

import { Card } from '@/shared/ui/redesigned/Card';
import { NewsDetails } from '@/entities/News';

interface NewsDetailsContainerProps {
  newsId: string;
}

export const NewsDetailsContainer: FC<NewsDetailsContainerProps> = memo((props) => {
  const { newsId } = props;

  return (
    <Card fullWidth border="round" padding="24">
      <NewsDetails id={newsId} />
    </Card>
  );
});
