import { ProfileValidationError } from '../types/editableProfileCard';

export const errorMap: Record<ProfileValidationError, string> = {
  [ProfileValidationError.NO_DATA]: 'no data',
  [ProfileValidationError.SERVER_ERROR]: 'server error',
  [ProfileValidationError.USER_DATA]: 'incorrect user data'
};
