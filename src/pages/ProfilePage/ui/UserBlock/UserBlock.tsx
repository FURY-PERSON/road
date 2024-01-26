import { memo, FC } from 'react';

import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';
import { BlockInfo } from '@/widgets/BlockInfo';
import { useGetUser } from '@/entities/User';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

interface UserBlockProps {
  login?: string;
}

export const UserBlock: FC<UserBlockProps> = memo((props) => {
  const { login } = props;

  const { data: user } = useGetUser({ login: login! }, { skip: !login });

  if (!login) {
    return null;
  }

  if (!user?.block) {
    return null;
  }

  return (
    <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
      <VStack gap={32}>
        <BlockInfo blockId={user.block.id} />
      </VStack>
    </RoleGuard>
  );
});
