import { Dorm } from '@/entities/Dorm';
import { Room } from '@/entities/Room';
import { User } from '@/entities/User';

export interface Block {
  id: string;
  number: string;
  floor: number;
  dorm: Dorm;
  rooms: Room[];
  tenants: User[];
}
