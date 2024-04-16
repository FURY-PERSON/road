export enum RoleName {
  STUDENT = 'student',
  WORKER = 'worker',
  ADMIN = 'admin'
}

export interface Role {
  name: RoleName;
  description: string;
}
