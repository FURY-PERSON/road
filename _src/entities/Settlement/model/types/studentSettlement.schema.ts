import { Dorm } from '@/entities/Dorm';
import { Room } from '@/entities/Room';

export interface RoomWithDormId extends Room {
  dormId: string;
}

export interface StudentSettlementSchema {
  dorms?: Dorm[];
  rooms?: RoomWithDormId[];
}
