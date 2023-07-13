import { Permission } from '@/entities/Permission';
import { Role } from '@/entities/Role';

export interface User {
  id: string,
  login: string,
  firstName: string,
  lastName: string,
  phone?: string,
  email?: string,
  role: Role,
  permissions: Permission[]
}

export interface AuthTokens {
  refreshToken: string,
  accessToken: string
}

export interface UserSchema {
  authData?: AuthTokens,
  userData?: User,
  isLoading?: boolean,
  error?: string

  _inited: boolean
}
