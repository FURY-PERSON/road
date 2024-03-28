import { memo } from 'react';

import { Card } from '@/shared/ui/redesigned/Card/Card';

import { FormAsync } from '../Form/Form.async';

export const SetBenefitsCard = memo((props) => {
  return (
    <Card>
      <FormAsync />
    </Card>
  );
});
