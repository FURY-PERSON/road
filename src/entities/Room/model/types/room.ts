import { Block } from '@/entities/Block';
import { User } from '@/entities/User';

export interface Room {
  id: string;
  number: string;
  subNumber: string;
  peopleAmount: number;
  block: Block;
  tenants: User[];
}
