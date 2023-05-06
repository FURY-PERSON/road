export enum PermissionName {
  STUDENT = 'student',
  WORKER = 'worker',
  ADMIN = 'admin'
}

export interface Permission {
  id: string,
  name: PermissionName,
  description: string
}
