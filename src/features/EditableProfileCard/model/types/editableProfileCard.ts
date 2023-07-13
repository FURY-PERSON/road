import { RoleName } from '@/entities/Role';
import { User } from '@/entities/User';

export enum ProfileValidationError {
  USER_DATA = 'USER_DATA',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}

export type EditableUser = Omit<User, 'role' | 'permissions'> & {roleName: RoleName}

export interface ProfileSchema {
  data?: User
  isLoading: boolean;
  error?: string;
  readonly: boolean
  form: Partial<EditableUser>,
  validationErrors?: ProfileValidationError[]
}
