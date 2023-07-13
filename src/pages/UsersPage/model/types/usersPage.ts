import { RoleName } from '@/entities/Role';

export enum UsersSortFilter {
  LOGIN = 'login',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

export enum UsersRolesFilter {
  ALL = 'all',
  ADMIN = 'admin',
  STUDENT = 'student',
  WORKER = 'worker',
} 
