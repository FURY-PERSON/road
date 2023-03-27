import { Role } from 'entities/Role';
import { ValidationError } from './error';

export interface RegisterForm {
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: Role | ''
  confirmPassword: string
}

export interface RegisterSchema {
  form: RegisterForm,

  validationError?: ValidationError[]
  isLoading: boolean;
  error?: string
}
