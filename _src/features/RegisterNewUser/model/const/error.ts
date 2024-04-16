import { ValidationError } from '../types/error';

export const errorMap: Record<ValidationError, string> = {
  [ValidationError.NO_DATA]: 'no data',
  [ValidationError.SERVER_ERROR]: 'server error',
  [ValidationError.USER_DATA]: 'incorrect user data',
  [ValidationError.PASSWORD_MATCH]: 'passwords do not match'
};
