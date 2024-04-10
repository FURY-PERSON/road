import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { User } from '@/entities/User';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { SettlementProcessState } from '@/entities/SettlementProcess/@x/StudentSettlement';

import { StudentSettlement } from '../../model/types/studentSettelement';
import {
  useRejectStudentSettlementMutation,
  useUpdateStudentSettlementMutation
} from '../../api/studentSettlementApi';
import { DormSwitch } from '../DormSwitch/DormSwitch';
import { RoomSwitch } from '../RoomSwitch/RoomSwitch';

import cls from './StudentSettlementCard.module.scss';

interface StudentSettlementCardProps {
  settlementProcessState: SettlementProcessState;
  settlementInfo: StudentSettlement;
  user?: User;
}

export const StudentSettlementCard: FC<StudentSettlementCardProps> = memo((props) => {
  const { settlementInfo, user, settlementProcessState } = props;

  const { t } = useTranslation('process');

  const [updateSettlement] = useUpdateStudentSettlementMutation();
  const [rejectSettlement] = useRejectStudentSettlementMutation();

  const userText = useMemo(
    () => (user ? `${user.lastName} ${user.firstName}` : settlementInfo.student.id),
    [user, settlementInfo.student]
  );

  return (
    <Card fullWidth>
      <HStack gap={32} align="center" justify="between">
        <div className={cls.reputation}>
          <Text text={settlementInfo.student.reputation} size="L" />
        </div>
        <Text text={userText} />
        <DormSwitch
          settlementProcessState={settlementProcessState}
          initialDormId={settlementInfo.dormId}
          onChange={(dormId) => updateSettlement({ studentId: settlementInfo.student.id, dormId })}
        />
        <RoomSwitch
          settlementProcessState={settlementProcessState}
          dormId={settlementInfo.dormId}
          initialRoomId={settlementInfo.roomId}
          onChange={(roomId) => updateSettlement({ studentId: settlementInfo.student.id, roomId })}
        />
        {settlementProcessState !== SettlementProcessState.FINISHED ? (
          <Button
            className={cls.rejectButton}
            variant="outline"
            disabled={settlementInfo.rejected}
            onClick={() => rejectSettlement(settlementInfo.student.id)}
          >
            {t('reject')}
          </Button>
        ) : null}
      </HStack>
    </Card>
  );
});
