import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SettlementProcessState } from '@/entities/SettlementProcess/@x/StudentSettlement';
import { ListBox } from '@/shared/ui/redesigned/popups';

import { getRooms } from '../../model/selectors/selectors';

interface RoomSwitchProps {
  settlementProcessState: SettlementProcessState;
  dormId: string | null;
  initialRoomId: string | null;
  onChange: (roomId: string) => void;
}

export const RoomSwitch: FC<RoomSwitchProps> = memo((props) => {
  const { settlementProcessState, dormId, initialRoomId, onChange } = props;

  const { t } = useTranslation('process');

  const rooms = useSelector(getRooms);

  const getRoomById = useCallback(
    (roomId: string | null) => rooms?.find((room) => room.id === roomId),
    [rooms]
  );

  const initialRoom = useMemo(() => getRoomById(initialRoomId), [getRoomById, initialRoomId]);

  const [currentRoom, setCurrentRoom] = useState(initialRoom);

  const selectItems = useMemo(
    () =>
      rooms
        ?.filter((room) => room.dormId === dormId)
        ?.map((room) => ({ value: room.id, content: `${room.number} ${room.subNumber}` })),
    [rooms, dormId]
  );

  useEffect(() => setCurrentRoom(getRoomById(initialRoomId)), [getRoomById, initialRoomId]);

  return (
    <ListBox<string>
      readonly={settlementProcessState !== SettlementProcessState.ROOMS_ALLOCATED}
      value={currentRoom?.id}
      items={selectItems}
      onChange={(newRoomId) => {
        setCurrentRoom(getRoomById(newRoomId));
        onChange(newRoomId);
      }}
      label={t('room')}
    />
  );
});
