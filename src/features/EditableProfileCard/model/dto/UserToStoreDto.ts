import { User } from '@/entities/User';
import { RoleName } from '@/entities/Role';
import { Block } from '@/entities/Block';

import { EditableUser } from '../types/editableProfileCard';

export class UserToStoreDto implements EditableUser {
  id: string;

  login: string;

  firstName: string;

  lastName: string;

  phone?: string;

  email?: string;

  roleName: RoleName;

  block?: Block;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.id = user.id;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.login = user.login;
    this.email = user.email;
    this.roleName = user.role.name;
    this.block = user.block;
  }
}
