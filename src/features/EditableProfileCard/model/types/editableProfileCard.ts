import { Profile } from 'entities/Profile';


export enum ProfileValidationError {
  USER_DATA = 'USER_DATA',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface ProfileSchema {
  data?: Profile
  isLoading: boolean;
  error?: string;
  readonly: boolean
  form?: Profile,
  validationErrors?: ProfileValidationError[]
}