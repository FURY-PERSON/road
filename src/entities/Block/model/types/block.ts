import { Dorm } from '@/entities/Dorm';
import { Room } from '@/entities/Room';

export interface Block {
  id: string;
  number: string;
  floor: number;
  dorm: Dorm;
  rooms: Room[];
}
