import { RoleName } from '@/entities/Role/types/role';

import { ValidationError } from './error';

export interface RegisterForm {
  login?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  role?: RoleName;
  confirmPassword?: string;
}

export interface RegisterSchema {
  form: RegisterForm;

  validationError?: ValidationError[];
  isLoading: boolean;
  error?: string;
}
