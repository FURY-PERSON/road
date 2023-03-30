import { PermissionName } from 'entities/Permission/model/types/permission';
import { Role } from 'entities/Role';

export interface User {
  id: string,
  login: string,
  firstName: string,
  lastName: string,
  phone?: string,
  email?: string,
  role: Role,
  permissions: PermissionName[]
}

export interface AuthTokens {
  refreshToken: string,
  accessToken: string
}

export interface UserSchema {
  authData?: AuthTokens,
  userData?: User
}
